const http = require('http');
const server = http.createServer();

server.on('request', (request, response) => {
    const contentType = request.headers['content-type'];

    switch(contentType) {
        case 'text/plain':
            let str = '';
            request.on('data', (data) => {
                str += data;
            });
            request.on('end', () => {
                const res = {
                    result: `you sent plain text: ${str}`
                }
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(res));
            })
            break;
        case 'application/json': 
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text');
            response.end('you sent json');
            break;
        default:
            response.statusCode = 404;
            response.end('not supported content type');
            break;
    }
});

server.listen('8080');