const konex = require('knex')
const config = require('../knexfile')
const db = require("../dbConfig");

module.exports = {
  find,
  remove,
  update,
  addUser,
  find,
  findUserByEmail,
  addCourse,
  findCourseById,
  removeCourse
};

// Users function
async function addUser(user) {
  user.IsTeacher = (user.IsTeacher === 'on') ? true : false;
  
  return await db("users").insert(user, ["ID", "Email","Password","Title","Address", "FirstName", "LastName", "Phone",  "Gender", "IsTeacher", "Github" , "Twitter", "Instagram", "Facebook"])
  .catch(err => {
    throw err;
  });
}


function find() {
  return db("users");
}

function findUserByEmail(Email) {
  return db("users").where({Email}).first()
  .catch(err => {
    console.log(err)
    throw err;
  });
}

function remove(id) {
  return db("users").where({ id }).del()
  .catch(err => {
    console.log(err)
    throw err;
  });
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    })
    .catch(err => {
      console.log(err)
      throw err;
    });
}
// -------END OF USER Function-------


//COURSES functions 


async function addCourse(course) {
  return await db("courses").insert(course, ["ID","Subject","Title","Description"])
  .catch(err => {
    console.log(err)
    throw err;
  });
}

  function findCourseById(id) {
    return db("courses").where({ id }).first()
    .catch(err => {
      console.log(err)
      throw err;
    });
  }

  function removeCourse(id) {
    return db("courses").where({ id }).del()
    .catch(err => {
      console.log(err)
      throw err;
    }) ;
  }


// -------END OF COURSES Function-------

function findMessageById(id) {
  return db("messages").where({ id }).first()
  .catch(err => {
    console.log(err)
    throw err;
  });
}

async function addMessage(message, lesson_id) {
  return await db("messages").where({ lesson_id }).insert(message, ["id"])
  .catch(err => {
    console.log(err)
    throw err;
  });
  // const [id] = await db("messages").where({ lesson_id }).insert(message);
  // return findMessageById(id);
}

function findLessonMessages(lesson_id) {
  return db("lessons as l")
    .join("messages as m", "l.id", "m.lesson_id")
    .select(
      "l.id as LessonID",
      "l.name as LessonName",
      "m.id as MessageID",
      "m.sender",
      "m.text"
    )
    .where({ lesson_id })
    .catch(err => {
      console.log(err)
      throw err;
    });
}

function removeMessage(id) {
  return db("messages").where({ id }).del()
  .catch(err => {
    console.log(err)
    throw err;
  }) ;
}
