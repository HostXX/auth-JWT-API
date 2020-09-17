const nJwt = require('njwt')

function generateJWT(claims,secret,expTime) {
    
    // const jwt = nJwt.create(claims,String(secret),"HS256")
     let rawJwt = nJwt.create(claims,secret);
     rawJwt.setExpiration(new Date().getTime() + expTime)

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