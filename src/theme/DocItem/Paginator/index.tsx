import React from "react";
import Paginator from "@theme-original/DocItem/Paginator";
import type PaginatorType from "@theme/DocItem/Paginator";
import type { WrapperProps } from "@docusaurus/types";
import { useDoc } from "@docusaurus/theme-common/internal";
import GiscusComment from "@site/src/components/GiscusComment";

type Props = WrapperProps<typeof PaginatorType>;

export default function PaginatorWrapper(props: Props): JSX.Element {
  const { frontMatter } = useDoc();
  const { no_comment: noComment } = frontMatter as { no_comment: string };
  return (
    <>
      <Paginator {...props} />
      {!noComment && <GiscusComment />}
    </>
  );
}
