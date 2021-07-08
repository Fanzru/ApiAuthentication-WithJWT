const router = require('express').Router();
const user = require('../models/user');
const {registerValidation} = require('../controller/validation');

router.post('/register',async(req,res)=>{
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const User = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    try {
        const savedUser = await User.save();
        res.send(savedUser)
        
    } catch (err){
        res.status(400).send(err)
    }
});

router.post('/login')
module.exports = router;