export type WorkTag =
  | typeof FunctionComponent
  | typeof HostRoot
  | typeof HostComponent
  | typeof HostText
  | typeof Fragment
  | typeof ContextProvider
  | typeof ContextConsumer
  | typeof ForwardRef
  | typeof SuspenseComponent
  | typeof MemoComponent
  | typeof LazyComponent;

export const FunctionComponent = 0;
export const HostRoot = 3;
export const HostComponent = 5;
export const HostText = 6;

export const Fragment = 7;
export const ContextProvider = 8;
export const ContextConsumer = 9;
export const ForwardRef = 10;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const LazyComponent = 15;
