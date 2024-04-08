import useSWR from "swr";
import {
  getGithubSourceContent,
  getRangeContent,
  parseRange,
} from "@site/src/utils/file";
import { useCallback, useMemo } from "react";
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

function parseLineRange(
  range: (number | [number, number])[] | number | string | undefined
): {
  start: number;
  end: number;
}[] {
  if(!range) return [];
  if (typeof range === "string") {
    const list = range.replace(/[{}]/g, "").split(",");
    return list.map((item) => {
      let [start, end] = item.split("-").map((item) => {
        return parseInt(item);
      });
      return {
        start,
        end: end || start,
      };
    });
  }
  if (typeof range === "number") {
    return [
      {
        start: range,
        end: range,
      },
    ];
  }
  return range.map((r) => {
    return {
      start: Array.isArray(r) ? r[0] : r,
      end: Array.isArray(r) ? r[1] || r[0] : r,
    };
  });
}

export const ReactSourceHighlight = (props: {
  path: string;
  language?: string;
  highlight?: (number | [number, number])[] | string | undefined;
  collapse?: (number | [number, number])[] | string | undefined;
}) => {
  const { data, isLoading, start, url, path } = useReactSourceContent(
    props.path
  );
  const collapseRange = useMemo(() => {
    return parseLineRange(props.collapse).map((range) => {
      return {
        start: range.start - start - 1,
        end: range.end - start - 1,
      };
    });
  }, [props.collapse]);

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

  const getLineBeforeNode = useCallback((line: number) => {
    if (collapseRange.some((item) => line === item.start)) {
      return (
        <span
          className={css({
            userSelect: "none",
            color: "var(--ifm-color-emphasis-300)",
          })}
        >
          {" "}
          <span
            className={css({
              position: "absolute",
              width: "100%",
            })}
          >
            ~~~~~~~~~~~~~~
          </span>
        </span>
      );
    }
  }, []);

  const getLineClassName = useCallback((line: number) => {
    if (collapseRange.some(({ start, end }) => line >= start && line <= end)) {
      return css({
        height: 0,
        opacity: 0,
        overflow: "hidden",
        position: "absolute",
      });
    }
  }, []);

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
      {...{
        getLineBeforeNode,
        getLineClassName,
      }}
    >
      {isLoading ? "loading" : data}
    </CodeBlock>
  );
};

export default ReactSourceHighlight;
