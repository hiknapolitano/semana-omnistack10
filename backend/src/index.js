const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const routes = require("./routes");
const {setupWebsocket} = require("./websocket");
require("dotenv").config();

const app = express();
const server = http.Server(app);

setupWebsocket(server);


mongoose.connect(process.env.MONGO_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({}));
app.use(express.json());
app.use(routes);


//get, post, put, delete


//tipos de parametros:
//query params: request.query (filtros, odem, paginação...)
//route params: request.params (identificar um recurso na alteração ou remoção)
//body:         request.body (dados pra criação ou alteração de um registro)

//mongoDB (nao-relacional)




server.listen(3333);
