import { ReactNode } from 'react';

declare module 'react' {
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
  
  interface ReactPortal extends ReactElement {
    children: ReactNode;
  }
} 