const express = require("express");
const connectDB = require("./config/config");
const bookRoutes = require("./routes/bookRoutes");
const app = express();
const PORT = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

app.use(express.json());

// 1. App routes
app.use("/api", bookRoutes);

// 2. Swagger Docs Route (FIXED: Added missing leading slash and corrected arguments)
app.use(
    "/api-docs", // Added "/"
    swaggerUi.serve, // Fixed typo: swaggerDocument.server -> swaggerUi.serve
    swaggerUi.setup(swaggerDocument)
);

// 3. 404 Fallback (FIXED: Moved below the Swagger route so it doesn't block it)
app.use((req, res) => {
    res.status(404).json({
        error: "Rota não encontrada"
    });
});

// 4. Server Initialization (FIXED typo: conststatServer -> const startServer)
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Não foi possivel iniciar o servidor:", err);
        process.exit(1);
    }
};

startServer();
