// Inkluderar Express.
const express = require("express");

// Importerar authRoutes.
const authRoutes = require('./routes/authRoutes');

// Initialiserar Express.
const app = express();

// Väljer port.
const port = process.env.PORT || 3000;

// Middleware. Aktiverar hantering och parsning av JSON-data.
app.use(express.json());

// Routes, grundläggande sökväg.
app.use("/api", authRoutes);

// Startar applikation.
app.listen(port, () => {
    console.log("Servern körs på port " + port + ".");
});
