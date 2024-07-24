// routes/pollRoutes.js
import express from 'express';
import  * as pollController from '../pool/poolController.js';

const router = express.Router();

router.get('/polls', pollController.getAllPolls);
router.get('/polls/:id', pollController.getPollById);
router.post('/polls', pollController.createPoll);
router.put('/polls/:id', pollController.updatePoll);
router.delete('/polls/:id', pollController.deletePoll);

router.get('/polls/:id/options', pollController.getVoteOptionsByPollId);
router.post('/polls/:pollId/options', pollController.createVoteOption);

router.post('/options/:voteOptionId/submit', pollController.submitVote);
router.post('/options/:voteOptionId/unsubmit', pollController.unsubmitVote);

export default router;  
