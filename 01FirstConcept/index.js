import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3000

const app = express()

const products = [
    {
      "id": 101,
      "name": "Laptop",
      "price": 899.99,
      "inStock": true
    },
    {
      "id": 102,
      "name": "Smartphone",
      "price": 499.99,
      "inStock": false
    },
    {
      "id": 103,
      "name": "Tablet",
      "price": 299.99,
      "inStock": true
    }
  ];


// get is http method
// /home is route
// response is send to same route
 
app.get('/home',(req,res)=>{
    res.send(`Welcome Home`)
})

app.get('/about',(req,res)=>{
    res.json(products)
})

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})



