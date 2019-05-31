const express = require('express');
const helmet = require('helmet');

const db = require('../data/dbConfig');

const server = express();

server.use(helmet());
server.use(express.json());

const actionRouter = require('./Routes/actionrouter');
const projectRouter = require('./Routes/projectrouter');

// server.get('/', async (req, res) => {
//     try {
//       const message = await db( 'message');
//       res.status(200).json({ message:'Time to get started' });
//     } catch (error) {
//       console.error('\nERROR', error);
//       res.status(500).json({ error: 'Cannot retrieve the message' });
//     }
//   });
  
//   server.post('/', async (req, res) => {
//     try {
//       const [id] = await db( postMessage').insert(req.id);
//       const postMessage = await db( 'postMessage');
  
//       res.status(201).json postMessage);
//     } catch (error) {
//       console.error('\nERROR', error);
//       res.status(500).json({ error: 'Cannot add the action' });
//     }
//   });
  
//   module.exports = server;
  
server.use('./actions', actionRouter);
server.use('./projects', projectRouter);

server.get("/", (req, res) => {
  res.send("Time to get started")
})

module.exports = server;
