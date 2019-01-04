import { Action } from '@ngrx/store';
import { Article } from '../../_models';

export const FETCH_ARTICLES                      = '[Article] Fetch list';
export const FETCH_ARTICLES_SUCCESS              = '[Article] Fetch list success';
export const FETCH_ARTICLES_FAILURE              = '[Article] Fetch list failure';
export const CREATE_ARTICLE                      = '[Article] Create article';
export const CREATE_ARTICLE_SUCCESS              = '[Article] Create article success';
export const CREATE_ARTICLE_FAILURE              = '[Article] Create article failure';
export const UPDATE_ARTICLE                      = '[Article] Update article';
export const UPDATE_ARTICLE_SUCCESS              = '[Article] Update article success';
export const UPDATE_ARTICLE_FAILURE              = '[Article] Update article failure';
export const DELETE_ARTICLE                      = '[Article] Delete article';
export const DELETE_ARTICLE_SUCCESS              = '[Article] Delete article success';
export const DELETE_ARTICLE_FAILURE              = '[Article] Delete article failure';

export class FetchArticles implements Action {
  readonly type = FETCH_ARTICLES;
  constructor(readonly offset: number, readonly limit: number) {}
}

export class FetchArticlesSuccess implements Action {
  readonly type = FETCH_ARTICLES_SUCCESS;
  constructor(readonly articles: Article[]) {}
}

export class FetchArticlesFailure implements Action {
  readonly type = FETCH_ARTICLES_FAILURE;
  constructor(readonly error) {}
}

export class CreateArticle implements Action {
  readonly type = CREATE_ARTICLE;
  constructor(readonly article: Article) {}
}

export class CreateArticleSuccess implements Action {
  readonly type = CREATE_ARTICLE_SUCCESS;
  constructor(readonly articleUri: string) {}
}

export class CreateArticleFailure implements Action {
  readonly type = CREATE_ARTICLE_FAILURE;
  constructor(readonly error) {}
}

export class UpdateArticle implements Action {
  readonly type = UPDATE_ARTICLE;
  constructor(readonly article: Article) {}
}

export class UpdateArticleSuccess implements Action {
  readonly type = UPDATE_ARTICLE_SUCCESS;
  constructor() {}
}

export class UpdateArticleFailure implements Action {
  readonly type = UPDATE_ARTICLE_FAILURE;
  constructor(readonly error) {}
}

export class DeleteArticle implements Action {
  readonly type = DELETE_ARTICLE;
  constructor(readonly articleId: number) {}
}

export class DeleteArticleSuccess implements Action {
  readonly type = DELETE_ARTICLE_SUCCESS;
  constructor() {}
}

export class DeleteArticleFailure implements Action {
  readonly type = DELETE_ARTICLE_FAILURE;
  constructor(readonly error) {}
}

export type Actions = FetchArticles | FetchArticlesSuccess | FetchArticlesFailure | CreateArticle | CreateArticleSuccess |
CreateArticleFailure | DeleteArticle | DeleteArticleSuccess | DeleteArticleFailure;
