const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

// model
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { nextTick } = require('process');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,nexr) => { 
    //reachout to  db 
    User.findByPk(8)
        .then(user => {
          //store request
          // req.user is user store in db
          req.user = user;  
          next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// SEQUELIZE will create table for model and also define relation between them
//relate model
Product.belongsTo(User, {constraints : true , onDelete : 'CASCADE' });
User.hasMany(Product);

// sync your model to database
sequelize
    .sync()
    .then(result => {
        return User.findByPk(8);
    })
    .then(user => {
        if(!user) {
            return User.create({name: 'Saurabh' , email: 'test@test.com' });
        }
        return user;
    })
    .then(user => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    });


