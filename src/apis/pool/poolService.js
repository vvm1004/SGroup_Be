// services/pollService.js
import { connection as db } from '../../database/config.js';

export const getAllPolls = async () => {
    const [rows] = await db.query('SELECT * FROM votes');
    return rows;
};

export const getPollById = async (id) => {
    const [rows] = await db.query('SELECT * FROM votes WHERE id = ?', [id]);
    return rows[0];
};

export const createPoll = async (poll) => {
    const { voteTitle, voteQuestion, createdBy } = poll;
    const [result] = await db.query('INSERT INTO votes (voteTitle, voteQuestion, createdAt, createdBy) VALUES (?, ?, NOW(), ?)', [voteTitle, voteQuestion, createdBy]);
    return result.insertId;
};

export const updatePoll = async (id, poll) => {
    const { voteTitle, voteQuestion } = poll;
    await db.query('UPDATE votes SET voteTitle = ?, voteQuestion = ? WHERE id = ?', [voteTitle, voteQuestion, id]);
};

export const deletePoll = async (id) => {
    await db.query('DELETE FROM votes WHERE id = ?', [id]);
};

export const getVoteOptionsByPollId = async (pollId) => {
    const [rows] = await db.query('SELECT * FROM voteOptions WHERE voteId = ?', [pollId]);
    return rows;
};

export const createVoteOption = async (pollId, option) => {
    const { voteOption } = option;
    const [result] = await db.query('INSERT INTO voteOptions (voteOption, voteId) VALUES (?, ?)', [voteOption, pollId]);
    return result.insertId;
};

export const submitVote = async (voteOptionId, userId) => {
    await db.query('INSERT INTO voteResults (voteOptionId, votedBy) VALUES (?, ?)', [voteOptionId, userId]);
    await db.query('UPDATE voteOptions SET count = count + 1 WHERE id = ?', [voteOptionId]);
};

export const unsubmitVote = async (voteOptionId, userId) => {
    await db.query('DELETE FROM voteResults WHERE voteOptionId = ? AND votedBy = ?', [voteOptionId, userId]);
    await db.query('UPDATE voteOptions SET count = count - 1 WHERE id = ?', [voteOptionId]);
};
