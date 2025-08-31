import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createNote, deleteNote, listNotes } from '../controllers/noteController.js';

const router = Router();

router.use(requireAuth);
router.get('/', listNotes);
router.post('/', createNote);
router.delete('/:id', deleteNote);

export default router;
