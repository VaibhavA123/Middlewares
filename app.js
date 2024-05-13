// const express = require('express');
// const app = express();
// const port = 8080;
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
// app.use((req,res,next) => {
    // const { query } = req.query;
    // console.log(query);
//     console.log("Hi , I am 1st middleware");
//     next();
// });

app.use((req,res,next) => {
    console.log('Hi , i am 2nd middleware');
    next();
});



app.get("/",(req,res) => {
    // console.log(document.cookie);
    console.log('Cookies: ', req.cookies);
    res.cookie('name', 'express').send('cookie set');
});

app.get("/",(req,res) => {
    res.send("Hi , i am root");
});

app.get("/search",(req,res) => {
    res.send("Hi, Search anything");
});
app.listen(port,() => {
console.log(`Server is listening to port ${port}...`);
});



const express = require('express');
const app = express();
const port = 8080;
const morgan = require('morgan');

app.use((req,res,next) => {
    console.log('Hi,I am a middleware');
    res.send('bye');
});
app.get("/",(req,res) => {
    res.send(Date());
});
app.use("/",(req,res,next) => {
    console.log('Hi,I am a middleware');
    return next();
});
app.use('/',(req,res) => {
    res.send(`Mrs.ALka Goel is my mom,${Date()}`);
});
app.get("/check",(req,res) => {
    res.send("Hello Everyone");
});

app.use(morgan(':method :status '));

app.use((req,res,next) => {
    console.log("Hi,I am 1st middleware");
    next();
});
app.use((req,res,next) => {
    req.responseTime = new Date(Date.now()).toString();
    console.log("Hi,I am 2nd middleware");
    console.log(req.method,"  ",req.path,"  ",req.responseTime,"   ",req.hostname,"  ",req.originalUrl);
    next();
});

app.use("/random",(req,res,next) => {
    console.log("I am only for random");
    next();
});

app.get("/data",(req,res) => {
    res.send("Hi, I am root");
});


app.get("/random",(req,res) => {
    console.log(req.method,req.path,req.hostname);
    res.send("this is a random page");
});


app.use("/api",(req,res,next) => {
    let { token } = req.query;
    if(token === 'giveaccess') {
        next();
    }
    else {
        res.send("ACCESS DENIED!");
    }
});

const checkToken = (req,res,next) => {
    let { token } = req.query;
    if(token === 'giveaccess') {
        next();
    }
    else {
        res.send("ACCESS DENIED!");
    }
};

app.get("/api",checkToken,(req,res) => {
    res.send("data");
});


//404 page not found
app.use((req,res) => {
    res.send("404 page not found");
});

app.listen(port,() => {
    console.log(`Server is listening to port ${port}......`);
});