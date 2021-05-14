import jwt from 'jsonwebtoken';

class handleToken {
    getToken(payload) {
        return jwt.sign(payload, process.env.TOKEN_SCRET, { expiresIn: process.env.EXPIRE_TOKEN });
    }
    getRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SCRET, { expiresIn: process.env.EXPIRE_REFRESH_TOKEN });
    }
}

export default new handleToken;
