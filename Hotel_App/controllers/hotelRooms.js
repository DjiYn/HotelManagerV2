const HotelRooms = require('../models/hotelRooms');
const Users = require('../models/users');


module.exports.getAllRooms = async (req, res) => {
    try {
        const allRooms = await HotelRooms.find({});
        if(allRooms === null || allRooms.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(allRooms);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 

module.exports.getRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const room = await HotelRooms.findById(id);
        if(room === null || room.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(room);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 

module.exports.addRoom = async (req, res) => {
    try {
        const {roomName, roomPrice} = req.body;

        const addedRoom = new HotelRooms({roomName, roomPrice});
        await addedRoom.save();
        if(addedRoom === null || addedRoom.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(201);
            res.set("Content-Location", req.baseUrl + "/" + addedRoom.id);
            res.send(addedRoom);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
}

module.exports.deleteRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const roomToDelete = await HotelRooms.findByIdAndDelete(id);
        const wasOccupiedBy = [...roomToDelete.occupiedBy];

        for(let userInRoom of wasOccupiedBy){

            let user = await Users.findById(userInRoom);

            let remainingRooms = [];

            for(let userBookedRoom of user.BookedRooms){

                if(userBookedRoom != id)
                    remainingRooms.push(userBookedRoom);
            }
            user.BookedRooms = remainingRooms;
            user.save();
        }

        if(roomToDelete === null || roomToDelete.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(roomToDelete);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 


// /:id/users route

module.exports.getAllUsersInRoom = async (req, res) => {
    try {
        const {id} = req.params;
        const room = await HotelRooms.findById(id).populate({
            path: 'occupiedBy'
        });
        if(room === null || room.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(room.occupiedBy);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 

module.exports.bookARoom = async (req, res) => {
    try {
        const {id} = req.params;
        const {userID} = req.body;

        if(userID == null)
            throw new Error("userID: user 'userID' is required!");

        const user = await Users.findById(userID);

        if(user == null)
            throw new Error("userID: 'userID' does not contain existing user!")

        
        const roomToBook = await HotelRooms.findById(id);
        roomToBook.occupiedBy.push(userID);
        roomToBook.lastEdited = Date.now();
        roomToBook.save();
        roomToBook.populate({path: 'occupiedBy'});

        user.BookedRooms.push(roomToBook.id);
        user.save();

        if(roomToBook == null || roomToBook.length == 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.set("Content-Location", req.baseUrl + "/" + roomToBook.id);
            res.send(roomToBook);
        }
        
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 



module.exports.makeRoomEmpty = async (req, res) => {
    try {
        const {id} = req.params;
        const roomToEmpty = await HotelRooms.findById(id);
        const wasOccupiedBy = [...roomToEmpty.occupiedBy];
        roomToEmpty.occupiedBy = [];
        roomToEmpty.lastEdited = Date.now();


        for(let userInRoom of wasOccupiedBy){

            let user = await Users.findById(userInRoom);

            let remainingRooms = [];

            for(let userBookedRoom of user.BookedRooms){

                if(userBookedRoom != id)
                    remainingRooms.push(userBookedRoom);
            }
            user.BookedRooms = remainingRooms;
            user.save();
        }

        roomToEmpty.save();
        
        if(roomToEmpty === null || roomToEmpty.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(roomToEmpty);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 
