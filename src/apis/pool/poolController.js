// controllers/pollController.js
import * as pollService from '../pool/poolService.js';

export const getAllPolls = async (req, res) => {
    try {
        const polls = await pollService.getAllPolls();
        res.json(polls);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getPollById = async (req, res) => {
    try {
        const poll = await pollService.getPollById(req.params.id);
        res.json(poll);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const createPoll = async (req, res) => {
    try {
        const pollId = await pollService.createPoll(req.body);
        res.status(201).json({ id: pollId });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updatePoll = async (req, res) => {
    try {
        await pollService.updatePoll(req.params.id, req.body);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deletePoll = async (req, res) => {
    try {
        await pollService.deletePoll(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getVoteOptionsByPollId = async (req, res) => {
    try {
        const options = await pollService.getVoteOptionsByPollId(req.params.id);
        res.json(options);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const createVoteOption = async (req, res) => {
    try {
        const optionId = await pollService.createVoteOption(req.params.pollId, req.body);
        res.status(201).json({ id: optionId });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const submitVote = async (req, res) => {
    try {
        await pollService.submitVote(req.params.voteOptionId, req.body.userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const unsubmitVote = async (req, res) => {
    try {
        await pollService.unsubmitVote(req.params.voteOptionId, req.body.userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

