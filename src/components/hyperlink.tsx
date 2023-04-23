import { Block, Inline } from "@contentful/rich-text-types";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";

interface HyperlinkFields {
  slug?: string;
  file?: { url?: string };
}

export function Hyperlink(node: Block | Inline, children: ReactNode) {
  let href = "";
  let target: HTMLAttributeAnchorTarget = "_blank";

  if (node.nodeType === "hyperlink") {
    href = node.data.uri;
  }

  // if(node.nodeType === 'd') {}
  else {
    const fields = node?.data?.target?.fields as HyperlinkFields;
    if (!fields) return null;

    if (fields.slug) {
      target = "_self";
      href = `/post/${fields.slug}`;
    }

    if (fields.file?.url) href = `https://${fields.file.url}`;
  }

  if (!href) return null;
  return (
    <a target={target} href={href}>
      {children}
    </a>
  );
}
