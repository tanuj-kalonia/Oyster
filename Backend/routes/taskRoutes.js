import express from "express";
import User from "../models/User.js"
import Task from "../models/Task.js"

export const taskRouter = express.Router();

taskRouter.post("/", async (req, res) => {
    try {

        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields"
            });
        }

        console.log(req.user);
        if (!req.user) return res.status(400).json({
            success: false,
            message: "Please login"
        });

        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(400).json({
            success: false,
            message: "Unautherized User"
        });



        const task = await Task.create({ taskOwner: user._id, title, description, completed: false });
        await task.save();

        user.taskList.push(task);
        user.save();

        res.status(201).json({
            success: true,
            message: "Task created successfully",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

})

// delete a task
taskRouter.delete("/", async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({
            success: false,
            message: "Please login"
        });
        const { taskId } = req.body;

        if (!taskId) return res.status(400).json({
            success: false,
            message: "Task not exists"
        });

        const task = await Task.findById(taskId);
        if (!task) return res.status(400).json({
            success: false,
            message: "Task does not exists"
        });

        if (task.taskOwner.toString() !== req.user.id) return res.status(400).json({
            success: false,
            message: "Unautherized User"
        });

        await task.remove();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })

    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
})
// update a task
taskRouter.put("/", async (req, res) => {
    try {

        if (!req.user) return res.status(400).json({
            success: false,
            message: "Please login"
        });

        const { taskId, title, description, completed } = req.body;
        if (!taskId) return res.status(400).json({
            success: false,
            message: "Task not exists"
        });

        const task = await Task.findById(taskId);
        if (!task) return res.status(400).json({
            success: false,
            message: "Task does not exists"
        });

        if (task.taskOwner.toString() !== req.user.id) return res.status(400).json({ message: "Unautherized User" });

        if (title) task.title = title;
        if (description) task.description = description;
        if (completed) task.completed = completed;


        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated successfully",
            updatedTask: task
        })

    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
})