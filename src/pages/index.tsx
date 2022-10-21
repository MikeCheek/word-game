import React, { lazy, Suspense, useEffect, useState } from "react";
import * as styles from "../styles/game.module.scss";
import SEO from "../atoms/seo";
import Loader from "../components/loader";
import Layout from "../components/layout";
import "../styles/globals.scss";

const Game = () => {
  const [code, setCode] = useState<string>();
  const Hero = lazy(() => import("../components/hero"));

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    params.forEach((value, key) => {
      if (key === "word") {
        setCode(value.toLowerCase());
      }
    });
  }, []);

  return (
    <>
      <SEO
        title={"Word Game"}
        description={"Play this word game"}
        pathname={"/"}
      />
      <Layout noGameLink={true}>
        <h1 className={styles.heading}>Word Game</h1>
        <Suspense fallback={<Loader />}>
          <Hero code={code} />
        </Suspense>
      </Layout>
    </>
  );
};

export default Game;
