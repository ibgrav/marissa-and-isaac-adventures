import type { NextApiHandler } from "next";

const handler: NextApiHandler<string> = (req, res) => {
  let slug = req.query.slug;
  if (typeof slug !== "string") slug = "/";
  if (!slug.startsWith("/")) slug = `/${slug}`;

  const clear = Boolean(req.query.clear);

  if (clear) res.clearPreviewData();
  else res.setPreviewData({});

  res.redirect(slug);
};

export default handler;
