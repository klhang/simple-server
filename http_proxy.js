const http = require('http');
const fs = require('fs');
const server = http.createServer();

server.on('request', (sevReq, serRes) => {
    const { method, url, headers } = sevReq;
    const options = {
        host: 'baidu.com',
        method,
        url,
        headers
    };

    const request = http.request(options, (response) => {
        let str = '';

        response.on('data', (data) => {
            console.log('data');
            str += data.toString('utf-8');
            fs.appendFile('./proxy_test.html', str, () => {});
            serRes.write(data);
        });

        response.on('end', () => {
            serRes.end();
        });

        response.on('error', (err) => {
            console.log(err);
        });
    });

    request.on('error', (err) => {
        console.log(err);
    });

    request.end();
});

server.listen(8099);