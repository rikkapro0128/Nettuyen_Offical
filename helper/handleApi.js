import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class helper {
    getToken(payload) {
        return `Miru ${jwt.sign(payload, process.env.TOKEN_SCRET, { expiresIn: process.env.EXPIRE_TOKEN })}`;
    }
    getRefreshToken(payload) {
        return `Miru ${jwt.sign(payload, process.env.REFRESH_TOKEN_SCRET, { expiresIn: process.env.EXPIRE_REFRESH_TOKEN })}`;
    }
    tokenExpire(code, scret) {
        let state = false;
        let payload;
        const token = code ? code.split(' ')[1] : null;
        jwt.verify(token, scret, function(err, decode) {
            if(!err) {
                state = true;
                payload = decode;
            }
            //console.log({err: err ? err.message : err, decode});
        });
        return { state, payload };
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
