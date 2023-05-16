const serviceURL = process.env.SERVICE_URL || "http://localhost:5000";
const bookSchema = require("../models/books");

// BOOKS ------------------------------------------------------------------------
module.exports.getBookById = async (bookID) => {

    const BookFromAPI = await fetch(`${serviceURL}/api/Books/${bookID}`);

    switch(BookFromAPI.status) {
        case 200:
            return await BookFromAPI.json();
        case 404:
            throw new Error("Library API does not contain book with this ID!", {cause: BookFromAPI.status});
        default:
            throw new Error("Library API service error!", {cause: BookFromAPI.status});
    }
};


module.exports.getAllBooks = async () => {
    const BooksFromAPI = await fetch(`${serviceURL}/api/Books/`);

    switch(BooksFromAPI.status) {
        case 200:
            return await BooksFromAPI.json();
        case 404:
            throw new Error("Library API does not contain books!", {cause: BookFromAPI.status});
        default:
            throw new Error("Library API service error!", {cause: BookFromAPI.status});
    }
};

module.exports.postABook = async (body) => {

    const {value, error} = bookSchema.validate(body);

    if(error)
        throw new Error(error);

    const BooksFromAPI = await fetch(`${serviceURL}/api/Books/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
    });

    switch(BooksFromAPI.status) {
        case 201:
            return await BooksFromAPI.json();
        case 404:
            throw new Error("Library API does not contain books!", {cause: BookFromAPI.status});
        default:
            throw new Error("Library API service error!", {cause: BookFromAPI.status});
    }
};


module.exports.putABook = async (body, bookID) => {

    const {value, error} = bookSchema.validate(body);

    if(error)
        throw new Error(error);

    const BookFromAPI = await fetch(`${serviceURL}/api/Books/${bookID}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
    });
    
    const updatedBook = await this.getBookById(bookID);

    switch(BookFromAPI.status) {
        case 204:
            return updatedBook;
        case 404:
            throw new Error("Library API does not contain books!", {cause: BookFromAPI.status});
        default:
            throw new Error("Library API service error!", {cause: BookFromAPI.status});
    }
};

module.exports.deleteABook = async (bookID) => {

    const deletedBook = await this.getBookById(bookID);

    const BooksFromAPI = await fetch(`${serviceURL}/api/Books/${bookID}`, {
        method: "DELETE"
    });

    switch(BooksFromAPI.status) {
        case 200:
            return deletedBook;
        case 404:
            throw new Error("Library API does not contain book with this ID!", {cause: BookFromAPI.status});
        default:
            throw new Error("Library API service error!", {cause: BookFromAPI.status});
    }
};

// AUTHORS --------------------------------------------------------------
module.exports.getAllAuthors = async () => {
    const AuthorsFromAPI = await fetch(`${serviceURL}/api/Authors/`);

    switch(AuthorsFromAPI.status) {
        case 200:
            return await AuthorsFromAPI.json();
        case 404:
            throw new Error("Library API does not contain authors!", {cause: BookFromAPI.status});
        default:
            throw new Error("Library API service error!", {cause: BookFromAPI.status});
    }
};