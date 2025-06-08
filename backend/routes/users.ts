import express from 'express'
import { UserService } from '../services/users.ts';
import { authMiddleware, superAdminMiddleware } from './middleware.ts';

var router = express.Router();

// Only Super Admins can use
// Get all users
router.get(
  '/',
  authMiddleware,
  superAdminMiddleware,
  async (_, res, __) => {
    const users = await UserService.getUsers();
    res.send(users)
    return
  });

// Only Super Admins can use
// Get admin users
router.get(
  '/admins',
  authMiddleware,
  superAdminMiddleware,
  async (_, res, __) => {
    const admins = await UserService.getAdmins();
    res.send(admins);
    return
  });

// Only Super Admins can use
// Get user by email
router.get(
  '/:email',
  authMiddleware,
  superAdminMiddleware,
  async (req, res, _) => {
    const user = await UserService.getUserByEmail(req.params.email);
    if (!user) {
      res.status(404).send({ error: "Usuário não encontrado" })
      return
    }
    res.send(user);
    return
  })

// Only Super Admins can use
// Create user
router.post(
  '/',
  authMiddleware,
  superAdminMiddleware,
  async (req, res, _) => {
    const user = await UserService.createUser(req.body)
    if (!user) {
      res.status(404).send({ error: 'Erro ao criar usuário, já existe uma conta com este email' });
      return
    }
    res.send({ message: "Usuário criado com sucesso", body: user });
    return
  })

// Create user
router.post('/register',
  async (req, res, _) => {
    req.body.role = "Customer"; // Default role for new users
    const user = await UserService.createUser(req.body)
    if (!user) {
      res.status(404).send({ error: 'Erro ao criar usuário, já existe uma conta com este email' });
      return
    }
    res.send({ message: "Usuário criado com sucesso", body: user });
    return
  })

// Only Super Admins can use
// Update user by email
router.put(
  '/:email',
  authMiddleware,
  superAdminMiddleware,
  async (req, res, _) => {
    const updateData = await UserService.updateUserByEmail(req.params.email, req.body);
    if (updateData === null) {
      res.status(404).send({ error: "Erro ao atualizar usuário, já existe uma conta com este email" });
      return
    }
    else if (updateData.matchedCount === 0) {
      res.status(404).send({ error: "Usuário não encontrado" });
      return
    }
    res.send({ message: "Usuário atualizado com sucesso" });
    return
  })

// Only Super Admins can use
// Delete user by email
router.delete(
  '/:email',
  authMiddleware,
  superAdminMiddleware,
  async (req, res, _) => {
    if (req.params.email === res.locals.email) {
      res.status(403).send({ error: "Você não pode deletar sua própria conta" });
      return
    }
    const deleteData = await UserService.deleteUserByEmail(req.params.email);
    if (deleteData.deletedCount === 0) {
      res.status(404).send({ error: "Usuário não encontrado" });
      return
    }
    res.send({ message: "Usuário deletado com sucesso" });
    return
  })

// Login user and send token
router.post(
  '/login',
  async (req, res, _) => {
    try {
      const { email, password } = req.body;
      console.log("Login attempt for email:", email);
      try {
        const token = await UserService.loginUser(email, password)
        if (token === null) {
          res.status(401).send({ error: "Email ou senha inválidos" });
          return
        }
        console.log("Login with token:", token)
        res.json({ auth: true, token: token });
        return
      } catch (error) {
        res.status(401).send({ error: "Email ou senha inválidos" });
        return
      }
    } catch (error) {
      res.status(400).send({ error: "Payload falta email e/ou senha" });
      return
    }
  })


export default router;
