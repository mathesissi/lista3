import express from "express";
import { CreateBook, GetBookId, GetAllBooks, UpdateBook, DeleteBook } from "./controller/BookController";

const app = express();
const PORT = 3060;

app.use(express.json());
app.post("/books", CreateBook);
app.get("/books", GetAllBooks);
app.get("/books/:id", GetBookId);
app.put("/books/", UpdateBook);
app.delete("/books", DeleteBook);

app.listen(PORT, () => console.log("API online na porta: " + PORT));

