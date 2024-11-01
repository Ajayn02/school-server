require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Routes/routes')
require('./connections/db')



const server=express()

server.use(cors())
server.use(express.json())
server.use(router)

server.use('/uploads',express.static('./uploads'))

PORT = 3000 || process.env.PORT

server.listen(PORT,()=>{
    console.log(`server running at : ${PORT}`);
})

