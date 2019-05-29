const express = require('express')
const app = express()
const crypto = require('crypto');
const bodyParser = require('body-parser');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./messages');
}

const port = 3000
const algorithm = 'sha256'
const encoding = 'hex';

app.use(bodyParser.json());

app.post('/messages', (req, res) => {
    const { message } = req.body;
    const hash = crypto.createHash(algorithm).update(message).digest(encoding);
    localStorage.setItem(hash, message);
    res.send(JSON.stringify({digest: hash}));
});

app.get('/messages/:hash', (req, res) => {
    const { hash } = req.params;
    const message = localStorage.getItem(hash);
    
    if(message) {
        res.send(JSON.stringify({message}));
    } else {
        res.statusCode = 404;
        res.send(JSON.stringify({"err_msg": "Message not found"}));
    }
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))