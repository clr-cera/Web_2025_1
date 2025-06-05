import { verifyJwtToken } from '../repository/jwt.ts'
import { UserService } from '../services/users.ts'

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
async function adminMiddleware(req: any, res: any, next: any) {
  if (!await UserService.isAdmin(res.locals.email)) {
    res.status(403).send({ error: "Acesso negado, apenas administradores podem acessar esta rota" });
  }
  next();
}
async function superAdminMiddleware(req: any, res: any, next: any) {
  if (!await UserService.isSuperAdmin(res.locals.email)) {
    res.status(403).send({ error: "Acesso negado, apenas administradores podem acessar esta rota" });
  }
  next();
}

export { authMiddleware, adminMiddleware, superAdminMiddleware }
