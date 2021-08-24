const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const port = 3000;
const app = express();

app.engine('ejs', ejsMate) 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.get('/', (req,res) => [
    res.render('home.ejs')
])