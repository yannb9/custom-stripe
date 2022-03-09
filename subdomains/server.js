const subdomain = require('express-subdomain');
const express = require('express');
const app = express();
const router = express.Router();

let port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
    // res.render("index",{text: "Normal env"});
    res.send('Welcome to nothing!');
})

router.get('/test', function(req, res) {
    res.send('Welcome to our API!');
    // res.render("index",{text: "API"});
});

// router.get('/users', function(req, res) {
//     res.json([
//         { name: "Brian" }
//     ]);
// });

app.use(subdomain('api', router));
// app.listen(3000);
app.listen(port, () => console.log(`Listening to port ${port}`));