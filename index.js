const express = require('express');
const app = express();

// app.use(express.json());

app.get('/',(req,res)=>{
    return res.send("welcome");
})
app.get('/i', (req, res) => {
    const endpoints = [
      { path: '/i/google', description: 'Google website' },
      { path: '/i/github', description: 'GitHub website' }
    ];
    const response = endpoints
      .map(endpoint => `<li>${endpoint.path}: ${endpoint.description}</li>`)
      .join('');
  
    res.send(`<ul>${response}</ul>`);
  });
app.get('/i/github', (req, res) => {
    res.send('<a href="https://github.com">GitHub</a>');
  });
  
app.get('/i/google',(req,res)=>{
    res.send('<a href="https://www.google.com">Google</a>')
})

app.get('/r/google',(req,res)=>{
    res.redirect('https://google.com');
})
app.get('/r/github',(req,res)=>{
    res.redirect('https://github.com');
})

app.get('/r',(req,res)=>{
     const msg = `<b>To redirect the website for Google and Github use the endpoints as: <br><br> <li>/r/google to visit the google website</li> <br> <li>/r/github to visit the github website</li>`;
    res.send(msg);
})
app.listen(3002,()=>{
    console.log("welcome on port 3002");
})