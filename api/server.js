const express = require('express');
const router = require('./router');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send(`
        <p>Test</p>
    `);
});
server.use('/api/posts', router);

// export default server; // ES6 Modules
module.exports = server;