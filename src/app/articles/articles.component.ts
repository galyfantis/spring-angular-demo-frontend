import { OnInit, Component, ViewChild, TemplateRef, AfterViewInit, ContentChild } from '@angular/core';
import { Article } from '../_models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as articleActions from '../actions/article/article.actions' ;
import { map } from 'rxjs/operators';
import { NgbdArticleModalComponent } from './article-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({templateUrl: 'articles.component.html'} )
export class ArticlesComponent implements OnInit {

  articles: Observable<Article[]>;

  @ViewChild(NgbdArticleModalComponent)
  modal: NgbdArticleModalComponent;

  constructor(private store: Store<any>, private modalService: NgbModal) {
    this.articles = this.store.select('article').pipe(map(a => a.articles));
  }

  ngOnInit () {
    this.fetchAll();
  }

  refresh() {
    this.fetchAll();
  }

  private fetchAll () {
    this.store.dispatch(new articleActions.FetchArticles(0, 10));
  }

  createArticle() {
    this.modal.open(new Article(), a => this.store.dispatch(new articleActions.CreateArticle(a)));
  }

  updateArticle(article: Article) {
    this.modal.open(article, a => this.store.dispatch(new articleActions.UpdateArticle(a)));
  }

  deleteArticle(articleId: number) {
    this.store.dispatch(new articleActions.DeleteArticle(articleId));
  }

}
