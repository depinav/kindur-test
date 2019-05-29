const express = require('express');

const MessageController = require('./controller/controller.messages');

const Router = express.Router();

Router.post('/messages', MessageController.post);

Router.get('/messages/:hash', MessageController.get);

module.exports = Router;