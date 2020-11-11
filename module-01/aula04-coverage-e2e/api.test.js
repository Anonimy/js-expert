const assert = require('assert');
const { describe, it } = require('mocha');
const request = require('supertest');
const app = require('./api');

describe('API suite test', () => {
    describe('/contact', () => {
        it('should request contact page and return HTTP Status 200', async () => {
            const response = await request(app)
                .get('/contact')
                .expect(200);
            assert.strictEqual(response.text, 'contact page');
        });
    });

    describe('/hello', () => {
        it('should request a nonexistent route /hi and redirect to /hello', async () => {
            const response = await request(app)
                .get('/hi')
                .expect(200);
            assert.strictEqual(response.text, 'Hello, world');
        });
    })

    describe('/login', () => {
        it('should login succesfully and return HTTP Status 200', async () => {
            const response = await request(app)
                .post('/login')
                .send({ username: 'Anonimy', password: '12345' })
                .expect(200)
            assert.strictEqual(response.text, 'Logged in successfully');
        });

        it('should unauthorize when the credentials are invalid and return HTTP Status 401', async () => {
            const response = await request(app)
                .post('/login')
                .send({ username: 'admin', password: 'admin' })
                .expect(401)
            assert.ok(response.unauthorized);
            assert.strictEqual(response.text, 'Invalid username or password');
        });
    });
});
