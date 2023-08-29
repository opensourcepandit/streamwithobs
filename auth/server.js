const express = require('express');
// const dotenv = require('dotenv');
// const jwt = require('jwtwebtoken');

const app = express();
// dotenv.config();

// JWT token to authenticate 
// app.post("/auth/token/generateToken", function(res, req) {
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let data = {
//         userId: 5426,
//         time: Date()
//     }
//     const token = jwt.sign(data, jwtSecretKey);
//     res.send(token);
// });


// app.get("/auth/token/validateToken", (req, res) => {
  
//     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
//     try {
//         const token = req.header(tokenHeaderKey);
  
//         const verified = jwt.verify(token, jwtSecretKey);
//         if(verified){
//             return res.send("Successfully Verified");
//         }else{
//             return res.status(401).send(error);
//         }
//     } catch (error) {
//         return res.status(401).send(error);
//     }
// });


// OBS
app.use(express.urlencoded());

app.post("/auth", function(req, res) {
    const streamkey = req.body.key;

    if(streamkey === "livedekhbo") {
        res.status(200).send();
        return;
    }

    res.status(403).send();
})

app.listen(8000, function() {
    console.log("Running on port 8000")
})