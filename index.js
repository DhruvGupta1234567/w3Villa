const express=require('express')
const app=express()
const port=5000
const mongodb=require('./db/config')
mongodb()
const cors=require('cors')

const corsOptions ={
    origin:'*', 
    credentials:true,        
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))

app.get('/',(req,resp)=>{
    resp.send("hello")
})
app.use(express.json())
app.use('/api',require('./Routes/CreateUser'))
app.listen(port,()=>{
    console.log(`port no ${port}`)
})