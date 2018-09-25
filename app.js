const path = require('path')
const app = require(path.join(__dirname, './server'))
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`App running on port ${port}`))
