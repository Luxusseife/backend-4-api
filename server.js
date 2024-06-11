// Inkluderar Express och jsonwebtoken.
const express = require("express");
const jwt = require("jsonwebtoken");

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

// Route för skyddad resurs.
app.get("/api/private", authenticateToken, (req, res) => {
    res.json({ message: "Åtkomst till privat sida!" });
});

// Validerar token för åtkomst till skyddad resurs.
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null) res.status(401).json({ message: "Ingen behörighet för privat sida - token saknas" });

    // Kontrollerar JWT.
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Ogiltig JWT" });

        req.username = username;
        next();
    });
}

// Startar applikation.
app.listen(port, () => {
    console.log("Servern körs på port " + port + ".");
});
