import express from 'express'
import session from 'express-session';
import mongoSession from "connect-mongodb-session"
import dotenv from "dotenv" 
import flash from "connect-flash"

import { dbConnection } from './databases/dbConnection.js'
import homeRouter from './src/home/home.routes.js';
import registerRouter from './src/register/register.routes.js';
import loginRouter from './src/login/login.routes.js';
import userRouter from './src/user/user.routes.js';
import messageRouter from './src/message/message.routes.js';
const app = express()
const port = process.env.PORT || 3000

dotenv.config()
dbConnection();

const mongoDBstore = mongoSession(session);

let store = new mongoDBstore({
  uri:process.env.DB_URL,
  collection: "mySessions"
})

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: "keybord cat",
  resave: false,
  saveUninitialized: false,
  store
}))

app.use(flash())
app.use(homeRouter)
app.use(registerRouter)
app.use(loginRouter)
app.use(userRouter)
app.use(messageRouter)


app.get("/logout",(req,res)=>{

  req.session.destroy(()=>{
    res.redirect("/login")
  })

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
