const mongoose = require("mongoose");
const connectDB = async () => {
    // Need 'async / await' since mongoose returns promise
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
        `MongoDB Connected -----------> ${conn.connection.host}`.cyan.bold
        // cyan.underline.bold <-- from color package. Also need 'const colors = require("colors");' in 'index.js'
    );
};

module.exports = connectDB;
