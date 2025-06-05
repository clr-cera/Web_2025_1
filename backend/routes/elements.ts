import express from 'express'
import { ElementService } from '../services/elements';

var router = express.Router();

// Get all elements
router.get('/', async (_, res, __) => {
  const elements = await ElementService.getAllElements();
  res.send(elements)
})

// Get elements by category
router.get('/category/:category', async (req, res, _) => {
  const elements = await ElementService.getElementsByCategory(req.params.category);
  res.send(elements);
})

// Get element by name
router.get('/name/:name', async (req, res, _) => {
  const element = await ElementService.getElementByName(req.params.name);
  if (!element) {
    res.status(404).send({ error: 'Não foi possível encontrar o elemento' });
  }
  res.send(element);
})

// Get element by id
router.get('/:id', async (req, res, _) => {
  const element = await ElementService.getElementById(req.params.id);
  if (!element) {
    res.status(404).send({ error: 'Não foi possível encontrar o elemento' });
  }
  res.send(element);
})

// Create element
router.post('/', async (req, res, _) => {
  const element = await ElementService.createElement(req.body)
  if (!element) {
    res.status(404).send({ error: 'Erro ao criar elemento' });
  }
  res.send({ message: "Usuário criado com sucesso", body: element });
})

// Update element by id
router.put('/:id', async (req, res, _) => {
  const updateData = await ElementService.updateElementById(req.params.id, req.body);
  if (updateData.matchedCount === 0) {
    res.status(404).send({ error: 'Não foi possível encontrar o elemento' });
  }
  res.send({ message: "Elemento atualizado com sucesso" });
})

router.delete('/:id', async (req, res, _) => {
  const deleteData = await ElementService.deleteElementById(req.params.id);
  if (deleteData.deletedCount === 0) {
    res.status(404).send({ error: 'Não foi possível encontrar o elemento' });
  }
  res.send({ message: "Elemento deletado com sucesso" });
})

router.patch('/:id', async (req, res, _) => {
  const updatedStock = req.body.stock;
  try {
    await ElementService.patchElementStock(req.params.id, updatedStock);
    res.send({ message: "Estoque atualizado com sucesso" });
  } catch (error) {
    res.status(404).send({ error: `Não foi possível encontrar o elemento ou atualizar o estoque. Error: ${error}` });
  }
})


export default router;

