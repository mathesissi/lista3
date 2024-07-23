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
exports.BookRepository = void 0;
const Book_1 = require("../model/Book");
const mysql_1 = require("../database/mysql");
class BookRepository {
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        CREATE TABLE IF NOT EXISTS Library.Collection (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            publisheDate VARCHAR(10) NOT NULL,
            isbn VARCHAR(13) NOT NULL,
            pages DECIMAL(4) NOT NULL,
            language VARCHAR(50) NOT NULL,
            publisher VARCHAR(255) NOT NULL
        )`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log('Query executada com sucesso: ', resultado);
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    insertBook(title, author, publisheDate, isbn, pages, language, publisher) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO Library.Collection (title, author, publisheDate, isbn, pages, language, publisher) VALUES(?, ?, ?, ?, ?, ?, ?)";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [title, author, publisheDate, isbn, pages, language, publisher]);
                console.log('Livro Inserido com sucesso, seu id: ', resultado.insertId);
                const book = new Book_1.Book(resultado.insertId, title, author, publisheDate, isbn, pages, language, publisher);
                return new Promise((resolve) => {
                    resolve(book);
                });
            }
            catch (err) {
                console.log('Erro ao inserir o livro: ', err);
                throw err;
            }
        });
    }
    updateBook(id, title, author, publisheDate, isbn, pages, language, publisher) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE Collection SET title = ?, author = ?, publisheDate = ?, isbn = ?, pages = ?, language = ?, publisher = ? WHERE id = ?`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id, title, author, publisheDate, isbn, pages, language, publisher]);
                console.log(`Sucesso ao atualizar livro do id: ${id}.
                        Dados Atualizados:`, resultado);
                const book = new Book_1.Book(id, title, author, publisheDate, isbn, pages, language, publisher);
                return new Promise((resolve) => {
                    resolve(book);
                });
            }
            catch (err) {
                console.log(`Erro ao atualizar o livro de ID: ${id} \nErro: ${err}`);
                throw err;
            }
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM Library.Collection where id = ?;";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log('Produto deletado com sucesso, ID: ', resultado);
                const book = new Book_1.Book(id);
                return new Promise((resolve) => {
                    resolve(book);
                });
            }
            catch (err) {
                console.error(`Erro ao deletar o livro de ID: ${id} \nErro: ${err}`);
                throw err;
            }
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM Library.Collection WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log(`Sucesso ao localizar o livro id: ${id}`, resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.log(`Erro ao listar o livro de ID: ${id}\nErro: ${err}`);
                throw err;
            }
        });
    }
    getBookIsbn(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM Library.Collection WHERE isbn = ?";
            const resultado = yield (0, mysql_1.executarComandoSQL)(query, [isbn]);
            console.log(`Sucesso ao localizar o livro isbn: ${isbn}`, resultado);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        });
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SElECT * FROM Library.Collection";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Sucesso ao listar todos livros", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.log(`Erro ao listar todos os livros \nErro: ${err} `);
                throw err;
            }
        });
    }
}
exports.BookRepository = BookRepository;
