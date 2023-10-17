// Create an Express app
const express = require("express");
const generateSwaggerDocumentation = require("@collinsadi/swagger");
const app = express();


app.listen(2000, () => {
    
    console.log("Server Started")
})

const createUser = (req, res)=>{

    res.send("User Created")

}

app.get("/users/create", createUser)

// Generate Swagger documentation for your Express app
generateSwaggerDocumentation(app, 2000, "https://collinsadi.vercel.app");

