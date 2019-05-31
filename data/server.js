const express = require('express');
const server = express();

const actionRouter = require('./Routes/actionrouter');
const projectRouter = require('./Routes/projectrouter');


server.use(express.json());

server.use('./actions', actionRouter);
server.use('./projects', projectRouter);

server.get("/", (req, res) => {
  res.send("Time to get started")
})

module.exports = server;
