import { createClient } from "contentful";

interface CreateContentfulClientArgs {
  preview?: boolean;
}

export function createContentfulClient({ preview }: CreateContentfulClientArgs = {}) {
  const space = process.env.CONTENTFUL_SPACE_ID || "";
  const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN || "";
  const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN || "";

  const client = createClient({
    space,
    host: `${preview ? "preview" : "cdn"}.contentful.com`,
    accessToken: preview ? previewToken : deliveryToken
  });

  return client.withoutUnresolvableLinks;
}
