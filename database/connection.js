require("dotenv/config");
const mongoose = require("mongoose");

async function main() {
    try {
        await mongoose.connect(process.env.URL_CONNECTION);

        console.log("Database connected !");
    }
    catch(error) {
        console.log("Fail to connect with database: ", error);
    }
}

module.exports = main;