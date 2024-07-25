import crypto from 'crypto';

class PasswordService {
    generateSalt() {
        return crypto.randomBytes(16).toString('hex');
    }

    hashPassword(password, salt) {
        return crypto.createHmac('sha256', salt).update(password).digest('hex');
    }

    verifyPassword(inputPassword, salt, storedPasswordHash) {
        const inputPasswordHash = this.hashPassword(inputPassword, salt);
        return inputPasswordHash === storedPasswordHash;
    }
}

export default new PasswordService();
