import { Response, Request } from "express";
import { BookService } from "../service/BookService";

const bookService = new BookService();

export async function CreateBook(req: Request, res: Response) {
    try {
        const newbook = await bookService.createBook(req.body);
        res.status(201).json(
            {
                menssagem: "Sucesso ao adicionar o livro!",
                book: newbook
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
export async function GetAllBooks(req: Request, res: Response) {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(
            {
                mensagem: "Livros listados com sucesso!",
                livros: books
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }

}
export async function UpdateBook(req: Request, res: Response) {
    try {
        const book = await bookService.updateBook(req.body);
        res.status(200).json(
            {
                mensagem: "Livro atualizado com sucesso!",
                livro: book
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }

}
export async function DeleteBook(req: Request, res: Response) {
    try {
        const book = await bookService.deleteBook(req.body);
        res.status(200).json(
            {
                mensagem: "Livro deletado com sucesso",
                livro: book
            }
        )
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }

}
export async function GetBookId(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const book = await bookService.getBookId(id);
        res.status(200).json(
            {
                menssagem: "Sucesso ao encontrar o livro!",
                livro: book
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};