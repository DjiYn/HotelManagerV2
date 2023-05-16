const LibraryService = require('../utilities/libraryService');
const Users = require('../models/users');

module.exports.getAllBooks = async (req, res) => {
    try {
        
        const books = await LibraryService.getAllBooks();

        if(books === null || books === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(books);
        }
        
    } catch (e) {
        if(e instanceof TypeError) {
            res.status(503);
            res.set("Retry-After", 3600);
            res.send("This service is not available at the moment!");
        } else {
            res.status(400);
            res.send(e.message);
        }
    }
};

module.exports.getABook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await LibraryService.getBookById(id);

        if(book === null || book === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(book);
        }
        
    } catch (e) {
        if(e instanceof TypeError) {
            res.status(503);
            res.set("Retry-After", 3600);
            res.send("This service is not available at the moment!");
        } else {
            res.status(400);
            res.send(e.message);
        }
    }
};

module.exports.postABook = async (req, res) => {
    try {
        
        const book = await LibraryService.postABook(req.body);

        if(book === null || book === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(201);
            res.send(book);
        }
        
    } catch (e) {
        if(e instanceof TypeError) {
            res.status(503);
            res.set("Retry-After", 3600);
            res.send("This service is not available at the moment!");
        } else {
            res.status(400);
            res.send(e.message);
        }
    }
};

module.exports.putABook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await LibraryService.putABook(req.body, id);

        if(book === null || book === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(book);
        }
        
    } catch (e) {
        if(e instanceof TypeError) {
            res.status(503);
            res.set("Retry-After", 3600);
            res.send("This service is not available at the moment!");
        } else {
            res.status(400);
            res.send(e.message);
        }
    }
};

module.exports.deleteABook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await LibraryService.deleteABook(id);

        if(book === null || book === 0) {
            res.status(404);
            res.send();
        } else {
            const users = await Users.find( {} );

            // Deleting ordered books from users.
            for(let user of users) {

                let remainingBooks = [];

                for(let orderedBook of user.OrderedBooks) {
                    if(orderedBook != id)
                    remainingBooks.push(orderedBook);
                }

                user.OrderedBooks = remainingBooks;
                user.save();
            }

            res.status(200);
            res.send(book);
        }
        
    } catch (e) {
        if(e instanceof TypeError) {
            res.status(503);
            res.set("Retry-After", 3600);
            res.send("This service is not available at the moment!");
        } else {
            res.status(400);
            res.send(e.message);
        }
    }
};



// AUTHORS-------------------------------------------

module.exports.getAllAuthors = async (req, res) => {
    try {
        
        const authors = await LibraryService.getAllAuthors();

        if(authors === null || authors === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(authors);
        }
        
    } catch (e) {
        if(e instanceof TypeError) {
            res.status(503);
            res.set("Retry-After", 3600);
            res.send("This service is not available at the moment!");
        } else {
            res.status(400);
            res.send(e.message);
        }
    }
};