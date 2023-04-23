import { BLOCKS, MARKS, Document } from "@contentful/rich-text-types";
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";
import { Hyperlink } from "./hyperlink";

const options: Options = {
  renderNode: {
    [BLOCKS.HEADING_3]: (_node, children) => <h3 className="text-3xl font-bold">{children}</h3>,
    [BLOCKS.HEADING_4]: (_node, children) => <h4 className="text-2xl font-bold">{children}</h4>,
    [BLOCKS.HEADING_5]: (_node, children) => <h5 className="text-xl font-semibold">{children}</h5>,
    [BLOCKS.HEADING_6]: (_node, children) => <h6 className="text-lg font-normal">{children}</h6>,
    [INLINES.HYPERLINK]: Hyperlink,
    [INLINES.ENTRY_HYPERLINK]: Hyperlink,
    [INLINES.ASSET_HYPERLINK]: Hyperlink
  }
};

interface RichTextProps {
  document: Document;
}

export function RichText({ document }: RichTextProps) {
  if (!document || document.nodeType !== BLOCKS.DOCUMENT) return null;

  return <>{documentToReactComponents(document, options)}</>;
}
