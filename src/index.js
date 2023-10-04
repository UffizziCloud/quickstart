'use strict';

const express = require('express')
const app = express()

app.use(express.static('public'));
app.get('/', (req, res) => res.send('Home Page'))
app.get('/hello', (req, res) => res.send('Hello Uffizzi'))

const port = 8080
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
