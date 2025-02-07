const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals);
})

// @desc    Set Goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field!');
    }

    const newGoal = await Goal.create({
        user: req.user.id,
        text: req.body.text
    })

    res.status(200).json(newGoal);
})

// @desc    Update Goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const id = req.params.id

    const goal = await Goal.findById(id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true })

    res.status(200).json(updatedGoal);
})

// @desc    Delete Goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const id = req.params.id

    const goal = await Goal.findById(id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found!')
    }

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await Goal.findByIdAndDelete(id);

    res.status(200).json({ id: id });
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}