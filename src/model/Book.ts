export class Book {
    id: number;
    title: string;
    author: string;
    publisheDate: string;
    isbn: string;
    pages: number;
    language: string;
    publisher: string;

    constructor(id?: number, title?: string, author?: string, publisheDate?: string, isbn?: string, pages?: number, language?: string, publisher?: string) {
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