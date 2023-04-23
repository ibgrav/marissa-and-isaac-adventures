import type { Post, PostEntry } from "@/types";
import type { GetStaticPaths, GetStaticProps } from "next";

import { createContentfulClient } from "@/lib/create-contentful-client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { RichText } from "@/components/rich-text";

interface PostProps {
  post: Post;
}

export default function PostPage({ post }: PostProps) {
  if (!post?.id) return null;

  return (
    <main>
      <h1>{post.title}</h1>
      <RichText document={post.content} />
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </main>
  );
}

type PostParams = { slug: string };

export const getStaticPaths: GetStaticPaths<PostParams> = async () => {
  const client = createContentfulClient();

  const posts = await client.getEntries({
    content_type: "post",
    select: ["fields.slug"],
    order: ["fields.publishDate"]
  });

  const paths: Array<{ params: PostParams }> = [];

  for (const post of posts.items) {
    if (typeof post.fields.slug === "string") {
      paths.push({ params: { slug: post.fields.slug } });
    }
  }

  return {
    paths,
    fallback: "blocking"
  };
};

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async ({ preview, params }) => {
  const client = createContentfulClient({ preview });

  const entries = await client.getEntries<PostEntry>({
    content_type: "post", //@ts-ignore
    "fields.slug[in]": params?.slug
  });

  if (!entries?.items?.[0]?.sys?.id) return { notFound: true };

  const { fields, sys } = entries.items[0];

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
