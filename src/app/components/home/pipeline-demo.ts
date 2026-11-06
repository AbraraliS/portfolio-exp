/*
 * A small working version of GitStore's upload pipeline (lib/upload.ts).
 * Hashing, deduplication, chunking, the two-worker scheduler and the inverted
 * index all really run here. Only the transfer is simulated: each chunk waits
 * on a timer instead of going to GitHub, and nothing leaves the browser.
 */

/** GitStore uses 80 MB chunks. Text this short needs a much smaller size. */
const CHUNK_BYTES = 8;
const MAX_PARALLEL_UPLOADS = 2;
const FAKE_TRANSFER_MS = 170;

export interface PipelineStore {
  hashes: Set<string>;
  searchIndex: Map<string, string[]>;
}

export const createStore = (): PipelineStore => ({
  hashes: new Set(),
  searchIndex: new Map(),
});

export const shortHash = async (bytes: Uint8Array) => {
  const digest = await crypto.subtle.digest("SHA-256", bytes as BufferSource);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 12);
};

const slice = (bytes: Uint8Array) => {
  const chunks: Uint8Array[] = [];
  for (let offset = 0; offset < bytes.length; offset += CHUNK_BYTES) {
    chunks.push(bytes.slice(offset, offset + CHUNK_BYTES));
  }
  return chunks;
};

/** Same shape as GitStore's scheduler: fixed workers pulling from a shared index. */
const uploadInParallel = async (chunks: Uint8Array[]) => {
  let next = 0;
  let inFlight = 0;
  let peak = 0;
  const concurrency = Math.min(MAX_PARALLEL_UPLOADS, chunks.length);
  const workers = Array.from({ length: concurrency }, async () => {
    while (next < chunks.length) {
      next++;
      inFlight++;
      peak = Math.max(peak, inFlight);
      await new Promise((resolve) => setTimeout(resolve, FAKE_TRANSFER_MS));
      inFlight--;
    }
  });
  await Promise.all(workers);
  return peak;
};

export interface StageResult {
  stage: string;
  value: string;
}

/** Runs one stage at a time, so the interface can follow along. */
export async function* runPipeline(
  text: string,
  store: PipelineStore,
): AsyncGenerator<StageResult, { duplicate: boolean; chunks: number }> {
  const bytes = new TextEncoder().encode(text);

  const hash = await shortHash(bytes);
  yield { stage: "Hashing", value: hash };

  if (store.hashes.has(hash)) {
    yield { stage: "Deduplication", value: "duplicate, skipped" };
    return { duplicate: true, chunks: 0 };
  }
  store.hashes.add(hash);
  yield { stage: "Deduplication", value: "new content" };

  const chunks = slice(bytes);
  yield {
    stage: "Chunking",
    value: `${chunks.length} ${chunks.length === 1 ? "chunk" : "chunks"}, ${CHUNK_BYTES} bytes max`,
  };

  const peak = await uploadInParallel(chunks);
  yield { stage: "Parallel upload", value: `${peak} at a time` };

  const tokens = [...new Set(text.toLowerCase().split(/\s+/).filter(Boolean))];
  for (const token of tokens) {
    store.searchIndex.set(token, [
      ...(store.searchIndex.get(token) ?? []),
      hash,
    ]);
  }
  yield {
    stage: "Index update",
    value: `${tokens.length} ${tokens.length === 1 ? "token" : "tokens"} added`,
  };

  return { duplicate: false, chunks: chunks.length };
}
