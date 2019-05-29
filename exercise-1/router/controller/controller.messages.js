const crypto = require('crypto');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./messages');
}

const algorithm = 'sha256'
const encoding = 'hex';

const MessageController = {
    post: (req, res) => {
        const { message } = req.body;
        try {
            const hash = crypto.createHash(algorithm).update(message).digest(encoding);
            localStorage.setItem(hash, message);
            res.statusCode = 200;
            res.send(JSON.stringify({digest: hash}));
        } catch (error) {
            res.statusCode = 400;
            res.send(JSON.stringify({"err_msg": "There was a problem with your message."}));
        }
    },

    get: (req, res) => {
        const { hash } = req.params;
        const message = localStorage.getItem(hash);
        
        if(message) {
            res.statusCode = 200;
            res.send(JSON.stringify({message}));
        } else {
            res.statusCode = 404;
            res.send(JSON.stringify({"err_msg": "Message not found"}));
        }
        
    }
}

module.exports = MessageController;