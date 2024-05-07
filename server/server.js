const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const bodyParser = require("body-parser");

const router = require("./routes");


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        statusCode: 500,
        message: err.message,
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server run in port ${PORT}!`));
