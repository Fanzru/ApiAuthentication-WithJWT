const router = require('express').Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

const {registerValidation,loginValidation} = require('../controller/validation');

// Register
router.post('/register',async(req,res)=>{
    // validate user input
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // checking if email already in database
    const emailExist = await user.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(req.body.password, salt)

    const User = new user({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassowrd 
    });
    
    try {
        const savedUser = await User.save();
        res.send(savedUser)
        
    } catch (err){
        res.status(400).send(err)
    }
});

// Login
router.post('/login',async(req,res)=>{
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const User = await user.findOne({email: req.body.email});
    if (!User) return res.status(400).send('Email Not Found');

    // cek password 
    const validPassword = await bcrypt.compare(req.body.password, User.password);
    if (!validPassword) return res.status(400).send('Invalid Password')
    
    const token = jwt.sign({_id: User._id}, process.env.TOKEN);
    res.header('auth-token',token).send(token);

});

module.exports = router;