const Users = require('../models/users');
const HotelRooms = require('../models/hotelRooms');
const LibraryService = require('../utilities/libraryService');

module.exports.getUsers = async (req, res) => {
    try {
        const users = await Users.find( {} );
        if(users === null || users.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(users);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};


module.exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById( id );

        const {expand} = req.query;
        
        

        if(user === null || user.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            if(!expand)
                res.send(user);
            else {
                if(expand == "rooms")
                    res.send(user.BookedRooms);
                else
                    throw new Error("Wrong query!");
            }
            
            
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};

module.exports.registerUser = async (req, res) => {
    try {
        const {Name, Surname, OrderedBooks} = req.body;
        const registeredUser = new Users({Name, Surname});
        if(OrderedBooks != null)
        {
            let list = OrderedBooks;
            registeredUser.OrderedBooks = [list];
        }
            

        await registeredUser.save();
        
        if(registeredUser === null || registeredUser.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(201);
            res.set("Content-Location", req.baseUrl + "/" + registeredUser.id);
            res.send(registeredUser);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {Name, Surname} = req.body;
        const user = await Users.findByIdAndUpdate( id, {Name, Surname} );
        
        if(user === null || user.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.set("Content-Location", req.baseUrl + "/" + user.id);
            res.send(user);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findByIdAndDelete( id );

        if(user === null || user.length === 0)
            throw new Error("No such userID exists to be deleted!");

        for(let bookedRoom of user.BookedRooms) {
            let room = await HotelRooms.findById(bookedRoom);

            let remainingUsers = [];

            for(let usersInRoom of room.occupiedBy) {
                if(usersInRoom != id)
                    remainingUsers.push(usersInRoom);
            }
            room.occupiedBy = remainingUsers;
            room.lastEdited = Date.now();
            
            room.save();
        }



        if(user === null || user.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(user);
        }
        
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};


// :id/rooms route


module.exports.getAllBookedRooms = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById( id ).populate({path: 'BookedRooms'});

        if(user === null || user.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(user.BookedRooms);
        }
        
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};

module.exports.bookRoomForUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {roomID} = req.body;

        if(roomID == null)
            throw new Error("roomID: user 'roomID' is required!");

        const room = await HotelRooms.findById(roomID);

        if(room == null)
            throw new Error("roomID: 'roomID' does not contain existing room!")

        
        const user = await Users.findById(id);
        user.BookedRooms.push(roomID);
        user.save();

        room.occupiedBy.push(user.id);
        room.lastEdited = Date.now();
        room.save();

        if(user === null || user.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.set("Content-Location", req.baseUrl + "/" + id);
            res.send(user);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
} 


module.exports.unbookRooms = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await Users.findById(id);
        
        
        

        for(let bookedRoom of user.BookedRooms) {
            let room = await HotelRooms.findById(bookedRoom);


            let remainingUsers = [];
            for(let usersInRoom of room.occupiedBy) {
                if(usersInRoom != id)
                    remainingUsers.push(usersInRoom);
            }
            room.occupiedBy = remainingUsers;
            room.lastEdited = Date.now();
            room.save();
        }

        user.BookedRooms = [];
        user.save();


        if(user === null || user.length === 0) {
            res.status(404);
            res.send();

        } else {
            res.status(200);
            res.send(user.BookedRooms);
        }
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};



// Library Service

module.exports.getAllOrderedBooks = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById( id ).populate({path: 'OrderedBooks'});

        if(user === null || user.length === 0) {
            res.status(404);
            throw new Error("User with this ID does not exist!");
        } 

        let populatedData = [];

        for(let book of user.OrderedBooks) {
            try {
                populatedData.push(await LibraryService.getBookById(book));
            } catch (e) {
                if(e.cause == 404){
                    res.status(404);
                } else {
                    res.status(503);
                    res.set("Retry-After", 3600);
                }
                throw new Error(e.message);
            }
        }


        res.status(200);
        res.send(populatedData);
        
        
    } catch (e) {
        res.send(e.message);
    }
};


module.exports.orderBookForUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById( id );

        if(user === null || user.length === 0) {
            res.status(404);
            throw new Error("User with this ID does not exist!");
        } 

        const {bookID} = req.body;

        if(bookID == null){
            res.status(400);
            throw new Error("bookID: user 'bookID' is required!");
        }
            

        let bookToAdd = null;
        try {
            bookToAdd = await LibraryService.getBookById(bookID);
        } catch (e) {
            if(e.cause == 404){
                res.status(404);
            } else {
                res.status(503);
                res.set("Retry-After", 3600);
            }
            throw new Error(e.message);
        }
       

        user.OrderedBooks.push(bookID);
        user.save();

        res.status(200);
        res.set("Content-Location", req.baseUrl + "/" + id);
        res.send(user);
        
    } catch (e) {
        res.send(e.message);
    }
};


module.exports.returnAllBooksFromUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findById( id );

        user.OrderedBooks = [];
        user.save();

        if(user === null || user.length === 0) {
            res.status(404);
            res.send();
        } else {
            res.status(200);
            res.send(user.OrderedBooks);
        }
        
    } catch (e) {
        res.status(400);
        res.send(e.message);
    }
};


