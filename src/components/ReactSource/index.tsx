import useSWR from "swr";
import {
  getGithubSourceContent,
  getRangeContent,
  parseRange,
} from "@site/src/utils/file";
import { useMemo } from "react";
import CodeBlock from "@theme/CodeBlock";
import { css } from "@emotion/css";

function useSourceContent(param: {
  repo: string;
  version: string;
  path: string;
}) {
  const githubUrl = `https://github.com/${param.repo}/blob/${param.version}/${param.path}`;
  const swr = useSWR(
    `${param.repo}@${param.version}/${param.path}`,
    () => {
      return getGithubSourceContent(param);
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );
  return {
    ...swr,
    githubUrl,
  };
}

function getRemoteUrl(
  param: {
    repo: string;
    version: string;
    path: string;
    range?: string;
  },
  type?: string
) {
  let githubDevUrl = `https://github.dev/${param.repo}/blob/${param.version}/${param.path}`;
  if (param.range) {
    githubDevUrl = githubDevUrl + "#" + param.range;
  }
  return githubDevUrl;
}

function useReactSourceContent(filePath: string) {
  const [path, range] = useMemo(() => filePath.split("#"), [filePath]);
  const version = "v18.2.0";
  const repo = "facebook/react";
  const swr = useSourceContent({
    repo,
    version,
    path,
  });

  const data: string | undefined = useMemo(() => {
    if (!swr.data) {
      return swr.data;
    }
    return getRangeContent(swr.data, range);
  }, [swr.data, range]);

  const start = useMemo(() => {
    const [start] = parseRange(range);
    if (!start) {
      return 0;
    }
    return start - 1;
  }, [data]);

  const url = useMemo(() => {
    return getRemoteUrl({
      repo,
      version,
      path,
      range,
    });
  }, [swr.githubUrl, range]);

  return {
    ...swr,
    data,
    start,
    url,
    path,
  };
}

// const reactLocalPath = "vscode://file/Users/chenh/Desktop/code/git/react/";

export const ReactSourceHighlight = (props: {
  path: string;
  language?: string;
  highlight?: (number | [number, number])[] | string | undefined;
}) => {
  const { data, isLoading, start, url, path } = useReactSourceContent(
    props.path
  );
  const highlightMeta = useMemo(() => {
    if (!props.highlight) {
      return "";
    }
    if (typeof props.highlight === "string") {
      const decStart = (str: string) => {
        return `${parseInt(str) - start}`;
      };
      const data = props.highlight
        .split(",")
        .map((item) => {
          if (item.includes("-")) {
            return item
              .split("-")
              .map((item) => {
                return decStart(item);
              })
              .join("-");
          }
          return decStart(item);
        })
        .join(",");
      return `{${data}}`;
    }
    const list = props.highlight.map((item) => {
      if (typeof item === "number") {
        return `${item - start}`;
      }
      return `${item[0] - start}-${item[1] - start}}`;
    });
    return `{${list.join(",")}}`;
  }, [props.highlight, start]);

  // const localUrl = reactLocalPath + path + ":" + (start + 1);

  return (
    <CodeBlock
      language={props.language || "js"}
      title={
        (
          <a href={url} target="_blank">
            {props.path}
          </a>
        ) as unknown as string
      }
      metastring={`${highlightMeta}`}
      showLineNumbers
      className={css({ counterReset: `line-count ${start}` })}
    >
      {isLoading ? "loading" : data}
    </CodeBlock>
  );
};

export default ReactSourceHighlight;
