import type { Post, PostEntry } from "@/types";
import type { GetStaticPaths, GetStaticProps } from "next";

import { createContentfulClient } from "@/lib/create-contentful-client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichText } from "@/components/rich-text";

interface PostProps {
  post: Post;
}

export default function PostPage({ post }: PostProps) {
  return (
    <main>
      <h1>{post.title}</h1>
      <RichText document={post.content} />
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </main>
  );
}

type PostParams = { slug: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Array<{ params: PostParams }> = [];

  const client = createContentfulClient();
  const posts = await client.getEntries({
    content_type: "post",
    select: ["fields.slug"],
    order: ["fields.publishDate"]
  });

  posts.items.forEach((post) => {
    const slug = post.fields.slug;
    if (slug && typeof slug === "string") {
      console.log(`getStaticPaths: /post/${slug}`);
      paths.push({ params: { slug } });
    }
  });

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async ({ preview, params }) => {
  const slug = params?.slug;
  if (!slug) return { notFound: true };

  const client = createContentfulClient({ preview });

  const entries = await client.getEntries<PostEntry>({
    content_type: "post", //@ts-ignore
    "fields.slug[in]": slug
  });

  const { fields, sys } = entries.items[0] || {};
  if (!sys?.id) return { notFound: true };

  return {
    props: {
      post: {
        id: sys.id || "",
        slug: fields.slug || "",
        title: fields.title || "",
        publishDate: fields.publishDate || "",
        content: fields.content || {}
      }
    }
  };
};
