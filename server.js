const { app } = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//read from enviroment variable
dotenv.config();
const mongoURL = process.env.MONGO_URL;

//connect to data base
const connectToDB = () => {
    mongoose.connect(mongoURL)
        .then((con) => {
            console.log(`connected to database: ${mongoURL}`);
        }).catch((error) => {
            console.error(error);
        })
}
connectToDB();

const PORT = process.env.PORT || 1200;
app.listen(PORT, () => {
    console.log(`server run in port ${PORT}`);
});


