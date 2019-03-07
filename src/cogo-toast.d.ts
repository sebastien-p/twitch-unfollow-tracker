declare module 'cogo-toast' {
  import { ReactNode, MouseEventHandler } from 'react';

  export type Options = Partial<{
    hideAfter: number;
    position: 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right';
    heading: string;
    icon: ReactNode;
    bar: {
      size: string;
      style: string;
      color: string;
    };
    onClick: MouseEventHandler;
  }>;

  export type Method = {
    (message: string, options?: Options & { hideAfter: 0 }): () => void;
    (message: string, options?: Options): Promise<void>;
  };

  namespace cogo {
    export const loading: Method;
    export const success: Method;
    export const error: Method;
    export const warn: Method;
    export const info: Method;
  }

  export default cogo;
}
