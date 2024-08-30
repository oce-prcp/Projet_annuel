const jwt = require('jsonwebtoken')
const User = require('../models/modelUser')

exports.user = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).send('Accès refusé')
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Token invalide')
    }
}

exports.admin = async (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).send('Accès refusé');
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        const user = await User.findOne({ where: { id: verified.id } });  // Adjust the query based on your ORM

        if (user && user.type === 'admin') {
            next();
        } else {
            res.status(401).send('Accès refusé');  // Deny access if the user is not an admin
        }
    } catch (err) {
        res.status(400).send('Token invalide');  // Handle any errors in token verification
    }
}