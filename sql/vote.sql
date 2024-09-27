CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    country_code INT
);

CREATE TABLE votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    voteTitle TEXT,
    voteQuestion TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy INT,
    FOREIGN KEY (createdBy) REFERENCES users(id)
);

CREATE TABLE voteOptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    voteOption TEXT,
    count INT DEFAULT 0,
    voteId INT,
    FOREIGN KEY (voteId) REFERENCES votes(id)
);

CREATE TABLE voteResults (
    voteOptionId INT,
    votedBy INT,
    FOREIGN KEY (voteOptionId) REFERENCES voteOptions(id),
    FOREIGN KEY (votedBy) REFERENCES users(id),
    PRIMARY KEY (voteOptionId, votedBy)
);

INSERT INTO users (full_name, created_at, country_code) VALUES 
('Alice Johnson', NOW(), 1),
('Bob Smith', NOW(), 1),
('Charlie Brown', NOW(), 2);
INSERT INTO votes (voteTitle, voteQuestion, createdAt, createdBy) VALUES 
('Favorite Fruit', 'Which is your favorite fruit of all time?', NOW(), 1),
('Best Programming Language', 'What is the best programming language?', NOW(), 2);
INSERT INTO voteOptions (voteOption, count, voteId) VALUES 
('Strawberries', 0, 1),
('Mango', 0, 1),
('Bananas', 0, 1),
('Grapes', 0, 1),
('Lemon', 0, 1),
('Python', 0, 2),
('JavaScript', 0, 2),
('Java', 0, 2),
('C++', 0, 2);
INSERT INTO voteResults (voteOptionId, votedBy) VALUES 
(1, 1), -- Alice Johnson votes for Strawberries
(2, 2), -- Bob Smith votes for Mango
(3, 3), -- Charlie Brown votes for Bananas
(1, 2), -- Bob Smith votes for Strawberries again to simulate multiple votes by the same user (if allowed)
(6, 1), -- Alice Johnson votes for Python
(7, 2), -- Bob Smith votes for JavaScript
(9, 3); -- Charlie Brown votes for C++

