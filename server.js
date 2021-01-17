const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8888;

const server = http.createServer(app);

server.listen(port);
console.log('Server is running at port 8888');