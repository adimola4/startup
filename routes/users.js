const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        return res.json(await User.find({}))
    } catch (error) {
        return res.status(500).json({ message: "error to find users", error })
    }
})

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const count = await User.findByIdAndDelete(id)
        if (count === 0) {
            return res.status(404).json({ message: "Record not found" })
        }
        return res.json({ message: "user removed successfully" })
    } catch (error) {
        res.status(500).json({ message: "error to find user", error })
    }
})

router.get('/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const users = await User.findOne({ email })
        if (!users) {
            return res.status(404).json({ message: "Record not found" })
        }
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: "error to find user" })
    }
})

module.exports = router;
