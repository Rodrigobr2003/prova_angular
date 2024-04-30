import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  url = 'http://localhost:3000/livros';

  constructor(private http: HttpClient) {}

  loadBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }
}
