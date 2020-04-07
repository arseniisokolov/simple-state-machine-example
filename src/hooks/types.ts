import { UseStateDispatcherType, ArticleType } from "../types";
import { SearcherType } from "../searchers/types";

export type UseSearchHookType =
    (
        updateArticle: UseStateDispatcherType<ArticleType>,
        updateStatistics: UseStateDispatcherType<[number | null, number | null]>,
        article: ArticleType,
        searchBy: SearcherType
    )
        => UseStateDispatcherType<string>;

export type UseDebounceHookType = (onUpdate: UseStateDispatcherType<any>) => ([any, UseStateDispatcherType<any>]);