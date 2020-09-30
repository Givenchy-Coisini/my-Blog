const http = require('http')

const PORT= 8112;
const serverHandle = require('../app')
const server = http.createServer(serverHandle)
server.listen(PORT);
console.log('ok')
