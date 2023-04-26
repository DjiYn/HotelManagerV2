const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB!
const mongoose = require("mongoose");
mongoose.set("debug", false);

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/hotel";
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Web service connected to database on ${dbUrl}`);
});


app.get('/', (req, res) => {

    res.send("Hello from docker!");

});

const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const roomRoutes = require("./routes/hotelRooms");
app.use("/rooms", roomRoutes);

const libraryAPIRoutes = require("./routes/libraryAPI");
app.use("/books", libraryAPIRoutes);




app.all("*", (req, res, handlers) => {
    var method = req.route.method;
    if (!(method in handlers)) {
        res.send(501);
    }
})


app.listen(port, () => console.log(`Web service is listening on http://${host}:${port}`));