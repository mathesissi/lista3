"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(id, title, author, publisheDate, isbn, pages, language, publisher) {
        this.id = id || 0;
        this.title = title || "";
        this.author = author || "";
        this.publisheDate = publisheDate || "";
        this.isbn = isbn || "";
        this.pages = pages || 0;
        this.language = language || "";
        this.publisher = publisher || "";
    }
}
exports.Book = Book;
