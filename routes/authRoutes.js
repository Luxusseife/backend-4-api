// Inkluderar routes för auth.
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Ansluter till MongoDB-databasen.
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE)
// Lyckad anslutning.
.then(() => { 
    console.log("Ansluten till databasen!");
})
// Fel vid anslutning.
.catch((error) => {
    console.error("Fel vid anslutning till databasen...");
});

// Importerar användarmodellen.
const User = require("../models/user");

// Skapar/registrerar en ny användare.
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validerar input.
        if (!username || !password) {
            return res.status(400).json({ error: "Felaktigt användarnamn eller lösenord..." });
        }

        // Korrekt input? Skapar en ny användar-instans.
        const user = new User({ username, password });
        await user.save();

        // Returnerar lyckat svar i konsollen.
        res.status(201).json({ 
            message: "Användarkontot är registrerat!",
            newUser: username 
        });

    // Felmeddelande vid serverfel.
    } catch (error) {
        res.status(500).json({ error: "Serverfel..." });
    }
});

// Loggar in användaren.
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validerar input.
        if (!username || !password) {
            return res.status(400).json({ error: "Felaktigt användarnamn eller lösenord..." });
        }

        // Kontrollerar om användaren är registrerad.
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" });
        }

        // Kontrollerar lösenord.
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" });
        } else {
            // Skapar JWT-nyckel.
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            // Skapar svarsinfo.
            const response = {
                message: "Lyckad inloggning",
                user: username,
                token: token
            }
            // Skickar svar och token till klienten.
            res.status(200).json({ response, token });
        }

    // Felmeddelande vid serverfel.
    } catch (error) {
        res.status(500).json({ error: "Serverfel..." });
    }
});

// Exporterar koden till server.js.
module.exports = router;