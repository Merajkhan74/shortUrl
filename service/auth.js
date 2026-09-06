
const jwt = require('jsonwebtoken');
const secretKey = 'Meraj#@@121#'; 
function setUser(user){
    
 
        return jwt.sign({
            uid: user._id,
            email: user.email,
            role: user.role ,
            // password: user.password // dont use password in token
        }, secretKey)

}
function getUser(token){
    if(!token) return null;
   
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }

}

module.exports ={
    setUser,
    getUser
}