export type ArticleType = string | (string | JSX.Element)[];

export type UseStateDispatcherType<T> = React.Dispatch<React.SetStateAction<T>>;