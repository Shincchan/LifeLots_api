const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');

//udpdate a user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);


            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("account has been updated");

        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("You can just update");
    }
})

//delete a user 
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        try {
            await User.deleteOne({ _id: req.params.id });
            return res.status(200).json("account has been deleted");

        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("You cant delete the account");
    }
})

// get a user
router.get("/:id", async (req,res)=>{
    try {
        //return user except password
        const user = await User.findById(req.params .id ,'-password -updatedAt');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

//follow a user
router.put("/:id/follow", async(req,res) =>{
    if(req.body.userId !== req.params.id){
        try {
            const user =await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.following.includes(req.body.userId)){
                await currentUser.updateOne({$push: {followers: req.params.id}});
                await user.updateOne({$push: {following: req.body.userId}});//requester
                res.status(200).json("user has been followed");

            }else{
                res.status(401).json("you already follow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json("You cant Follow yoursf");
    }
});

// unfollow a user 
router.put("/:id/unfollow", async(req,res) =>{
    if(req.body.userId !== req.params.id){
        try {
            const user =await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.following.includes(req.body.userId)){
                await currentUser.updateOne({$pull: {followers: req.params.id}});
                await user.updateOne({$pull: {following: req.body.userId}});//unfollower
                res.status(200).json("user has been unfollowed");

            }else{
                res.status(401).json("you dont follow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json("You cant Unfollow yourself");
    }
});

module.exports = router;