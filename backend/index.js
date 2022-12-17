const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
var app = express()



const port = 5000

app.use(cors())
connectToMongo();
app.use(express.json())

app.use('/auth', require('./routes/Auth'));
app.use('/notes', require('./routes/Notes'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})