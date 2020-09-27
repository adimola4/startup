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
        title: { type: String },
        choices: [{
            type: mongoose.SchemaTypes.Mixed
        }],
        answer: {
            type: mongoose.SchemaTypes.Mixed,
            required: true
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard']
        }
    }],
}, {
    w: "majority",
    j: true,
    // toJSON: {
    //     // getters: true
    // }
});

module.exports = mongoose.model("Quiz", QuizSchema);
