const server = require('./data/server');

const port = process.env.POST || 3000

server.listen(port, () => {
  console.log('Port lisning to port 3000 in use')
})