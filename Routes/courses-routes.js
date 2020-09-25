const express = require("express");
const courses = require("../models/dbHelpers");

const router = express.Router();

// for all endpoints starting with /api/courses/

router.get('/', (req, res) => {
  courses.findCourseById(1)
  const subject = 'Full Stack'
  const title = ' עמי ותמי'

  res.render('courses',{subject,title});
});

// router.get('/', (req, res) => {
//   dbHelpers.coursesAll().then(courses => {
//     res.render('courses', { courses  })
//   }).catch(err => {
//     console.error(err)
//     res.render('courses', { courses: [] })
//   })
// })

router.get('/:id', (req, res) => {
  courses.findCourseById(req.params.id).then(resp => {
    res.json({ message: 'success', course: resp })
  }).catch(err => {
    res.status(500).json({ message: 'error' })
  })
})

router.post('/add', (req, res) => {
  console.table(req.body)

  courses.addCourse(course).then(resp => {
    return res.json({ message: `Course created successfully` })
  }).catch(err => {
    return res.status(500).json({ message: "Unable to create course" });
  })
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  courses.removeCourse(id)
    .then((count) => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: `Course with id ${id} successfully deleted` });
      } else {
        res.status(404).json({ message: "No Course with that id" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Unable to delete course" });
    });
});

module.exports = router;
