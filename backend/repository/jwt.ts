import jwt from 'jsonwebtoken';

interface JwtPayload {
  email: string;
}

const secret = process.env.SESSION_SECRET || "I love cats"
const options = {
  expiresIn: 60 * 60, // 1 hour
}

function createJwtToken(email: string): string {
  return jwt.sign({ email: email }, secret, options);
}
function verifyJwtToken(token: string): string | null {
  try {
    const { email } = jwt.verify(token, secret) as JwtPayload;
    return email
  } catch (err) {
    return null;
  }
}


export { createJwtToken, verifyJwtToken };
