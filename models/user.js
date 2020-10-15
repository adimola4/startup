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
    img: {type: String},


    joinDate: {type: Date , default : Date.now()},

    quizResults: [{
        title : { type: String },
        date : {type: Date , default : Date.now()},
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
    // courses: [{
    //     courseName: {
    //         type: String,
    //         required: true
    //     },
    // }],
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
    var points = 0
    this.quizResults.forEach((n,i) => { points += n.grade });
    points = Math.round(Math.floor(points) / 10,0)  
    return points;
})



module.exports = mongoose.model("User", UserSchema);
 