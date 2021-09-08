const dotenv = require('dotenv');
const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var Keycloak = require('keycloak-connect');
var cors = require('cors');

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());

// Enable CORS support
app.use(cors());

// const keycloak = require('./config/keycloak-config.js').initKeycloak();
// console.log("keycloak init success", keycloak);

// app.use(keycloak.middleware({
//   logout: '/logout',
//   admin: '/'
// }));
// console.log("keycloak middleware success", keycloak.middleware());
// const testController = require('./controller/test-controller.js');
// app.use('/test', testController);

// Render the application here

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: '1f7f5b9c-56c5-4268-96cd-78e8d6dbdf3c',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak({
  store: memoryStore
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/anonymous', function(req, res){
  res.json({message: 'anonymous'});
  // res.send("Hello Anonymous");
});
app.get('/user', keycloak.protect('app:user'), function(req, res){
  res.json({message: 'user'});
  // res.send("Hello User");
});
app.get('/admin', keycloak.protect('app:admin'), function(req, res){
  res.json({message: 'admin'});
  // res.send("Hello Admin");
});

app.use('*', function (req, res) {
  res.send('Not found!');
});

// Listen at port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})