const express = require('express');
const app = express()
require("./config/dbconnection");
const router = require("./routes/router");
const bodyparser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorLogger = require("./utility/errorLogger");

const port=process.env.PORT || 4000;

app.use(cors())
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/',router);
app.use(errorLogger);

app.listen(port,()=>{console.log(`server is listing at port: ${port}`)});
