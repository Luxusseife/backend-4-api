// Inkluderar Mongoose.
const mongoose = require("mongoose");

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