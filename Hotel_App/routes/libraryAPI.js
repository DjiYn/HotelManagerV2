const express = require("express");
const router = express.Router();
const libraryAPI = require("../controllers/libraryAPI");

router.route("/")
    .get(libraryAPI.getAllBooks);

module.exports = router;