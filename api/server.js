const express = require("express");
const router = require("./accounts/accounts-router");

const server = express();

server.use(express.json()); // json istekleri karşılamak için yazılıyor.

server.use("/api/accounts", router);

module.exports = server;
