const express = require ("express");
const connectDB = require ("./config/config");
const BookRoutes = require("./routes/bookRoutes");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", bookRoutes);

app.use((req,res) => {
    res.status(404).json({
        error: "Rota não encontrada"
    });
});

conststatServer = async () => {
    try {
        await connectDB();
        app.listen(PORT,() => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Não foi possivel iniciar o servidor:",err);
        process.exit(1);
    }
};

startServer();