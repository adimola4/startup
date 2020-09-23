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

router.post('/addCourse' , (req,res) => {
res.send({body : req.params})
})




router.delete("/:id", (req, res) => {
  const { id } = req.params;

  router.removeCourse(id)
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
