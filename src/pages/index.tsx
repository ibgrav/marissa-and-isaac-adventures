import { createContentfulClient } from "@/lib/create-contentful-client";
import { Post, PostEntry } from "@/types";
import type { BLOCKS } from "@contentful/rich-text-types";
import { GetStaticProps } from "next";

interface HomeProps {
  posts: Array<Post>;
}

export default function HomePage({ posts }: HomeProps) {
  return (
    <main className="container mx-auto">
      <ul className="flex flex-col gap-2 my-2">
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/post/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>

      <pre>{JSON.stringify({ posts }, null, 2)}</pre>
    </main>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ preview }) => {
  const client = createContentfulClient({ preview });
  const entries = await client.getEntries<PostEntry>({
    content_type: "post",
    select: ["fields.title", "fields.slug", "fields.publishDate"]
  });

  const posts: Array<Post> = entries.items.map(({ fields, sys }) => {
    return {
      id: sys.id,
      slug: fields.slug || "",
      title: fields.title || "",
      publishDate: fields.publishDate || "",
      content: { nodeType: "document" as BLOCKS.DOCUMENT, data: {}, content: [] }
    };
  });

  return {
    props: { posts }
  };
};
