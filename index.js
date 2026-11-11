
const express = require("express");

const app = express();

const PORT = 3000;

// First API endpoint
app.get("/", (req, res) => {
    res.json({
        message: "Hello! My first API is working!",
        status: "success",
        creator: "My First API"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`API is running at http://localhost:${PORT}`);
});
