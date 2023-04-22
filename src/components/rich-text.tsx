import { PropsWithChildren } from "react";
import { BLOCKS, MARKS, Document } from "@contentful/rich-text-types";
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";

const Bold = ({ children }: PropsWithChildren) => <p className="font-bold">{children}</p>;

const Text = ({ children }: PropsWithChildren) => <p className="align-center">{children}</p>;

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => <Text>{children}</Text>
  }
};

interface RichTextProps {
  document: Document;
}

export function RichText({ document }: RichTextProps) {
  if (!document || document.nodeType !== BLOCKS.DOCUMENT) return null;

  return <>{documentToReactComponents(document, options)}</>;
}
