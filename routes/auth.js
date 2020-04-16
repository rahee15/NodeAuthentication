const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const {registerValidations,loginValidations} = require('../validation');


router.post('/register',async (req,res) => {
    //Validate
    const {error} = registerValidations(req.body);
    if(error)
    {
        res.status(400).send(error.details[0].message);
    }
    else
    {
    //Checking If user already exist
    const emailExist = await User.findOne({email : req.body.email})
    
    if(emailExist)
    {
        return res.status(400).send('Email already Exist');
    }
        
    //Create a new User    
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    console.log("Storing the User",user);
    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }
    catch(err)
    {
        res.status(400).send(err)
    }
    finally{
        console.log("User saved");
    }
    }

})

router.post("/login",async (req,res) => {
    const {error} = loginValidations(req.body);
    if(error)
    {
        res.status(400).send(error.details[0].message);
    }
    else
    {
        //Checking If user already exist
    const user = await User.findOne({email : req.body.email})
    
    if(user)
    {
        if(user.password == req.body.password)
        {
            //Create Token
            const token = jwt.sign({
                _id:user._id
            },process.env.TOKEN_SECRET);
            res.header('auth-token',token);
            res.status(200).send("Logged In");
        }
        else
        {
            res.status(400).send("Incorrect Password");
        }        
    }
    else
    {
        res.status(400).send("No User Found")
    }
    }

});

module.exports = router