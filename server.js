// Inkluderar Express, Cors och jsonwebtoken.
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Importerar authRoutes.
const authRoutes = require('./routes/authRoutes');

// Initialiserar Express.
const app = express();

// Väljer port.
const port = process.env.PORT || 3000;

// Middleware. Aktiverar Cors samt hantering och parsning av JSON-data.
app.use(cors());
app.use(express.json());

// Routes, grundläggande sökväg.
app.use("/api", authRoutes);

// Route för skyddad resurs.
app.get("/api/private", authenticateToken, (req, res) => {
    res.json({ message: "Åtkomst till privat sida!" });
});

// Validerar token för åtkomst till skyddad resurs.
function authenticateToken(req, res, next) {
    // Hämtar authorization-header.
    const authHeader = req.headers["authorization"];
    // Om headern finns, extraheras token från den.
    const token = authHeader && authHeader.split(" ")[1];

    // Kontrollerar om en giltig token finns.
    if(token == null) return res.status(401).json({ message: "Ingen behörighet för privat sida - token saknas" });

    // Kontrollerar JWT.
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json({ message: "Ogiltig JWT" });

        req.user = user;
        next();
    });
}

// Startar applikation.
app.listen(port, () => {
    console.log("Servern körs på port " + port + ".");
});