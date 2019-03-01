import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AlertService, ArticleService } from '../../_services';
import * as articleActions from '../../actions/article/article.actions';
import { map, switchMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ArticleState } from './article.reducer';


@Injectable()
export class ArticleEffects {

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private articleService: ArticleService,
    private alertService: AlertService
  ) { }

  @Effect()
  $fetchArticles = this.actions$
                      .pipe(
                        ofType(articleActions.FETCH_ARTICLES),
                        map(a => a as articleActions.FetchArticles),
                        switchMap(a => {
                          return this.articleService.getAll()
                            .pipe(
                              map(articles => new articleActions.FetchArticlesSuccess(articles)),
                              catchError((error) => of(new articleActions.FetchArticlesFailure(error))));
                        })
                      );

  @Effect({dispatch: false})
  $fetchArticlesFailure = this.actions$
                          .pipe(
                            ofType(articleActions.FETCH_ARTICLES_FAILURE),
                            map(a => a as articleActions.FetchArticlesFailure),
                            tap(a => {
                              this.alertService.error(a.error);
                            })
                          );

  @Effect()
  $createArticle = this.actions$
                      .pipe(
                        ofType(articleActions.CREATE_ARTICLE),
                        map(a => a as articleActions.CreateArticle),
                        switchMap(a => {
                          return this.articleService.create(a.article)
                            .pipe(
                              map(resp => resp.headers.get('Location')),
                              map(location => new articleActions.CreateArticleSuccess(location)),
                              catchError((error) => of(new articleActions.CreateArticleFailure(error))));
                        })
                      );

  @Effect()
  $createArticleSuccess = this.actions$
                            .pipe(
                              ofType<articleActions.CreateArticleSuccess>(articleActions.CREATE_ARTICLE_SUCCESS),
                              withLatestFrom(this.store.select<ArticleState>('article')),
                              map(([action, articleState]) => {
                                console.log(action, articleState);
                                // const articleState = storeState;// as ArticleState;
                                return new articleActions.FetchArticles(articleState.offset, articleState.limit);
                              }
                            ));

  @Effect({dispatch: false})
  $createArticleFailure = this.actions$
                            .pipe(
                              ofType<articleActions.CreateArticleFailure>(articleActions.CREATE_ARTICLE_FAILURE),
                              tap(a => console.log(a)),
                              tap(a => this.alertService.error(a.error))
                            );

  @Effect()
  $updateArticle = this.actions$
                      .pipe(
                        ofType<articleActions.UpdateArticle>(articleActions.UPDATE_ARTICLE),
                        switchMap(a => {
                          return this.articleService.update(a.article)
                            .pipe(
                              map($ => new articleActions.UpdateArticleSuccess()),
                              catchError((error) => of(new articleActions.UpdateArticleFailure(error))));
                        })
                      );

  @Effect()
  $updateArticleSuccess = this.actions$
                            .pipe(
                              ofType<articleActions.UpdateArticleSuccess>(articleActions.UPDATE_ARTICLE_SUCCESS),
                              withLatestFrom(this.store.select('article')),
                              map(([action, storeState]) => {
                                const articleState = storeState as ArticleState;
                                return new articleActions.FetchArticles(articleState.offset, articleState.limit);
                              }
                            ));

  @Effect({dispatch: false})
  $updateArticleFailure = this.actions$
                            .pipe(
                              ofType<articleActions.UpdateArticleFailure>(articleActions.UPDATE_ARTICLE_FAILURE),
                              tap(a => this.alertService.error(a.error))
                            );

  @Effect()
  $deleteArticle = this.actions$
                      .pipe(
                        ofType<articleActions.DeleteArticle>(articleActions.DELETE_ARTICLE),
                        switchMap(a => {
                          return this.articleService.delete(a.articleId)
                            .pipe(
                              map($ => new articleActions.DeleteArticleSuccess()),
                              catchError((error) => of(new articleActions.DeleteArticleFailure(error))));
                        })
                      );

  @Effect()
  $deleteArticleSuccess = this.actions$
                            .pipe(
                              ofType<articleActions.DeleteArticleSuccess>(articleActions.DELETE_ARTICLE_SUCCESS),
                              withLatestFrom(this.store.select('article')),
                              map(([action, storeState]) => {
                                const articleState = storeState as ArticleState;
                                return new articleActions.FetchArticles(articleState.offset, articleState.limit);
                              }
                            ));

  @Effect({dispatch: false})
  $deleteArticleFailure = this.actions$
                            .pipe(
                              ofType<articleActions.DeleteArticleFailure>(articleActions.DELETE_ARTICLE_FAILURE),
                              tap(a => this.alertService.error(a.error))
                            );

}
