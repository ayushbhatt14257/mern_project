const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require('../models/userschema');



// user register through promise 

// router.post("/register", (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(400).json({ error: `All fild are mandatory` });
//     }

//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(400).json({ error: `User Already Exist` });
//             }

//             const user = new User({ name, email, phone, work, password, cpassword })

//             user.save().then(() => {
//                 res.status(200).json({ message: `User Register Successfuly` })
//             }).catch((error) => res.status(500).json({ error: `Faild To register` }));

//         }).catch(error => { console.log(error) });
// })

// async await 

router.post("/register", async(req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(400).json({ error: `All fild are mandatory` });
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ error: `User Already Exist` });

        } else if (password !== cpassword) {
            return res.status(400).json({ error: `Password is not matching` });

        } else {
            const user = new User({ name, email, phone, work, password, cpassword })

            await user.save()
            res.status(200).json({ message: `User Register Successfuly` })
        }


    } catch (error) {
        console.log(error)
    }
});

// login Code 

router.post('/signin', async(req, res) => {

    try {
        let token
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: `Fill the details` })
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();

            res.cookie('jwttoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })

            if (!isMatch) {
                res.status(400).json({ error: `Invalid login detail's` })
            } else {
                res.json({ message: `User Login Successfuly....` })
            }
        } else {
            res.status(400).json({ error: "Invalid login detail's" })
        }

    } catch (error) {
        console.log(error);
    }

})

router.get('/about', authenticate, (req, res) => {
    console.log("hello my about");
    res.send(req.rootUser);
});

// home and contact page data dynamically

router.get('/getData', authenticate, (req, res) => {
    console.log("hello my getData");
    res.send(req.rootUser);
})

// contact message form code 
router.post("/contact", authenticate, async(req, res) => {
    try {

        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.json({ error: "plzz filled the contact from" });
        }

        const userContact = await User.findOne({ _id: req.userID })

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();

            res.status(201).json({ message: "user Contact Successfully" });
        } else if (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error);
    }
});

router.get("/logout", (req, res) => {
    console.log(`hello logout page`);
    res.clearCookie('jwttoken', { path: "/" });
    res.status(200).send("user logout");
})

module.exports = router;