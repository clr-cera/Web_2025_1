import hash from 'pbkdf2-password'
import { userCollection } from './db.mjs'

function getUserByEmail(email) {
  console.log(userCollection, email)
  return userCollection + email
}


export { getUserByEmail }
