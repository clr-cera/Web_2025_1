import jwt from 'jsonwebtoken';

// TypeScript interface for the JWT payload
interface JwtPayload {
  email: string;
}

// If SESSION_SECRET is defined, use it; otherwise, default to "I love cats"
const secret = process.env.SESSION_SECRET || "I love cats"

// Every JWT token will expire in 1 hour
const options = {
  expiresIn: 60 * 60, // 1 hour
}

// Every token will bind to the email of the user
function createJwtToken(email: string): string {
  return jwt.sign({ email: email }, secret, options);
}

// Verify the JWT token and return the email if valid, or null if invalid
function verifyJwtToken(token: string): string | null {
  try {
    const { email } = jwt.verify(token, secret) as JwtPayload;
    return email
  } catch (err) {
    return null;
  }
}


export { createJwtToken, verifyJwtToken };
