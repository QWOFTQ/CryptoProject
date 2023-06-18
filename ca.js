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