import React from "react";
import BlogPostPaginator from "@theme-original/BlogPostPaginator";
import type BlogPostPaginatorType from "@theme/BlogPostPaginator";
import type { WrapperProps } from "@docusaurus/types";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import GiscusComment from "@site/src/components/GiscusComment";

type Props = WrapperProps<typeof BlogPostPaginatorType>;

export default function BlogPostPaginatorWrapper(props: Props): JSX.Element {
  const { metadata } = useBlogPost();
  const { frontMatter } = metadata;
  const { no_comment: noComment } = frontMatter;

  return (
    <>
      <BlogPostPaginator {...props} />
      {!noComment && <GiscusComment />}
    </>
  );
}
