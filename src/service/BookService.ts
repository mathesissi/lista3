import { BookRepository } from "../repository/bookRepository";
import { Book } from "../model/Book";

export class BookService {
    bookRepository: BookRepository = new BookRepository();

    async createBook(bookData: any): Promise<Book> {
        const { title, author, publisheDate, isbn, pages, language, publisher } = bookData;
        if (typeof title !== "string" || typeof author !== "string" || typeof publisheDate !== "string" || typeof isbn !== "string" || typeof pages !== "number" || typeof language !== "string" || typeof publisher !== "string") {
            throw new Error('Informações incorretas');
        }
        if (!title || !author || !publisheDate || !isbn || !pages || !language || !publisher) {
            throw new Error('Informações incompletas');
        }
        const foundBook = await this.getBookISBN(isbn);
        if (foundBook) {
            throw new Error("O livro já existe no acervo");
        }
        const newbook = await this.bookRepository.insertBook(title, author, publisheDate, isbn, pages, language, publisher);
        console.log("Service - Insert ", newbook);
        return newbook;
    }

    async updateBook(bookData: any): Promise<Book> {
        const { id, title, author, publisheDate, isbn, pages, language, publisher } = bookData;
        if (typeof id !== "number" || typeof title !== "string" || typeof author !== "string" || typeof publisheDate !== "string" || typeof isbn !== "string" || typeof pages !== "number" || typeof language !== "string" || typeof publisher !== "string") {
            throw new Error('Informações incorretas');
        }
        if (!id || !title || !author || !publisheDate || !isbn || !pages || !language || !publisher) {
            throw new Error('Informações incompletas, por favor, confira se os seguites itens estão sendo informados: title, author, publisheDate, isbn, pages, language, publisher');
        }
        const foundBook = await this.getBookId(id);
        if (!foundBook) {
            throw new Error("Não foi atualizar, pois o livro não foi encontrado no acervo");
        }

        const book = await this.bookRepository.updateBook(id, title, author, publisheDate, isbn, pages, language, publisher);
        console.log("Service - Update book", book);
        return book;

    }
    async deleteBook(bookData: any): Promise<void> {
        const { id } = bookData;
        if (typeof id !== "number") {
            throw new Error('Informações incorretas');
        }
        if (!id) {
            throw new Error("Informações incompletas, por favor, inserir o id, titulo e isbn relacionados ao livro");
        }

        await this.bookRepository.deleteBook(id);
        console.log("Service - Delete ", id);
    }
    async getAllBooks(): Promise<Book> {
        const books = await this.bookRepository.getAllBooks();
        console.log("Service - Get all books", books);
        return books;
    }

    async getBookId(id: number): Promise<Book | null> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('ID inválido');
        }
        const book = await this.bookRepository.getBook(id);
        console.log("Service - Get book", book);
        return book;
    }
    async getBookISBN(isbn: string): Promise<Book> {
        const book = await this.bookRepository.getBookIsbn(isbn);
        console.log("Service - Get book", book);
        return book;
    }
}