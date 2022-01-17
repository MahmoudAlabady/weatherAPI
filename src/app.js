// npm init -y

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const forecast = require('./tools/forecast')
const geocode = require('./tools/geocode')


const path = require('path')

// path where app.js file exist
console.log(__dirname)

// D:\nti\node\express-app\src , ../public  =  D:\nti\node\express-app\public
// console.log(path.join(__dirname,'../public'))

const publicDirectory = path.join(__dirname,'../public')
app.use(express.static(publicDirectory))

//////////////////////////////////////////////////////////////////////////////

// hbs --> html + dynamic features

app.set('view engine', 'hbs');



// D:\nti\node\express-app\src , ../ ==> D:\nti\node\express-app/templates/views
const viewsPath = path.join(__dirname,'../templates/views')
app.set('views',viewsPath)


// nodemon src/app.js -e js,hbs
// Partials (header,footer)

const hbs = require('hbs')
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)



app.get('',(req,res)=>{
  res.render('index',{
    title:'Home page',
    name:'Mahmoud Yehia Alabady'
  })
})


app.get('/aboutpage',(req,res)=>{
  res.render('about',{
    title:'About page',
    description:'Web application using two APIs from mapbox and weatherstack to make a weather API  ',
    name:'Mahmoud Yehia Alabady'
  })
})

app.get('/help',(req,res)=>{
  res.render('helppage',{
    title:'Help page',
    msg:'Help !!!!',
    name:'Mahmoud Yehia Alabady'
  })
})






app.get('/weather',(req,res)=>{
  if(!req.query.address){
   return res.send({
     error:'You must provide address'
   })
  }
  geocode(req.query.address,(error,data)=>{
    if(error){
      return res.send({error})
    }
    forecast(data.latitude,data.longtitude,(error,forecastData)=>{
      if(error){
        return res.send({error})
      }
      res.send({
        location:req.query.address,
        forecast:forecastData
      })
    })
  })
})

app.get('*',(req,res)=>{
  res.render('404page',{
    title:'Not found',
    name:'Default page'
  })
})



app.listen(port, () => {
  console.log('Server is running',port)
})