const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

//middleware
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log(err);
    }
  })
  next();
});

//middleware - maintainence
// app.use((req,res,next)=>{
//   res.render('maintainence.hbs');
// })

//middleware
app.use(express.static(__dirname+"/public"));


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/', (req,res)=> {
  res.render('home.hbs',{
    pageTitle:"Home page",
    welcomeMessage:'Welcome back space cowboy'
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:"About page"
  });
});

app.get("/bad",(req,res)=>{
  res.send({
    error:"not good",
    type:"idunno"
  });
});

app.listen(port, ()=>{
  console.log(`server online on ${port}`);
});
