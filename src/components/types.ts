import { SearcherType } from "../searchers/types";
import { ArticleType } from "../types";

export type SearchFormPropsType = {
    article: ArticleType;
    onUpdateArticle: (v: string) => string;
    searchBy: SearcherType;
    caption: string;
    mix?: string;
}

export type HighlightedPhrasePropsType = {
    phrase: string;
}