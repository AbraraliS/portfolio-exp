import LocalTime from "./LocalTime";

/**
 * A real-time showcase: every value is fetched from the live products and GitHub on the server,
 * refreshed at most every 10 minutes (ISR), so nothing here is typed in by hand.
 */
const REFRESH = 600;

const SITES = [
  { name: "Criza Labs", url: "https://criza.dev", what: "Studio" },
  {
    name: "Crizo for Android",
    url: "https://crizo.criza.dev",
    what: "App site",
  },
  {
    name: "CrizaVoise",
    url: "https://voise.criza.dev",
    what: "Billing software",
  },
  { name: "CrizaTools", url: "https://tools.criza.dev", what: "Browser tools" },
];

type Release = {
  versionName: string;
  notes: string;
  url: string;
  size?: number;
};
type Push = { repo: string; when: string };

async function release(): Promise<Release | null> {
  try {
    const res = await fetch("https://crizo.criza.dev/update.json", {
      next: { revalidate: REFRESH },
    });
    return res.ok ? ((await res.json()) as Release) : null;
  } catch {
    return null;
  }
}

async function status(url: string) {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: "HEAD",
      next: { revalidate: REFRESH },
    });
    return { up: res.ok, ms: Date.now() - start };
  } catch {
    return { up: false, ms: 0 };
  }
}

async function lastPush(): Promise<Push | null> {
  try {
    const res = await fetch(
      "https://api.github.com/users/AbraraliS/events/public?per_page=30",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "abrarali-portfolio",
        },
        next: { revalidate: REFRESH },
      },
    );
    if (!res.ok) return null;
    const events = (await res.json()) as {
      type: string;
      repo: { name: string };
      created_at: string;
    }[];
    // Skip the profile README repository (AbraraliS/AbraraliS); show real project work.
    const push = events.find(
      (e) =>
        (e.type === "PushEvent" || e.type === "CreateEvent") &&
        e.repo.name.toLowerCase() !== "abraralis/abraralis",
    );
    return push
      ? { repo: push.repo.name.split("/")[1], when: push.created_at }
      : null;
  } catch {
    return null;
  }
}

const ago = (iso: string) => {
  const mins = Math.max(1, Math.round((Date.now() - Date.parse(iso)) / 60000));
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 48) return `${hours} h ago`;
  return `${Math.round(hours / 24)} days ago`;
};

export default async function LiveNow() {
  const [app, push, ...checks] = await Promise.all([
    release(),
    lastPush(),
    ...SITES.map((s) => status(s.url)),
  ]);
  const checkedAt = new Date().toISOString();

  return (
    <section id="live" className="folio-sec live" aria-labelledby="live-h">
      <h2 id="live-h" className="folio-h">
        Live now
      </h2>
      <p className="folio-muted">
        Real numbers from my products and GitHub, refreshed every few minutes.
      </p>
      <div className="live-grid">
        <article className="live-card live-release">
          <p className="live-label">
            <span className="live-dot" aria-hidden="true" /> Latest release
          </p>
          {app ? (
            <>
              <h3>
                Crizo for Android{" "}
                <span className="live-version">v{app.versionName}</span>
              </h3>
              <p className="live-notes">{app.notes}</p>
              <a className="btn btn-signal" href={app.url}>
                <span>Get Crizo for Android</span>
              </a>
            </>
          ) : (
            <>
              <h3>Crizo for Android</h3>
              <a
                className="btn btn-signal"
                href="https://crizo.criza.dev/download"
              >
                <span>Get Crizo for Android</span>
              </a>
            </>
          )}
        </article>

        <article className="live-card live-status">
          <p className="live-label">
            <span className="live-dot" aria-hidden="true" /> Products online
          </p>
          <ul>
            {SITES.map((site, i) => (
              <li key={site.url}>
                <a href={site.url}>
                  <span
                    className={checks[i].up ? "live-pill is-up" : "live-pill"}
                    aria-hidden="true"
                  />
                  <span className="live-site">
                    <strong>{site.name}</strong>
                    <small>{site.what}</small>
                  </span>
                  <span className="live-ms">
                    {checks[i].up ? `${checks[i].ms} ms` : "checking"}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="live-foot">
            Checked <time dateTime={checkedAt}>{ago(checkedAt)}</time> from the
            server
          </p>
        </article>

        <article className="live-card live-mini">
          <p className="live-label">Last shipped code</p>
          {push ? (
            <>
              <h3>{push.repo}</h3>
              <p className="live-notes">
                <time dateTime={push.when}>{ago(push.when)}</time> on GitHub
              </p>
            </>
          ) : (
            <h3>On GitHub</h3>
          )}
          <a className="live-link" href="https://github.com/AbraraliS">
            See my GitHub
          </a>
        </article>

        <article className="live-card live-mini">
          <p className="live-label">In Bengaluru</p>
          <h3>
            <LocalTime />
          </h3>
          <p className="live-notes">India Standard Time</p>
          <a className="live-link" href="/contact">
            Write to me
          </a>
        </article>
      </div>
    </section>
  );
}
