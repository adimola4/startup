var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
}, {
    w: "majority",
    j: true,
});

module.exports = mongoose.model("contact", QuizSchema);
