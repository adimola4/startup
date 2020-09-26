var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    subject: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
}, {
    w: "majority",
    j: true,
});

module.exports = mongoose.model("Course", CourseSchema);
