import { Post } from "@/Types/types";

export const gitstoreUploadPipeline: Post = {
  slug: "designing-an-upload-pipeline-around-github-limits",
  title: "Designing an upload pipeline around GitHub's limits",
  description:
    "How GitStore turns GitHub repositories into a personal file system: content hashing, 80 MB chunks, bounded parallelism, retries with jitter and a five-layer cache.",
  excerpt:
    "GitHub was never meant to be a file system. Treating its limits as the design brief is what made GitStore work, from chunk size to how many uploads run at once.",
  date: "2026-11-06",
  line: "systems",
  stops: ["Hash", "Dedupe", "Chunk", "Upload", "Index"],
  projects: ["3"],
  skills: ["System Architecture", "TypeScript", "Next.js", "API Design"],
  blocks: [
    {
      t: "p",
      text: "[GitStore](/projects/3) stores a person's files in their own private GitHub repositories. There is no storage server: one repository acts as the index, others hold the data, and the browser does most of the work. The idea borrows its shape from the Hadoop Distributed File System, with a name node that knows where everything is and data nodes that hold the bytes.",
    },
    {
      t: "p",
      text: "The interesting part is that GitHub's API is the hard constraint on every decision. This article walks through how those limits shaped the upload pipeline, using the code in the [repository](https://github.com/AbraraliS/GitSmartStorage).",
    },
    { t: "h2", text: "Map the concepts before writing code" },
    {
      t: "p",
      text: "Naming the mapping up front kept the design honest, because each HDFS concept needed a concrete GitHub equivalent.",
    },
    {
      t: "table",
      head: ["HDFS concept", "GitStore equivalent"],
      rows: [
        ["NameNode", "`gitstore-master` repository holding `index.json`"],
        ["Secondary NameNode", "`gitstore-secondary`, a mirror of the index"],
        ["DataNode", "One private repository per category"],
        ["Block", "A chunk of a file stored as a Git blob"],
      ],
    },
    {
      t: "p",
      text: "Replication to the secondary is deliberately best-effort. An upload does not fail because the mirror could not be written, since the primary index is still correct and failing the whole upload would punish the user for a problem they cannot act on.",
    },
    { t: "h2", text: "Hash first, because the cheapest upload is no upload" },
    {
      t: "p",
      text: "Every file is hashed with SHA-256 in the browser before anything is sent. If that hash is already in the index, the upload is skipped. Very large files cannot be read into memory in one go, so they are hashed piece by piece and the piece hashes are combined.",
    },
    {
      t: "code",
      lang: "ts",
      file: "lib/upload.ts",
      code: `if (file.size <= HASH_READ_CHUNK) {
  const buf = await file.arrayBuffer();
  const h = await crypto.subtle.digest("SHA-256", buf);
  const hex = [...new Uint8Array(h)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return { shortHash: hex.slice(0, 12), fullHex: hex };
}`,
    },
    {
      t: "note",
      text: "A piecewise hash is a different value from a plain SHA-256 of the whole file. That is fine here, because the hash is only compared with other hashes produced the same way.",
    },
    { t: "h2", text: "Let the API ceiling choose the chunk size" },
    {
      t: "p",
      text: "Base64 expands data by about a third, so a limit that sounds generous shrinks quickly once a file is encoded for an API request. All the thresholds live in one configuration file, with the reasoning written next to the number.",
    },
    {
      t: "code",
      lang: "ts",
      file: "lib/upload-config.ts",
      code: `/**
 * 80MB is the safe operational ceiling for GitHub Contents API, accounting
 * for base64 expansion (~33%) and request overhead. Do NOT raise to 100MB.
 */
export const SINGLE_UPLOAD_THRESHOLD = 80 * 1024 * 1024;

export function selectUploadMode(fileSizeBytes: number): UploadMode {
  return fileSizeBytes <= SINGLE_UPLOAD_THRESHOLD ? "single" : "chunked";
}`,
    },
    {
      t: "p",
      text: "Keeping one chunk size for every large file is a choice for simplicity. Smaller chunks would mean more API calls and more commits for no benefit, and a 1 GB file simply becomes 13 chunks. Chunked uploads also use a different route: they create blobs with the Git Data API and finish with a single commit, instead of producing one commit per chunk.",
    },
    { t: "h2", text: "Choose parallelism from memory, not from hope" },
    {
      t: "p",
      text: "More parallel uploads sound faster, but each in-flight chunk costs memory in the browser. The comment beside the limit does the arithmetic, which is exactly the kind of reasoning that is otherwise lost a month later.",
    },
    {
      t: "code",
      lang: "ts",
      file: "lib/upload-config.ts",
      code: `/**
 * 2 is the safe default: each 80MB chunk = ~106MB base64 in memory.
 * 3 parallel x 106MB = 318MB peak RAM, too aggressive for most browsers.
 */
export const MAX_PARALLEL_UPLOADS = 2;`,
    },
    {
      t: "p",
      text: "The second version of the pipeline went further. Browsers now send raw binary, and the server encodes it to base64 for GitHub. The file header records the effect: peak browser memory of roughly 160 MB for two parallel chunks, down from about 640 MB.",
    },
    {
      t: "p",
      text: "The scheduler itself is small. A fixed number of async workers pull from a shared index, so at most `concurrency` chunks are ever in flight, without a queueing library.",
    },
    {
      t: "code",
      lang: "ts",
      file: "lib/upload.ts",
      code: `let i = 0;
const concurrency = Math.min(MAX_PARALLEL_UPLOADS, rawChunks.length);

const workers = Array.from({ length: concurrency }, async () => {
  while (true) {
    if (signal.aborted) throw new DOMException("Upload cancelled", "AbortError");
    const myIndex = i++;
    if (myIndex >= rawChunks.length) break;
    const raw = rawChunks[myIndex];
    const result = await uploadWithRetry(raw, nodeRepo, mode, signal, onSent);
    if (typeof result === "string") blobShas[raw.index] = result;
  }
});

await Promise.all(workers);`,
    },
    {
      t: "p",
      text: "JavaScript's single thread makes `i++` safe here. There is no gap between reading and incrementing for another worker to slip into, so no two workers can claim the same chunk.",
    },
    { t: "h2", text: "Retry with jitter so failures do not synchronise" },
    {
      t: "p",
      text: "Each chunk retries up to three times with exponential back-off. A small random delay is added to each attempt. Without it, chunks that failed together would retry together and could hit the same rate limit again. Cancellation is treated differently from failure: an abort is rethrown immediately, because retrying something the user cancelled would be a bug.",
    },
    {
      t: "code",
      lang: "ts",
      file: "lib/upload.ts",
      code: `if (attempt > 0) {
  const delay =
    BASE_RETRY_DELAY_MS * Math.pow(2, attempt - 1) +
    Math.random() * CHUNK_JITTER_MS;
  await new Promise((r) => setTimeout(r, delay));
}`,
    },
    { t: "h2", text: "Cache in layers, closest first" },
    {
      t: "p",
      text: "A GitHub API call is by far the slowest source, so GitStore asks the closest layer that could know the answer before going further out.",
    },
    {
      t: "route",
      label: "GitStore cache layers, fastest to slowest",
      stops: [
        "L1 memory",
        "L2 IndexedDB",
        "L3 service worker",
        "L4 Cloudflare edge",
        "L5 GitHub API",
      ],
    },
    {
      t: "p",
      text: "The index lookup shows the pattern. A hit in a slower layer also fills the faster one, so the next read is cheaper.",
    },
    {
      t: "code",
      lang: "ts",
      file: "lib/cache.ts",
      code: `export async function loadIndex(): Promise<GitStoreIndex | null> {
  const l1 = l1GetIndex();
  if (l1) return l1;

  const l2 = await l2GetIndex();
  if (l2) {
    l1SetIndex(l2); // prime L1
    return l2;
  }

  return null; // caller must fetch from L5
}`,
    },
    { t: "h2", text: "Search without a search server" },
    {
      t: "p",
      text: "Search uses an inverted index kept inside `index.json`: each token maps to a list of file hashes. Finding a token is a single object lookup, so the cost does not grow with the number of files, and multiple tokens are resolved by combining their result sets. The trade-off is that matching works on whole tokens, not on fuzzy text.",
    },
    { t: "h2", text: "Where the limits still show" },
    {
      t: "p",
      text: "Building on someone else's API means inheriting its limits. The project documents them instead of hiding them.",
    },
    {
      t: "list",
      items: [
        "GitHub limits authenticated calls to 5,000 an hour, so heavy upload sessions can run into it.",
        "`index.json` is the single source of truth. If it is deleted from GitHub, the index is gone.",
        "Rate limiting relies on optional Redis configuration. Without it, the app logs a warning and limits are not enforced.",
      ],
    },
    { t: "h2", text: "What carries over" },
    {
      t: "p",
      text: "Very little of this is specific to GitHub. Find the real ceiling and write the arithmetic beside the constant. Skip work you can prove is unnecessary, bound concurrency by the resource that actually runs out, and make cancellation and failure different code paths. Those habits apply to any pipeline that talks to an API you do not control.",
    },
  ],
};
