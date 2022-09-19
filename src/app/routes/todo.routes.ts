import { Router } from 'express';
import { container, injectable } from "tsyringe";
import { TodoController } from '../controllers/todo/todo.controller';
import { auth } from '../utils/token.util';

const router = Router();
const todo = container.resolve(TodoController);

router.post('/', auth, todo.Post);
router.get('/', auth, todo.Get);
router.get('/:id', auth, todo.Find);
router.put('/:id', auth, todo.Put);
router.delete('/:id', auth, todo.Delete);

export default router;