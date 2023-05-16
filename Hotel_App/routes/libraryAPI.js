const express = require("express");
const router = express.Router();
const libraryAPI = require("../controllers/libraryAPI");

router.route("/books")
    .get(libraryAPI.getAllBooks)
    .post(libraryAPI.postABook);

router.route("/books/:id")
    .get(libraryAPI.getABook)
    .put(libraryAPI.putABook)
    .delete(libraryAPI.deleteABook);

router.route("/authors")
    .get(libraryAPI.getAllAuthors);

module.exports = router;