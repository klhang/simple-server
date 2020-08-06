const http = require('http');
const url = require('url');
const server = http.createServer();
const users = [{
    name: 'jjj'
}];

server.on('request', (request, response) => {
    const reqUrl = url.parse(request.url, true);
    const method = request.method;
    const contentType = request.headers['content-type'];

    switch(reqUrl.pathname) {
        case '/User':
            switch(method) {
                case 'GET':
                    const username = reqUrl.query.name;
                    const user = users.find(u => u.name === username);
                    response.end(JSON.stringify(user));
                    break;
                case 'POST':
                    switch (contentType) {
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
                            let newUser;
                            request.on('data', (data) => {
                                try {
                                    newUser = JSON.parse(data);
                                } catch (error) {
                                    response.statusCode = 400;
                                    response.end('you sent bad data');
                                }
                                users.push(newUser);
                            })
                            response.statusCode = 200;
                            response.setHeader('Content-Type', 'text');
                            response.end('you created a new user');
                            break;
                        default:
                            response.statusCode = 404;
                            response.end('not supported content type');
                            break; 
                    }
                default:
                    response.end('unsupported request method');
                    break;
            }
            break;
        default:
            response.end('unsupported path');
            break;
    }
});

server.listen('8080');