import { SearcherType } from "./types";

export const searchFunctionally: SearcherType = (query, article) => {
    return article.split(query);
}
