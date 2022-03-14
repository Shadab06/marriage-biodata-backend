import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true
    },
    email: {
        type:String,
        required: true,
        trim: true
    },
    mobile: {
        type:String,
        required: true,
        trim: true
    },
    hashed_password: {
        type:String,
        required: true,
        trim: true
    }
})

userSchema.virtual('password')
.set(function(password) {
    this.hashed_password = bcrypt.hashSync(password, 10);
})

userSchema.methods = {
    authenticate: function(password) {
        return bcrypt.compareSync(password, this.hashed_password);
    }
}

export default mongoose.model("User", userSchema)