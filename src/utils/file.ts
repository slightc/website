/**
 * @param range L18-L20, L18, empty
 */
export function parseRange(range: string): [start: number, end: number] {
  const [start = 0, end = 0] = range
    .split("-")
    .map((s) => s.replace(/L/g, ""))
    .map(Number)
    .map((n) => (isNaN(n) ? 0 : n));
  return [start, end];
}

export function getRangeContent(content: string, range?: string): string {
  const parsedRange = parseRange(range || "");
  if (parsedRange[0] === 0) {
    return content;
  }
  const lines = content.split("\n");
  const start = parsedRange[0] - 1;
  const end = parsedRange[1] > 0 ? parsedRange[1] - 1 : start;
  return lines.slice(start, end + 1).join("\n");
}

/**
 *
 * @param filePath name/path/file#L18-L20
 */
export function getSourceContent(filePath: string): string {
  const [file, range = ""] = filePath.split("#");

  const content = ""; //require("@site/source_ref/react/" + file).default;

  return getRangeContent(content, range);
}

export async function getGithubSourceContent(param: {
  repo: string;
  version: string;
  path: string;
  range?: string;
}): Promise<string> {
  const { repo, version, path, range = "" } = param;
  //   const res = await fetch(
  //     "https://raw.githubusercontent.com/" + repo + "/" + version + "/" + path
  //   );
  const res = await fetch(
    "https://cdn.jsdelivr.net/gh/" + repo + "@" + version + "/" + path
  );

  const content = await res.text();
  return getRangeContent(content, range);
}

export async function getReactSourceContent(filePath: string): Promise<string> {
  const [path, range] = filePath.split("#");
  return getGithubSourceContent({
    repo: "facebook/react",
    version: "v18.2.0",
    path,
    range,
  });
}
