import { Post } from "@/Types/types";

export const llmFeatures: Post = {
  slug: "lessons-from-shipping-llm-features",
  title: "LLM features need boring engineering: lessons from my projects",
  description:
    "Practical lessons from BuySmart AI, DataTalk Pro and TIPS on caching model output, building fallbacks, placing safety checks and fitting models to real hardware.",
  excerpt:
    "The model call is the easy part. Caching, fallbacks, structured output and where you place a safety check decide whether an LLM feature can be trusted, including one check of mine in the wrong place.",
  date: "2026-11-06",
  line: "ai",
  stops: ["Cache", "Fallback", "Structure", "Guard", "Fit"],
  projects: ["buysmart-ai", "6", "1"],
  skills: ["LLM APIs", "AI Integration", "Prompt Engineering", "Python"],
  blocks: [
    {
      t: "p",
      text: "Adding a language model to a product takes an afternoon. Making that feature predictable, affordable and safe takes much longer, and almost none of that work involves the model. These lessons come from three projects with different shapes: [BuySmart AI](/projects/buysmart-ai), [DataTalk Pro](/projects/6) and [TIPS](/projects/1).",
    },
    { t: "h2", text: "Cache the output, not just the input" },
    {
      t: "p",
      text: "BuySmart originally cached raw product data but re-ran the AI analysis every time someone searched for the same product. The fix is documented in the repository, and its problem statement is worth reading closely:",
    },
    {
      t: "list",
      items: [
        "Re-running the AI analysis each time, which was expensive and slow.",
        "Returning potentially different results for the same product.",
        "Wasting API calls to the AI service.",
      ],
    },
    {
      t: "p",
      text: "The second point is the one people miss. Models are not deterministic, so uncached analysis means the same product can get a different score on each search. For a tool whose purpose is an objective recommendation, that damages trust more than slowness does. The fix checks for a stored result first:",
    },
    {
      t: "code",
      lang: "java",
      file: "AnalysisServiceImpl.java",
      code: `@Override
public Optional<AnalysisResult> getLatestAnalysisForProduct(String productId) {
    return analysisRepo.findTopByProduct_ProductIdOrderByAnalyzedAtDesc(productId);
}`,
    },
    {
      t: "p",
      text: "Responses from this path carry a `cached: true` flag, so the frontend knows what it is showing. Caching also creates the next problem: the README lists stale prices as a known issue, because the raw product cache has no strict expiry. That is a fair trade to make as long as it is written down.",
    },
    { t: "h2", text: "Decide what happens when the model is unavailable" },
    {
      t: "p",
      text: "Hosted models go down and rate limits get hit. BuySmart handles this with an explicit switch: when the Python service is unavailable, the `ai.enabled` property routes requests to basic local parsing with Jsoup. The result is less insightful, and the user still gets an answer.",
    },
    {
      t: "p",
      text: "Designing this forces a useful question: what is the least useful version of this feature that is still honest? A plain comparison of specifications is fine. Inventing a score to fill the gap is not.",
    },
    { t: "h2", text: "Ask for structure, then validate it" },
    {
      t: "p",
      text: "If application code consumes model output, free-form text is a liability. BuySmart's AI service returns structured JSON with a recommendation, score, pros and cons, shaped through Pydantic. This gives the UI something dependable to render.",
    },
    {
      t: "p",
      text: "Structure does not make the content true. The README says so directly: Gemini can misinterpret generic descriptions when the source data is sparse. A schema guarantees the shape of an answer and nothing about whether it is correct.",
    },
    { t: "h2", text: "A prompt is not a security boundary" },
    {
      t: "p",
      text: "This is the lesson I most want to pass on, because the mistake is in my own code. DataTalk Pro lets people query a MySQL database in plain English. The prompt that writes the final answer contains this rule:",
    },
    {
      t: "quote",
      text: 'If the SQL query contains any dangerous operations like DELETE, DROP, UPDATE, or ALTER, do not execute the query. Instead, respond with "I\'m sorry, but I cannot execute queries that modify or delete data."',
      cite: "DataTalk Pro, src/app.py",
    },
    {
      t: "p",
      text: "It reads like a guard. Now look at the order of the chain that uses it:",
    },
    {
      t: "code",
      lang: "python",
      file: "src/app.py, with comments added",
      code: `chain = (
    RunnablePassthrough.assign(query=sql_chain).assign(
        schema=lambda _: db.get_table_info(),
        response=lambda vars: db.run(vars['query'])  # runs here
    )
    | prompt   # the "do not execute" rule is read here
    | llm
    | StrOutputParser()
)`,
    },
    {
      t: "p",
      text: "`db.run` happens before the prompt is ever formatted. If the first model generates a `DELETE`, the statement has already been sent to the database by the time the second model is told not to run it. The user would see a polite refusal for something that already happened. Nothing about this looks wrong in a quick demo, because the model rarely writes destructive SQL when asked ordinary questions.",
    },
    {
      t: "p",
      text: "The principle is simple: an instruction to a model is a request, not an enforcement. Real controls belong in code and in permissions, in that order of convenience and the reverse order of strength.",
    },
    {
      t: "code",
      lang: "python",
      file: "A sketch of the fix, not current repo code",
      code: `import sqlglot
from sqlglot import exp

def run_read_only(db, sql: str):
    statements = sqlglot.parse(sql, read="mysql")
    if len(statements) != 1 or not isinstance(statements[0], exp.Select):
        raise ValueError("Only a single SELECT statement is allowed.")
    return db.run(sql)`,
    },
    {
      t: "p",
      text: "Parsing the statement is better than searching for the word `DELETE`, because text matching is easy to get wrong in both directions. The strongest control sits outside the application: connect with a database user that only has `SELECT` rights. Then even a bug in the check cannot change any data.",
    },
    { t: "h2", text: "Fit the model to the machine you have" },
    {
      t: "p",
      text: "[TIPS](/projects/1) analyses recorded interviews and runs its model locally. Its semantic stage uses Qwen2.5-3B-Instruct with 4-bit NF4 quantisation, which lets it run on GPUs with around 3 GB of VRAM. That constraint shaped the system more than any accuracy benchmark would.",
    },
    {
      t: "p",
      text: "It also helps that the LLM is one stage out of six. Timing, speech, gaze and pitch are extracted with conventional tools such as faster-whisper, librosa, OpenCV and MediaPipe. The model only handles what needs language understanding: scoring each answer against the job description.",
    },
    {
      t: "route",
      label: "TIPS analysis stages",
      stops: [
        "Timebase",
        "Extraction",
        "Segmentation",
        "Behaviour",
        "Semantic scoring",
        "Aggregation",
      ],
    },
    {
      t: "p",
      text: "This is a pattern worth copying. Use deterministic code wherever it can do the job, and spend the model on the part that truly needs it. The result is cheaper, easier to test, and easier to explain when someone asks why a score came out the way it did.",
    },
    { t: "h2", text: "A short checklist" },
    {
      t: "list",
      items: [
        "Should two identical requests get the same answer? If so, cache the output.",
        "What does the user see when the model is unavailable?",
        "Is the output validated against a schema before code touches it?",
        "Does any action happen before a check that claims to prevent it? Read the actual execution order.",
        "Which permissions would limit the damage if every check failed?",
        "Which parts of this pipeline could be ordinary code?",
      ],
    },
    {
      t: "p",
      text: "None of this is glamorous, and that is the point. The model gets the attention, while this surrounding work decides whether people can rely on the feature.",
    },
  ],
};
