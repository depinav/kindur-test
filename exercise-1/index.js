const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const router = require('./router/router');

const port = 3000

app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))