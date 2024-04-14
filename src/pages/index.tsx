import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import * as jinrishici from "jinrishici";

import styles from "./index.module.css";
import { useEffect, useState } from "react";

function useJinrishici() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<undefined | jinrishici.LoadResultData>();
  useEffect(() => {
    let unmount = false;
    jinrishici.load(
      (result) => {
        if (unmount) return;
        setLoading(false);
        if (result.status === "success") {
          setData(result.data);
        }
        console.log(result);
      },
      () => {
        if (unmount) return;
        setLoading(false);
      }
    );
    return () => {
      unmount = true;
    };
  }, []);

  return { loading, data };
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { data } = useJinrishici();

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        {/* <p className="hero__subtitle">{data?.content || "-"}</p> */}
        <p className="hero__subtitle">
          {data ? (
            <>
              {data.content} <span>——{data.origin.author}</span>
            </>
          ) : (
            <span>&nbsp;</span>
          )}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Go to Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  );
}
