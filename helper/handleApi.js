import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class helper {
    getToken(payload) {
        return jwt.sign(payload, process.env.TOKEN_SCRET, { expiresIn: process.env.EXPIRE_TOKEN });
    }
    getRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SCRET, { expiresIn: process.env.EXPIRE_REFRESH_TOKEN });
    }
    getRefTokenAndToken(payload) {
        const token = this.getToken(payload);
        const refreshToken = this.getRefreshToken(payload);
        return { refreshToken, token };
    }
    getHashString(password) {
        return bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
    }
    compareHashString(password, hashString) {
        return bcrypt.compare(password, hashString);
    }
}

export default new helper;
