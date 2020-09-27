const express = require("express");
const Quiz = require("../models/quiz");

const router = express.Router();

// for all endpoints starting with /api/quiz/

router.get('/', async (req, res) => {
    try {
        return res.json(await Quiz.find({}))
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const question = await Quiz.findById(req.params.id)
        if (!question) {
            return res.status(404).json({ message: 'not found' })
        }
        return res.json({ message: 'success', question })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Unable to get", error })
    }
})

// Question addition route (/api/quiz/add):
// req.body: {
//   title: String,
//   questions: [{
//       title: String,
//       flavor: String,
//       answer: String,
//       choices: [
//          String, ...
//       ]
//   }, ...]
// }
// title :: Required
// type :: Required, Can be ('truefalse' or 'american' or 'fillblanks')
// answer :: Required, truefalse: either 'true' or 'false',
//                     american: an integer (starting from 0),
//                     fillblanks: the texts to be filled (split by ';;')
//
// choices :: Required if type is 'american' or 'fillblanks',

router.post('/add', async (req, res) => {
    console.log('adding quiz, got data:')
    console.table(req.body)
    try {
        await Quiz.create(req.body)
        return res.json({ message: `Course created successfully` })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Unable to create course", error })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const delCount = await Quiz.findByIdAndDelete(req.params.id)
        if (delCount === 0) {
            return res.status(404).json({ message: "No Course with that id" })
        }
        return res.json({ message: `Course successfully deleted` })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Unable to delete course", error })
    }
})

module.exports = router;
