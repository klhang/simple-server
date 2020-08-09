const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');

const app = new Koa();
const router = new Router();
const users = [];

app.use(bodyParser({
    jsonLimit: 200
}));

router
    .get('router name 1', '/user', async(ctx, next) => {
        console.log(ctx.body)
        ctx.body = { data: { users } };
    })
    .post('/user', async(ctx, next) => {
        const { user } = ctx.request.body;
        users.push(user);
        ctx.body = { data: {users} };
    });

router
    .get('/user/:id', async(ctx, next) => {
        const name = ctx.params.name;
        console.log(ctx.params);
        const user = users.find(u => u.name === name);
        ctx.body = { data : { user } };
    });

app.use(router.routes());

app.listen('8080');