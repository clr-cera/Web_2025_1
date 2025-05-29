import { getUserByEmail } from "../repository/users.mjs";

function getUser(email) {
  return getUserByEmail(email)
}

export { getUser };
