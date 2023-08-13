const express = require('express');
const app = express()
require("./config/dbconnection");
const router = require("./routes/router");
const bodyparser = require('body-parser');
const cors = require('cors');

const port=process.env.PORT || 4000;

app.use(cors())
app.use(bodyparser.json());
app.use('/',router);

app.listen(port,()=>{console.log(`server is listing at port: ${port}`)});
