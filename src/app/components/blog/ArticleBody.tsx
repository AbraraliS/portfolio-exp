import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { PostBlock } from "@/Types/types";
import { headingId } from "@/../utils/Data/posts";
import RouteDiagram from "../projects/RouteDiagram";

/** Handles `code`, **bold** and [text](url). Rendered at build time. */
const inline = (text: string): ReactNode[] =>
  text
    .split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("`"))
        return <code key={index}>{part.slice(1, -1)}</code>;
      if (part.startsWith("**"))
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        return href.startsWith("/") ? (
          <Link key={index} href={href}>
            {label}
          </Link>
        ) : (
          <a key={index} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }
      return <Fragment key={index}>{part}</Fragment>;
    });

const KEYWORDS =
  /^(?:abstract|as|async|await|break|case|catch|class|const|continue|def|else|export|extends|false|finally|for|from|function|if|import|in|interface|let|new|None|not|null|or|public|raise|return|static|this|throw|true|True|False|try|type|undefined|var|void|while|with)$/;

const TOKEN =
  /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|(?<![\w])#[^\n{]*$|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d[\d_.]*\b|\b[A-Za-z_][\w]*\b)/gm;

/** A small highlighter. Runs at build time, so it ships no JavaScript. */
const highlight = (code: string): ReactNode[] => {
  const output: ReactNode[] = [];
  let last = 0;
  for (const match of code.matchAll(TOKEN)) {
    const token = match[0];
    const start = match.index;
    if (start > last) output.push(code.slice(last, start));
    let kind: string | null = null;
    if (/^(\/\*|\/\/|#)/.test(token)) kind = "comment";
    else if (/^["'`]/.test(token)) kind = "string";
    else if (/^\d/.test(token)) kind = "number";
    else if (KEYWORDS.test(token)) kind = "keyword";
    output.push(
      kind ? (
        <span key={start} className={`tok-${kind}`}>
          {token}
        </span>
      ) : (
        token
      ),
    );
    last = start + token.length;
  }
  if (last < code.length) output.push(code.slice(last));
  return output;
};

export default function ArticleBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="prose">
      {blocks.map((block, index) => {
        switch (block.t) {
          case "p":
            return <p key={index}>{inline(block.text)}</p>;
          case "h2":
            return (
              <h2 key={index} id={headingId(block.text)}>
                {block.text}
              </h2>
            );
          case "note":
            return (
              <aside key={index} className="prose-note">
                {inline(block.text)}
              </aside>
            );
          case "quote":
            return (
              <figure key={index} className="prose-quote">
                <blockquote>{block.text}</blockquote>
                <figcaption>{block.cite}</figcaption>
              </figure>
            );
          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag key={index}>
                {block.items.map((item) => (
                  <li key={item}>{inline(item)}</li>
                ))}
              </Tag>
            );
          }
          case "code":
            return (
              <figure key={index} className="prose-code">
                {block.file && <figcaption>{block.file}</figcaption>}
                <pre tabIndex={0}>
                  <code>{highlight(block.code)}</code>
                </pre>
              </figure>
            );
          case "route":
            return (
              <figure key={index} className="prose-route">
                <RouteDiagram stops={block.stops} label={block.label} />
                <figcaption>{block.label}</figcaption>
              </figure>
            );
          case "table":
            return (
              <div key={index} className="prose-table" tabIndex={0}>
                <table>
                  <thead>
                    <tr>
                      {block.head.map((cell) => (
                        <th key={cell} scope="col">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.join()}>
                        {row.map((cell) => (
                          <td key={cell}>{inline(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
