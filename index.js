require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const connection = require("./database/connection");
connection();

const routes = require("./routes/routes");
app.use(routes);

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
    console.log(`Server online -> Port ${PORT}`);
});