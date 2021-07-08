const router = require('express').Router();
const verify = require('./verif');

router.get('/',verify,(req,res)=>{
    res.json({
        posts: {
            title: "You And Me",
            description: "Me and You till the end."
        }
    })
    
});

module.exports = router;
