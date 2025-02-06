const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @desc    Get Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

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

    await Goal.findByIdAndDelete(id);

    res.status(200).json({ id: id });
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}