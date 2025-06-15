import { pbkdf2Sync, randomBytes } from 'node:crypto';
// larger numbers mean better security
const config = {
  // size of the generated hash
  hashBytes: 32,
  // larger salt means hashed passwords are more resistant to rainbow table, but
  // you get diminishing returns pretty fast
  saltBytes: 16,
  // more iterations means an attacker has to take longer to brute force an
  // individual password, so larger is better. however, larger also means longer
  // to hash the password. tune so that hashing the password takes about a
  // second
  iterations: 872791,
  digest: "sha512"
};

// Function to hash a password using PBKDF2
function HashPassword(password: string): string {
  const { iterations, hashBytes, digest, saltBytes } = config;
  const salt = randomBytes(saltBytes).toString("hex");
  const hash = pbkdf2Sync(password, salt, iterations, hashBytes, digest)
    .toString("hex");
  return [salt, hash].join("$");
}

// Function to verify a password against a stored hash
function VerifyPassword(password: string, combined: string): boolean {
  const { iterations, hashBytes, digest } = config;
  const [salt, originalHash] = combined.split("$");
  const hash = pbkdf2Sync(password, salt, iterations, hashBytes, digest)
    .toString("hex");
  return hash === originalHash;
}

export { VerifyPassword, HashPassword };
