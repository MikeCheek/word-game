import React from 'react';
import { Router } from '@reach/router';
import SEO from '../atoms/seo';
import Wrap from '../components/wrap';
import Index from './index';

const Code = () => {
  return (
    <>
      <SEO title={'Word Game'} description={'Play this word game'} pathname={'/code'} />
      <Router>
        <Index path="/code/:code/*" />
        <Wrap path="/code/:code" />
      </Router>
    </>
  );
};

export default Code;
