const pgp = require('pg-promise')();
const { DATABASE_URL } = require('./secrets');
const dbConfig = DATABASE_URL;
const db = pgp(dbConfig);

// where sql queries will go

let addNewUser = (email, password) => {
  return db.one('INSERT INTO users(email, password) \
    VALUES($1, $2) RETURNING id',
    [email, password])
}

let addBoard = (user_id) => {
  return db.query(`
    INSERT INTO user_boards (user_id)
        VALUES ($1)
        returning board_id ;`, [user_id])
}

let addImages = (board_id, image_id, image_url, description, location, size, type) => {
  return db.query(`
    INSERT INTO board_images (board_id, image_id, image_url, description, location, size, type) 
    values ($1, $2, $3, $4, $5, $6, $7) returning *;`, 
  [board_id, image_id, image_url, description, location, size, type])
}

let checkUserCreds = (email, password) => {
  return db.one('SELECT * from users \
    WHERE email = $1 AND password = $2', 
    [email, password]);
}


module.exports = {
  addNewUser: addNewUser,
  checkUserCreds: checkUserCreds,
  addBoard: addBoard,
  addImages: addImages
};

// addNewUser('hello@world.com', 'password')
//   .then(console.log)
//   .catch(console.error);