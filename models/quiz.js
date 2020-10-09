 var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuizSchema = new Schema({
    title: { type: String, required: true },
    hardQuestions : {type : Number , required: true},
    mediumQuestions : {type : Number , required: true},
    easyQuestions : {type : Number, required: true},

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
            enum: ['easy', 'medium', 'hard'],
            default: 'easy'
        },
        
    }],
}, {
    w: "majority",
    j: true,
    // toJSON: {
    //     // getters: true
    // }
});

module.exports = mongoose.model("Quiz", QuizSchema);
