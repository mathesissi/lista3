import { Book } from "../model/Book";
import { executarComandoSQL } from "../database/mysql";

export class BookRepository {
    constructor() {
        this.createTable();
    }

    private async createTable() {
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
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso: ', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertBook(title: string, author: string, publisheDate: string, isbn: string, pages: number, language: string, publisher: string): Promise<Book> {
        const query = "INSERT INTO Library.Collection (title, author, publisheDate, isbn, pages, language, publisher) VALUES(?, ?, ?, ?, ?, ?, ?)";
        try {
            const resultado = await executarComandoSQL(query, [title, author, publisheDate, isbn, pages, language, publisher]);
            console.log('Livro Inserido com sucesso, seu id: ', resultado.insertId);
            const book = new Book(resultado.insertId, title, author, publisheDate, isbn, pages, language, publisher);
            return new Promise<Book>((resolve) => {
                resolve(book);
            })
        } catch (err) {
            console.log('Erro ao inserir o livro: ', err);
            throw err;
        }
    }

    async updateBook(id: number, title: string, author: string, publisheDate: string, isbn: string, pages: number, language: string, publisher: string): Promise<Book> {
        const query = `UPDATE Collection SET title = ?, author = ?, publisheDate = ?, isbn = ?, pages = ?, language = ?, publisher = ? WHERE id = ?`;
        try {
            const resultado = await executarComandoSQL(query, [id, title, author, publisheDate, isbn, pages, language, publisher]);
            console.log(`Sucesso ao atualizar livro do id: ${id}.
                        Dados Atualizados:`, resultado);
            const book = new Book(id, title, author, publisheDate, isbn, pages, language, publisher);
            return new Promise<Book>((resolve) => {
                resolve(book);
            })
        } catch (err: any) {
            console.log(`Erro ao atualizar o livro de ID: ${id} \nErro: ${err}`);
            throw err;
        }
    }
    async deleteBook(id: number): Promise<Book> {
        const query = "DELETE FROM Library.Collection where id = ?;";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto deletado com sucesso, ID: ', resultado);
            const book = new Book(id);
            return new Promise<Book>((resolve) => {
                resolve(book);
            })
        } catch (err: any) {
            console.error(`Erro ao deletar o livro de ID: ${id} \nErro: ${err}`);
            throw err;
        }
    }
    async getBook(id: number): Promise<Book> {
        const query = "SELECT * FROM Library.Collection WHERE id = ?"
        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log(`Sucesso ao localizar o livro id: ${id}`, resultado);
            return new Promise<Book>((resolve) => {
                resolve(resultado);
            })
        } catch (err: any) {
            console.log(`Erro ao listar o livro de ID: ${id}\nErro: ${err}`);
            throw err;
        }
    }
    async getBookIsbn(isbn: string): Promise<Book> {
        const query = "SELECT * FROM Library.Collection WHERE isbn = ?"
        const resultado = await executarComandoSQL(query, [isbn]);
        console.log(`Sucesso ao localizar o livro isbn: ${isbn}`, resultado);
        return new Promise<Book>((resolve) => {
            resolve(resultado);
        })
    }

    async getAllBooks(): Promise<Book> {
        const query = "SElECT * FROM Library.Collection";
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao listar todos livros", resultado);
            return new Promise<Book>((resolve) => {
                resolve(resultado);
            })

        } catch (err) {
            console.log(`Erro ao listar todos os livros \nErro: ${err} `);
            throw err;
        }
    }
}
