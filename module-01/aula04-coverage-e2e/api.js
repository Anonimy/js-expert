const http = require('http');

const MOCKED_USER = { username: 'Anonimy', password: '12345' };

const routes = {
    '/contact:get': (_, res) => {
        res.write('contact page');
        res.end();
        return;
    },

    '/login:post': async (req, res) => {
        // Request é um async iterator!
        for await (const data of req) {
            const user = JSON.parse(data);
            if (user.username === MOCKED_USER.username && user.password === MOCKED_USER.password) {
                res.write('Logged in successfully');
                res.end();
                return;
            }
        }
        res.writeHead(401);
        res.write('Invalid username or password');
        res.end();
        return;
    },

    default: (_, res) => {
        res.write('Hello, world');
        res.end();
        return;
    },
};

const handler = function (req, res) {
    const { url, method } = req;
    const routeKey = `${url}:${method.toLowerCase()}`;
    const chosen = routes[routeKey] || routes.default;
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    chosen(req, res);
    return;
};

const app = http
    .createServer(handler)
    .listen(3000, () => console.log('App running on port 3000'));

module.exports = app;
