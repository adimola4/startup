const express = require("express");
const dbHelpers = require("../models/dbHelpers");

const router = express.Router();

// for all endpoints starting with /api/question/

router.get('/', (req, res) => {
    dbHelpers.questionsAll().then(resp => {
        return res.json(resp)
    }).catch(err => {
        return res.status(500).json()
    })
})

router.get("/:id", (req, res) => {
    dbHelpers.questionsFindById(req.params.id).then(question => {
        if (!question) {
            return res.status(404).json({ message: 'not found' })
        }
        return res.json({ message: 'success', question })
    }).catch((error) => {
        return res.status(500).json({ message: "Unable to get", error })
    })
})

// Question addition route (/api/question/add):
// req.body: {
//   title: String,
//   type: String,
//   answer: String,
//   choices: String,
// }
// title :: Required
// type :: Required, Can be ('truefalse' or 'american' or 'fillblanks')
// answer :: Required, truefalse: either 'true' or 'false',
//                     american: an integer (starting from 0),
//                     fillblanks: the texts to be filled (split by ';;')
//                      
// choices :: Required if type is 'american' or 'fillblanks',
//      American: choices will be split by each ';;'
//      FillBlanks: Empty spaces will be stored as ';;#;;'
//                  where '#' is an integer representing number of empty characters

router.post('/add', (req, res) => {
    // console.table(req.body)
    // const { title, type, answer, choices } = req.body
    dbHelpers.questionsAdd(req.body).then(resp => {
        return res.status(200).json({ message: `Course created successfully` })
    }).catch(err => {
        return res.status(500).json({ message: "Unable to create course" });
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    dbHelpers.questionsRemove(id)
        .then((count) => {
            if (count === 0) {
                return res.status(404).json({ message: "No Course with that id" });
            }
            return res.json({ message: `Course with id ${id} successfully deleted` });
        })
        .catch((error) => {
            return res.status(500).json({ message: "Unable to delete course", error });
        });
});

module.exports = router;
