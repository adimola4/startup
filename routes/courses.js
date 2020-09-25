const express = require("express");
const Course = require("../models/course");

const router = express.Router();

// for all endpoints starting with /api/courses/

router.get('/', async (req, res) => {
  const subject = 'Full Stack'
  const title = ' עמי ותמי'

  return res.render('courses', { subject, title });
});

// router.get('/', async (req, res) => {
//   dbHelpers.coursesAll().then(courses => {
//     res.render('courses', { courses  })
//   }).catch(err => {
//     console.error(err)
//     res.render('courses', { courses: [] })
//   })
// })

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    return res.json({ message: 'success', course })
  } catch (error) {
    return res.status(500).json({ message: 'error', error })
  }
})

router.post('/add', async (req, res) => {
  console.table(req.body)
  try {
    await Course.create(course)
    return res.json({ message: `Course created successfully` })
  } catch (error) {
    return res.status(500).json({ message: "Unable to create course", error });
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const delCount = await Course.findByIdAndDelete(req.params.id)
    if (delCount === 0) {
      return res.status(404).json({ message: "No Course with that id" })
    }
    return res.json({ message: `Course successfully deleted` })
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete course", error })
  }
})

module.exports = router;
