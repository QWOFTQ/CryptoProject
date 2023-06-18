const express = require('express');
const nunjucks = require('nunjucks');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const userRouter = require('./routes/userRouter');
const boardRouter = require('./routes/boardRouter');
// const https = require('https')
// const path = require('path')
// const fs = require('fs')



const app = express();

const maxAge = 1000 * 60 * 5;

const sessionObj = {
  secret: 'kong',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: maxAge }),
  cookie: {
    maxAge,
  },
};

app.use(session(sessionObj));

app.set('view engine', 'html');
nunjucks.configure('views', { express: app });

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  const { user } = req.session;
  if (user !== undefined) {
    res.render('index.html', { user });
  } else {
    res.render('index.html');
  }
});

app.use('/user', userRouter);
app.use('/board', boardRouter);

app.listen(3000)

// const sslServer = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, 'certificate', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'certificate', 'cert.pem')),
   
//   }, app
// )

// sslServer.listen(3000, ()=> console.log('SSL SERVER'))

// ca.js
const fs = require('fs')
const forge = require('node-forge')
const pki = forge.pki

//1. 인증서를 파일에서 읽어오기
fs.readFile('Cert.pem', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log(data)

  let caCert = pki.certificateFromPem(data)
  let publicKey = caCert.publicKey
  console.log(pki.publicKeyToPem(publicKey))
})

let certPem = fs.readFileSync('Cert.pem', 'utf8')
let caCert = pki.certificateFromPem(certPem)
let publicKey = caCert.publicKey
console.log(pki.publicKeyToPem(publicKey))

//2. 개인키를 파일에서 읽어오기
let privateKeyPem = fs.readFileSync('key.pem', 'utf8')
let privateKey = pki.privateKeyFromPem(privateKeyPem)
console.log(privateKey)

//3. 개인키에서 공개키 추출하기
let publicKey2 = pki.setRsaPublicKey(privateKey.n, privateKey.e)
let publicKeyPem2 = pki.publicKeyToPem(publicKey2)
console.log(publicKeyPem2)