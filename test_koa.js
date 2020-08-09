const Koa = require('koa');
const Router = require('koa-routere');
const bodyParser = require('koa-body');

const app = new Koa();

app.use(bodyParser({
    jsonLimit: 200
}));

app.use((ctx, next) => {
    const { body } = ctx.request;
    console.log(body);
    ctx.body = 'got it';
});

app.listen('8080');