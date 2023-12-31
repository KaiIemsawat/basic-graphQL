const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    status: { type: String, enum: ["Not Started", "In Progress", "Completed"] },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
});

module.exports = mongoose.model("Project", ProjectSchema);
//  Mongoose is trying to be smart by making your collection name plural.
// So, the collection seen in database will be 'projects'
