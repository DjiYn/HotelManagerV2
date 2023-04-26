const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.route("/")
    .get(users.getUsers)
    .post(users.registerUser);

router.route("/:id")
    .get(users.getUser)
    .put(users.updateUser)
    .delete(users.deleteUser);

router.route("/:id/rooms")
    .get(users.getAllBookedRooms)
    .put(users.bookRoomForUser)
    .delete(users.unbookRooms);

router.route("/:id/books")
    .get(users.getAllOrderedBooks)
    .put(users.orderBookForUser)
    .delete(users.returnAllBooksFromUser);

module.exports = router;