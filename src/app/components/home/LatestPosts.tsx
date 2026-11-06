import Link from "next/link";
import { allPosts } from "@/../utils/Data/posts";
import PostCard from "../blog/PostCard";
import Reveal from "../site/Reveal";
import Stop from "../site/Stop";

export default function LatestPosts() {
  return (
    <section id="blog" className="section">
      <Stop
        title="Blog"
        intro="What I've learned building these systems, including the mistakes, with the real code."
      />
      <Reveal className="post-grid post-grid-home">
        {allPosts()
          .slice(0, 3)
          .map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
      </Reveal>
      <Link href="/blog" className="btn btn-ink section-more">
        <span>Read all articles</span>
      </Link>
    </section>
  );
}
