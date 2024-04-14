declare module "jinrishici" {
  export interface LoadResult {
    status: string;
    data: LoadResultData;
    token: string;
    ipAddress: string;
    warning?: any;
  }

  export interface LoadResultData {
    id: string;
    content: string;
    popularity: number;
    origin: Origin;
    matchTags: string[];
    recommendedReason: string;
    cacheAt: string;
  }

  interface Origin {
    title: string;
    dynasty: string;
    author: string;
    content: string[];
    translate: string[];
  }

  export function load(
    callback: (result: LoadResult) => void,
    errHandler: (e: unknown) => void
  ): void;

  export default {};
}
