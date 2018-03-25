const fs = require('fs')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', (req, res) => {
  intent = req.body.intent
  source = req.body.source
  filename = req.body.filename
  if (intent != 'good' && intent != 'bad') {
    return res.sendStatus(400)
  }
  console.log("intent:", intent, "filename:", filename)
  fs.createReadStream(source + '/' + filename)
    .pipe(fs.createWriteStream(source + '/' + intent + '/' + filename));
  res.send('Marked ' + intent)
})

app.listen(3000, () => console.log('App listening on port 3000!'))
