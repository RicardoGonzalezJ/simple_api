const http = require('http');
const port = 8080;
const { post, get, deleteMe, putMe } = require('./api');

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'POST':
            post(req, res);
            return;
        case 'GET':
            get(res);
            return;
        case 'DELETE':
            deleteMe(req, res);
            return;
        case 'PUT':
            putMe(req, res);
            return;
        default:
            break;
    }
    
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
});