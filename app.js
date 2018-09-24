const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

express.json() // middleware to parse json input
app.use(express.static(path.join(__dirname, '/music')))

app.get('/', (req, res) => res.send('<h1>HOMEPAGE</h1>'))

app.listen(port, () => console.log(`gleeMusic server running on port ${port}`))
