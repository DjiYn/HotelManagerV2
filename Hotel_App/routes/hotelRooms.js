const express = require("express");
const router = express.Router();
const hotelRooms = require("../controllers/hotelRooms");

router.route("/")
    .get(hotelRooms.getAllRooms)
    .post(hotelRooms.addRoom);

router.route("/:id")
    .get(hotelRooms.getRoom)
    .delete(hotelRooms.deleteRoom);

router.route("/:id/users")
    .get(hotelRooms.getAllUsersInRoom)
    .put(hotelRooms.bookARoom)
    .delete(hotelRooms.makeRoomEmpty);


module.exports = router;