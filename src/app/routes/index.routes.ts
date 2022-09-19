import { Router } from 'express';
import users from './users.routes'
import todo from './todo.routes'

const router: Router = Router();

router.use('/users', users);
router.use('/todo', todo);

export default router