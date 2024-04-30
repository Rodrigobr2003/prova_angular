import { FormBuilder, FormGroup } from '@angular/forms';
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
  livroFormGroup: FormGroup;

  constructor(private service: BookService, private formBuilder: FormBuilder) {
    this.livroFormGroup = formBuilder.group({
      id: [''],
      titulo: [''],
      autor: [''],
      editora: [''],
      preco: [''],
    });
  }

  ngOnInit(): void {
    this.carregaLivros();
  }

  carregaLivros() {
    this.service.loadBooks().subscribe({
      next: (data) => (this.listaLivros = data),
    });
  }

  remover(livro: Book) {
    this.service.removeBook(livro).subscribe({
      next: () => this.carregaLivros(),
    });
  }

  save() {
    this.service.addBook(this.livroFormGroup.value).subscribe({
      next: (data) => {
        this.listaLivros.push(data);
      },
    });

    this.livroFormGroup.reset();
  }
}
