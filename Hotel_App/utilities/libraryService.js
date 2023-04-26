const serviceURL = process.env.SERVICE_URL || "http://localhost:5000";


module.exports.getBookById = async (bookID) => {

    const BookFromAPI = await fetch(`${serviceURL}/api/Books/${bookID}`);

    switch(BookFromAPI.status) {
        case 200:
            return await BookFromAPI.json();
        case 404:
            throw new Error("Library API does not contain book with this ID!");
        default:
            throw new Error("Library API service error!");
    }
};


module.exports.getAllBooks = async () => {
    const BooksFromAPI = await fetch(`${serviceURL}/api/Books/`);

    switch(BooksFromAPI.status) {
        case 200:
            return await BooksFromAPI.json();
        case 404:
            throw new Error("Library API does not contain books!");
        default:
            throw new Error("Library API service error!");
    }
};