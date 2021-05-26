import React from 'react';
import { AppProps } from 'next/app';
import { Router } from 'next/router';

import '../styles/globals.scss';

Router.events.on('routeChangeComplete', () => {
  // Will not work if scroll is not on <html>
  window.scrollTo(0, 0);
});

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
