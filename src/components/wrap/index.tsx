import React, { lazy, Suspense } from 'react';
import Layout from '../layout';
import Loader from '../loader';
import { WrapProps } from './index.types';

const Index = ({ code }: WrapProps) => {
  const Hero = lazy(() => import('../hero'));
  const isSSR = typeof window !== 'undefined';
  return (
    <Layout>
      {isSSR && (
        <Suspense fallback={<Loader />}>
          <Hero code={code} />
        </Suspense>
      )}
    </Layout>
  );
};

export default Index;
