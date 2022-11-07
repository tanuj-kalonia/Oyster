import express from "express";
import passport from "passport";

import User from "../models/User.js"
import Task from "../models/Task.js"

export const userRouter = express.Router();


// Route for Register
userRouter.post("/register", async (req, res) => {
    try {
        // get the user data from the request body
        if (req.user) return res.status(400).json({
            success: false,
            message: "Already Logged In"
        });

        const { name, username, password } = req.body;
        console.log(name, username, password);
        if (!name || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields"
            });
        }

        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({
            success: false,
            message: "User already exists"
        });

        // Create a new user
        user = await User.create({ name, username, password });
        await user.save();
        const result = {
            name: user.name,
            username: user.username,
            tasklist: user.taskList
        }

        res.status(201).json({
            success: true,
            message: "User created successfully",
            result
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

});

// Login Route
userRouter.post('/login',
    passport.authenticate('local'),
    (req, res) => {
        console.log(req.user);
        res.json({
            success: true,
            user: req.user,
            message: "Logged in successfully"
        });
    }
);

// logout route
userRouter.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    });
});

// Get user data
userRouter.get("/user", async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({
            success: false,
            message: "Please login"
        });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(400).json({ message: "User not found" });

        var allTask = [];
        for (let i = 0; i < user.taskList.length; i++) {
            const task = await Task.findById(user.taskList[i]._id).select("-__v");
            if (task) allTask.push(task);
        }

        res.status(200).json({
            success: true,
            allTask
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
})


// Create a task for the user
