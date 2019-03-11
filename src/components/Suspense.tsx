import React, { FunctionComponent, Suspense as ReactSuspense } from 'react';

export const Suspense: FunctionComponent = ({ children }) => (
  <ReactSuspense fallback={null}>{children}</ReactSuspense>
);
