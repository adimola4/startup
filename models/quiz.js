var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
    title: { type: String, required: true },

    questions: [{
        flavor: {
            type: String,
            required: true,
            enum: ['truefalse', 'american', 'fillblanks']
        },
        choices: [{
            type: String
        }],
        answer: { type: String, required: true }
    }],
}, {
    w: "majority",
    j: true,
    // toJSON: {
    //     // getters: true
    // }
});

module.exports = mongoose.model("Quiz", QuizSchema);
