const express= require("express");
const cors=require("cors");
const app= express();
const toyRoutes= require("./routes/toy.routes")
const userRoutes= require("./routes/user.routes")
const path= require("path");
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/toys",toyRoutes);
app.use("/api/v1/users",userRoutes);


app.use((error, req, res, next)=>{
    const err={message:error.message, url: req.url}
    console.log(err);
    return res.status(400).send({msg:error.message});
});

module.exports.app =app;
