declare type Fn<T = void> = () => T

declare type Fns<P, T = void> = (props: P) => T

declare type ElementChildren = { children: React.ReactElement | Iterable<React.ReactElement> }
