import React, { FunctionComponent, Suspense as ReactSuspense } from 'react';
// import { useTranslation } from 'react-i18next';

export const Suspense: FunctionComponent = ({ children }) => { // FIXME
  // const [t] = useTranslation();

  return (
    // <ReactSuspense fallback={t<string>('loading')}>
    <ReactSuspense fallback={null}>
      {children}
    </ReactSuspense>
  );
}
