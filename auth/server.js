const express = require('express');
// const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
// app.use(bodyParser.json());
app.use(express.urlencoded());

const secretKey = 'your-secret-key'; // Change this to a secure secret key

const users = [
  { id: 1, username: 'maa', password: 'LiveDekhbo@7419maa' },
  { id: 2, username: 'babai', password: 'LiveDekhbo@7419babai' },
];

// Generate JWT
function generateToken(user) {
  const payload = { id: user.id, username: user.username };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.sendStatus(401);
  }
  
  const token = generateToken(user);
  res.json({ token });
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route.', user: req.user });
});


app.get("/auth/token/validateToken", (req, res) => {
  
    let tokenHeaderKey = tokenHeaderKey;
    let jwtSecretKey = jwtSecretKey;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            return res.status(401).send(error);
        }
    } catch (error) {
        return res.status(401).send(error);
    }
});


// OBS

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