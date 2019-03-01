import { Action } from '@ngrx/store';
import * as articleActions from '../../actions/article/article.actions' ;
import { Article } from '../../_models';

export interface ArticleState {
  offset: number;
  limit: number;
  articles: Article[];
  error: any;
}

export function articleReducer(state: ArticleState, action: Action) {
  switch (action.type) {
    case articleActions.FETCH_ARTICLES:
      return {...state, offset: (action as articleActions.FetchArticles).offset, limit: (action as articleActions.FetchArticles).limit};
    case articleActions.FETCH_ARTICLES_SUCCESS:
      return {...state, articles: (action as articleActions.FetchArticlesSuccess).articles};
    case articleActions.FETCH_ARTICLES_FAILURE:
      return {...state, error: (action as articleActions.FetchArticlesFailure).error};
    default:
      return state;
  }
}
