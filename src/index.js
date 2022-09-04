const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/routes.js');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer')

/*------------------------------------------Bind Application Level Middleware:-------------------------------------------*/
app.use(bodyParser.json());
app.use(multer().any())


/*------------------------------------------Connecting Data-Base:-------------------------------------------*/
mongoose.connect("mongodb+srv://RahulChauhan:3aDm5xdCx8MiuHql@cluster0.xzyyibs.mongodb.net/Books-Management", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route)

/*------------------------------------------Binding Connecting on port:-------------------------------------------*/
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});