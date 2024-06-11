// Inkluderar Mongoose och Bcrypt.
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Sätter struktur för användaruppgifter med ett schema.
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Hashar lösenord.
userSchema.pre("save", async function (next) {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();
    // Felmeddelande.
    } catch(error) {
        next(error);
    }
});

// Registrerar en användare.
userSchema.statics.register = async function (username, password) {
    try {
        const user = new this({ username, password });
        await user.save();
        return user;
    // Felmeddelande.
    } catch(error) {
        throw error;
    }
};

// Inkluderar schemat i databasen.
const User = mongoose.model("User", userSchema);
// Exporterar koden till authRoutes.js.
module.exports = User;