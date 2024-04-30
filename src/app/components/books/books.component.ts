import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../book.service';
import { Book } from './../../book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  [x: string]: any;
  listaLivros: Book[] = [];
  livroFormGroup: FormGroup;
  valid = false;

  constructor(private service: BookService, private formBuilder: FormBuilder) {
    this.livroFormGroup = formBuilder.group({
      id: [''],
      titulo: ['', [Validators.required]],
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
    this.valid = true;
    if (this.livroFormGroup.valid) {
      this.service.addBook(this.livroFormGroup.value).subscribe({
        next: (data) => {
          this.listaLivros.push(data);
          this.valid = false;
        },
      });
    }

    this.livroFormGroup.reset();
  }

  get titulo() {
    return this.livroFormGroup.get('titulo');
  }
}
