import Link from "next/link";
import { Post } from "@/Types/types";
import { formatPostDate, readingMinutes } from "@/../utils/Data/posts";
import { lineStyle } from "@/../utils/site";
import PostCover from "./PostCover";

export default function PostCard({
  post,
  lead = false,
}: {
  post: Post;
  lead?: boolean;
}) {
  return (
    <article
      className={`post-card ${lead ? "post-card-lead" : ""}`}
      style={lineStyle(post.line)}
    >
      <div className="post-card-cover">
        <PostCover post={post} />
      </div>
      <div className="post-card-body">
        <p className="post-meta">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span>{readingMinutes(post)} min read</span>
        </p>
        <h3>
          <Link href={`/blog/${post.slug}`} className="card-link">
            {post.title}
          </Link>
        </h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
      </div>
    </article>
  );
}
