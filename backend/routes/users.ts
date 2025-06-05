import express from 'express'
import { UserService } from '../services/users';

var router = express.Router();


// Get all users
router.get('/', async (_, res, __) => {
  const users = await UserService.getUsers();
  res.send(users)
});

// Get admin users
router.get('/admins', async (_, res, __) => {
  const admins = await UserService.getAdmins();
  res.send(admins);
});

// Get user by email
router.get('/:email', async (req, res, _) => {
  const user = await UserService.getUserByEmail(req.params.email);
  if (!user) {
    res.status(404).send({ error: "Usuário não encontrado" })
  }
  res.send(user);
})

// Create user
router.post('/', async (req, res, _) => {
  const user = await UserService.createUser(req.body)
  if (!user) {
    res.status(404).send({ error: 'Erro ao criar usuário, já existe uma conta com este email' });
  }
  res.send({ message: "Usuário criado com sucesso", body: user });
})

// Update user by email
router.put('/:email', async (req, res, _) => {
  const updateData = await UserService.updateUserByEmail(req.params.email, req.body);
  if (updateData.matchedCount === 0) {
    res.status(404).send({ error: "Usuário não encontrado" });
  }
  res.send({ message: "Usuário atualizado com sucesso" });
})

// Delete user by email
router.delete('/:email', async (req, res, _) => {
  const deleteData = await UserService.deleteUserByEmail(req.params.email);
  if (deleteData.deletedCount === 0) {
    res.status(404).send({ error: "Usuário não encontrado" });
  }
  res.send({ message: "Usuário deletado com sucesso" });
})

router.post('/login', async (req, res, _) => {
  const { email, password } = req.body;
  try {
    const token = UserService.loginUser(email, password)
    if (token === null) {
      res.status(401).send({ error: "Email ou senha inválidos" });
    }
    res.json({ auth: true, token: token });
  } catch (error) {
    res.status(401).send({ error: "Email ou senha inválidos" });
  }
})


export default router;
