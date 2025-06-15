import { verifyJwtToken } from '../repository/jwt.ts'
import { UserService } from '../services/users.ts'

// Middleware to check if the user is authenticated and set the email in res.locals
async function authMiddleware(req: any, res: any, next: any) {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }
  const email = verifyJwtToken(token);
  if (email === null) {
    return res.status(401).send({ error: "Invalid token" });
  }
  res.locals.email = email;

  next();
}

// Middleware to check if the user is an admin or super admin
async function adminMiddleware(_: any, res: any, next: any) {
  if (!await UserService.isAdmin(res.locals.email)) {
    res.status(403).send({ error: "Acesso negado, apenas administradores podem acessar esta rota" });
    return
  }
  next();
}

// Middleware to check if the user is a super admin
async function superAdminMiddleware(_: any, res: any, next: any) {
  if (!await UserService.isSuperAdmin(res.locals.email)) {
    res.status(403).send({ error: "Acesso negado, apenas super administradores podem acessar esta rota" });
    return
  }
  next();
}

export { authMiddleware, adminMiddleware, superAdminMiddleware }
