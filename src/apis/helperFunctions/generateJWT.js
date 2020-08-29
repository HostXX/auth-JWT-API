const nJwt = require('njwt')

function generateJWT(claims,secret) {
    
    // const jwt = nJwt.create(claims,String(secret),"HS256")
     var rawJwt = nJwt.create(claims,secret);
     // console.log('token no compacto=======================================================')
     // console.log(jwt);
     const tokenCompact = rawJwt.compact()
     // console.log('token compacto=======================================================')
     // console.log(token);
 
     return ({
         rawJwt,
         tokenCompact
     })
     
 }

 module.exports = generateJWT