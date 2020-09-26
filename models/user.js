var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: { type: String, required: true },
    hashedPass: { type: String, required: true },

    isTeacher: { type: Boolean, required: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },

    title: { type: String },
    address: { type: String },
    phone: { type: String },
    github: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    facebook: { type: String },

    quizResults: [{
        quizRef: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Quiz',
            required: true
        },
        grade: {
            type: Number,
            required: true
        }
    }],
}, {
    w: "majority",
    j: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
})

module.exports = mongoose.model("User", UserSchema);
