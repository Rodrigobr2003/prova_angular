import { BookService } from '../../book.service';
import { Book } from './../../book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  listaLivros: Book[] = [];

  constructor(private service: BookService) {}

  ngOnInit(): void {
    this.carregaLivros();
  }

  carregaLivros() {
    this.service.loadBooks().subscribe({
      next: (data) => (this.listaLivros = data),
    });
  }
}
