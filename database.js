const sqlite3 = require('sqlite3').verbose();

module.exports = class DBHandler {
    constructor() {
        this.db = new sqlite3.Database('./database.db', (err) => {
            if(err) {
                return console.log(err.message)
            }
        
            console.log("Successful connection to the database")
        });

        this.db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            first_name TEXT NOT NULL,
            last_name  TEXT NOT NULL,
            age TEXT,
            gender TEXT
        )`);
    }

    createUser(email, password, first_name, last_name, age, gender) {
        this.db.run(`INSERT INTO users(email, password, first_name, last_name, age, gender) VALUES(?,?,?,?,?,?)`, [email, password, first_name, last_name, age, gender], (err) => {
            if (err) {
                console.log("Error insert data to the database");
                return console.log(err.message);
            }
            // get the last insert id
            console.log("A row has been inserted.");
          });
    }

    printAllUsers(userId) {
        this.db.serialize(() => {
            this.db.each(`SELECT * FROM users`, (err, row) => {
              if (err) {
                console.error(err.message);
              }
              console.log(`${row.id}\t${row.email}\t${row.password}\t${row.first_name}\t${row.last_name}\t${row.age}\t${row.gender}`);
            });
          });
    }
}

// // Creating new handler
// let handler = new DBHandler()

// // Fill db with users
// for(let i = 0 ; i < 10; i++) {
//     handler.createUser(randomString(10), randomString(5), randomString(10), randomString(10), randomNumber(2), randomString(3))
// }

// // Print all users in the database
// handler.printAllUsers()

// // Creata a random string with the given length (e.g. O3E03HUtPk for length 10)
// function randomString(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//        result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//  }

//  // Creata a random string of integers with the given length (e.g. 324 for length 3)
//  function randomNumber(length) {
//     var result           = '';
//     var characters       = '0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//        result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//  }