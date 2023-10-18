const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
});

module.exports = mongoose.model("Client", ClientSchema);
//  Mongoose is trying to be smart by making your collection name plural.
