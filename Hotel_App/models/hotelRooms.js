const mongoose = require("mongoose");

const hotelRoomsSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
    },
    roomPrice: {
        type: String,
        required: true,
    },
    occupiedBy: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Users"
        }
    ],
    lastEdited: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Rooms", hotelRoomsSchema);