const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log("Header",req.session.authorization)
        const token = req.session.authorization;
        const decoded = jwt.verify(token,"secret key");
        req.userData = decoded;
        next();
    }
    catch (err){
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
};