import { ThemeConfig } from "@docusaurus/types";
import Giscus, { GiscusProps } from "@giscus/react";
import { useThemeConfig, useColorMode } from "@docusaurus/theme-common";
import BrowserOnly from "@docusaurus/BrowserOnly";

interface GiscusConfig extends ThemeConfig {
  giscus: GiscusProps & { darkTheme: string };
}

export const GiscusComment = () => {
  const { giscus } = useThemeConfig() as unknown as GiscusConfig;
  const { colorMode } = useColorMode();
  const { theme = "light", darkTheme = "dark_dimmed" } = giscus || {};
  const giscusTheme = colorMode === "dark" ? darkTheme : theme;

  return (
    <BrowserOnly fallback={<div>Loading Comments...</div>}>
      {() => (
        <div id="giscus-comment" style={{ paddingTop: 24 }}>
          <Giscus
            mapping="pathname"
            strict="1"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            lang="zh-CN"
            loading="lazy"
            {...giscus}
            theme={giscusTheme}
          />
        </div>
      )}
    </BrowserOnly>
  );
};

export default GiscusComment;
