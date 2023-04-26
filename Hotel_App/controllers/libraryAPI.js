const LibraryService = require('../utilities/libraryService');


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