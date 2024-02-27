const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const {Schema} = mongoose;

const userSchema = new Schema({
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        phone: {type: String, required: true},
    },
    {timestamps: true}
);

userSchema.pre("save", function(next) {
    const user = this;
    const salts = 10;

    if(!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(salts, (error, salt) => {
        if(error) {
            return next(error);
        }

        bcrypt.hash(user.password, salt, (error, hash) => {
            if(error) {
                return next(error);
            }

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
        if(error) {
            return callback(error);
        }
        callback(null, isMatch);
    });
}

const User = mongoose.model("User", userSchema);

module.exports = {User, userSchema};