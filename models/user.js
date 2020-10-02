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
    passwordResetToken: {type:String, required:false},
    passwordResetExpires: {type:String, required:false},

    title: { type: String },
    address: { type: String },
    phone: { type: String },
    github: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    facebook: { type: String },

    quizResults: [{
        // TODO Add datetime of result
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

UserSchema.virtual('points').get(function() {
    for()
    ;
})

module.exports = mongoose.model("User", UserSchema);
