const expect = require('chai').expect;
global.window = {};
require('mock-local-storage');
window.localStorage = global.localStorage;

const MessageController = require('../../router/controller/controller.messages');

let res = {
    sendCalledWith: '',
    send: function(arg) { 
        this.sendCalledWith = arg;
    }
};

describe('Messages Route', function() {
    describe('post function', function() {
        it('Should return a hash when you send a message', function() {
            let req = {
                body: {message: 'message'},
            };
            MessageController.post(req, res);
            expect(res.sendCalledWith).to.contain('digest');
            expect(res.statusCode).to.equal(200);
        });

        it('Should error out if no message provided', function() {
            let req = {
                body: {},
            };

            MessageController.post(req, res);
            expect(res.sendCalledWith).to.contain('err_msg');
            expect(res.statusCode).to.equal(400);
        });

        it('Should error out if messaage is null', function() {
            let req = {
                body: {message: null},
            };
            MessageController.post(req, res);
            expect(res.sendCalledWith).to.contain('err_msg');
            expect(res.statusCode).to.equal(400);
        });

        it('Should error out if messaage is undefined', function() {
            let req = {
                body: {message: undefined},
            };
            MessageController.post(req, res);
            expect(res.sendCalledWith).to.contain('err_msg');
            expect(res.statusCode).to.equal(400);
        });

        it('Should error out if messaage is a number', function() {
            let req = {
                body: {message: 123},
            };
            MessageController.post(req, res);
            expect(res.sendCalledWith).to.contain('err_msg');
            expect(res.statusCode).to.equal(400);
        });
    })

    describe('get function', function() {
        it('Should return the message if correct hash is passed in', () => {
            let req = {
                params: {
                    hash: 'abc123'
                }
            };

            localStorage.setItem('abc123', 'foo');

            MessageController.get(req, res);
            expect(res.sendCalledWith).to.contain('message');
            expect(res.statusCode).to.equal(200);
        });

        it('Should error out if hash doesn\'t exist', () => {
            let req = {
                params: {
                    hash: '123ewqe'
                }
            };

            MessageController.get(req, res);
            expect(res.sendCalledWith).to.contain('err_msg');
            expect(res.statusCode).to.equal(404);
        });

        it('Should error out if hash is null', () => {
            let req = {
                params: {
                    hash: null
                }
            };



            MessageController.get(req, res);
            expect(res.sendCalledWith).to.contain('err_msg');
            expect(res.statusCode).to.equal(404);
        });

        it('Should error out if hash is undefined', () => {
            let req = {
                params: {
                    hash: undefined
                }
            };

            MessageController.get(req, res);
            expect(res.sendCalledWith).to.contain('err_msg');
            expect(res.statusCode).to.equal(404);
        });
    });
});