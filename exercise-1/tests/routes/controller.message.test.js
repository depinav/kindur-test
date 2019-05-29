const expect = require('chai').expect;

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
});