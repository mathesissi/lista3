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
exports.GetBookId = exports.DeleteBook = exports.UpdateBook = exports.GetAllBooks = exports.CreateBook = void 0;
const BookService_1 = require("../service/BookService");
const bookService = new BookService_1.BookService();
function CreateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newbook = yield bookService.createBook(req.body);
            res.status(201).json({
                menssagem: "Sucesso ao adicionar o livro!",
                book: newbook
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.CreateBook = CreateBook;
;
function GetAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield bookService.getAllBooks();
            res.status(200).json({
                mensagem: "Livros listados com sucesso!",
                livros: books
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.GetAllBooks = GetAllBooks;
function UpdateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield bookService.updateBook(req.body);
            res.status(200).json({
                mensagem: "Livro atualizado com sucesso!",
                livro: book
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.UpdateBook = UpdateBook;
function DeleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield bookService.deleteBook(req.body);
            res.status(200).json({
                mensagem: "Livro deletado com sucesso",
                livro: book
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.DeleteBook = DeleteBook;
function GetBookId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ message: 'ID inválido' });
            }
            const book = yield bookService.getBookId(id);
            res.status(200).json({
                menssagem: "Sucesso ao encontrar o livro!",
                livro: book
            });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.GetBookId = GetBookId;
;
