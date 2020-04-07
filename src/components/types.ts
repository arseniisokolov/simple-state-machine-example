import { SearcherType } from "../searchers/types";
import { ArticleType, UseStateDispatcherType } from "../types";

export type SearchFormPropsType = {
    article: ArticleType;
    caption: string;
    onUpdateArticle: UseStateDispatcherType<ArticleType>;
    searchBy: SearcherType;
    mix?: string;
}

export type HighlightedPhrasePropsType = {
    phrase: string;
}