const Users = require('./models/users');
const HotelRooms = require('./models/hotelRooms');

// Connect to MongoDB!
const mongoose = require("mongoose");
mongoose.set("debug", false);

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/hotel";
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {console.log("Database connected to seed with fake data!");});


const seedDatabase = async () => {
    try {
        await Users.deleteMany({});
        await Users.insertMany([
            {"Name": "Jay", "Surname": "Smith" },
            {"Name": "Will", "Surname": "Smith" },
            {"Name": "Mike", "Surname": "Walausky" }
        ]);
        await HotelRooms.deleteMany({});
        await HotelRooms.insertMany([
            {"roomName": "VIP", "roomPrice": "1000.00 EUR" },
            {"roomName": "MEDIUM", "roomPrice": "555.00 EUR" },
            {"roomName": "LOW", "roomPrice": "111.00 EUR" },
        ]);
        console.log("Database seeded!");
        db.close();
        console.log("Seeder disconnected from database!");
    } catch (err) {
        console.log("Database could not be seeded!");
        console.log(err);
    }
}

seedDatabase();

