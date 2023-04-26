const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Surname: {
        type: String,
        required: true,
    },
    BookedRooms: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Rooms"
        }
    ],
    OrderedBooks: [
        {
            type: String,
        }
    ]
});
module.exports = mongoose.model("Users", UserSchema);