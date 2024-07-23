"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookController_1 = require("./controller/BookController");
const app = (0, express_1.default)();
const PORT = 3060;
app.use(express_1.default.json());
app.post("/books", BookController_1.CreateBook);
app.get("/books", BookController_1.GetAllBooks);
app.get("/books/:id", BookController_1.GetBookId);
app.put("/books/", BookController_1.UpdateBook);
app.delete("/books", BookController_1.DeleteBook);
app.listen(PORT, () => console.log("API online na porta: " + PORT));
