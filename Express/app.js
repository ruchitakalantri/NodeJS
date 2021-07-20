const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express(); //Creates an Express application.

// global config value
// we are telling express that we want to compile dynamically with pug engine
// app.set('view engine' , 'pug');

//ejs
app.set('view engine' , 'ejs');
app.set('views' , 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//parser
app.use(bodyParser.urlencoded({extended : false})); //Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option

// serve file statically
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin' , adminData.routes);

app.use(shopRoutes);

app.use((req,res,next) => {

    res.status(404).render('404' , {pageTitle : 'Page Not Founnd'});
    // set my status node
    //res.status(404).sendFile(path.join(__dirname ,'views' , '404.html'));
});

app.listen(3000); //Listen for connections.A node http.Server is returned, with this application (which is a Function) as its callback. 
