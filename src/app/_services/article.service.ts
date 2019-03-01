import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Article } from '../_models';
import { Observable } from 'rxjs';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Article[]>('/api/user/all-articles');
  }

  create(article: Article): Observable<HttpResponse<Object>> {
    return this.http.post('/api/user/article', article, {observe: 'response'});
  }

  delete(articleId: number) {
    return this.http.delete('/api/user/article/' + articleId);
  }

  update(article: Article) {
    return this.http.put('/api/user/article', article);
  }

}
