"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const bookRepository_1 = require("../repository/bookRepository");
class BookService {
    constructor() {
        this.bookRepository = new bookRepository_1.BookRepository();
    }
    createBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, publisheDate, isbn, pages, language, publisher } = bookData;
            if (typeof title !== "string" || typeof author !== "string" || typeof publisheDate !== "string" || typeof isbn !== "string" || typeof pages !== "number" || typeof language !== "string" || typeof publisher !== "string") {
                throw new Error('Informações incorretas');
            }
            if (!title || !author || !publisheDate || !isbn || !pages || !language || !publisher) {
                throw new Error('Informações incompletas');
            }
            const foundBook = yield this.getBookISBN(isbn);
            if (foundBook) {
                throw new Error("O livro já existe no acervo");
            }
            const newbook = yield this.bookRepository.insertBook(title, author, publisheDate, isbn, pages, language, publisher);
            console.log("Service - Insert ", newbook);
            return newbook;
        });
    }
    updateBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, author, publisheDate, isbn, pages, language, publisher } = bookData;
            if (typeof id !== "number" || typeof title !== "string" || typeof author !== "string" || typeof publisheDate !== "string" || typeof isbn !== "string" || typeof pages !== "number" || typeof language !== "string" || typeof publisher !== "string") {
                throw new Error('Informações incorretas');
            }
            if (!id || !title || !author || !publisheDate || !isbn || !pages || !language || !publisher) {
                throw new Error('Informações incompletas, por favor, confira se os seguites itens estão sendo informados: title, author, publisheDate, isbn, pages, language, publisher');
            }
            const foundBook = yield this.getBookId(id);
            if (!foundBook) {
                throw new Error("Não foi atualizar, pois o livro não foi encontrado no acervo");
            }
            const book = yield this.bookRepository.updateBook(id, title, author, publisheDate, isbn, pages, language, publisher);
            console.log("Service - Update book", book);
            return book;
        });
    }
    deleteBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = bookData;
            if (typeof id !== "number") {
                throw new Error('Informações incorretas');
            }
            if (!id) {
                throw new Error("Informações incompletas, por favor, inserir o id, titulo e isbn relacionados ao livro");
            }
            yield this.bookRepository.deleteBook(id);
            console.log("Service - Delete ", id);
        });
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.bookRepository.getAllBooks();
            console.log("Service - Get all books", books);
            return books;
        });
    }
    getBookId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Number.isInteger(id) || id <= 0) {
                throw new Error('ID inválido');
            }
            const book = yield this.bookRepository.getBook(id);
            console.log("Service - Get book", book);
            return book;
        });
    }
    getBookISBN(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookRepository.getBookIsbn(isbn);
            console.log("Service - Get book", book);
            return book;
        });
    }
}
exports.BookService = BookService;
