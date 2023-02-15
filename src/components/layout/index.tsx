import React from 'react';

import * as styles from './index.module.scss';
import { LayoutProps } from './index.types';

const Index = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <div id="top" className={styles.layout}>
        <h1 className={styles.heading}>Word Game</h1>
        {children}
      </div>
    </>
  );
};

export default Index;
