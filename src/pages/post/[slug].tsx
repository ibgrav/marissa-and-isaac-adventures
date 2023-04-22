import { createContentfulClient } from "@/lib/create-contentful-client";
import { GetStaticPaths, GetStaticProps } from "next";

interface PostProps {
  title: string;
}

export default function Post({ title }: PostProps) {
  return (
    <main>
      <h1>{title}</h1>
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

  const entries = await client.getEntries({
    content_type: "post",
    "fields.slug[in]": slug
  });

  const post = entries.items[0];
  if (!post) return { notFound: true };

  const props: PostProps = {
    title: ""
  };

  if (typeof post.fields.title === "string") props.title = post.fields.title;

  return {
    props: {
      title: post.fields.title as string
    }
  };
};
