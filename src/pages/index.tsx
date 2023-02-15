import React, { lazy, Suspense } from 'react';
import SEO from '../atoms/seo';
import Layout from '../components/layout';
import Loader from '../components/loader';
import '../styles/globals.scss';

const Game = () => {
  const Hero = lazy(() => import('../components/hero'));
  const isSSR = typeof window !== 'undefined';

  return (
    <>
      <SEO title={'Word Game'} description={'Play this word game'} pathname={'/'} />
      <Layout>
        {isSSR && (
          <Suspense fallback={<Loader />}>
            <Hero />
          </Suspense>
        )}
      </Layout>
    </>
  );
};

export default Game;
