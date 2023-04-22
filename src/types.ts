import type { EntrySkeletonType } from "contentful";
import type { Document } from "@contentful/rich-text-types";

export interface PostFields {
  slug: string;
  title: string;
  publishDate: string;
  content: Document;
}

export type PostEntry = EntrySkeletonType<PostFields, "post">;

export interface Post extends PostFields {
  id: string;
}
