import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Account, Storys, Chapter,} from '../models/account.js';

class helperApi {
    getToken(payload) {
        return `Miru ${jwt.sign(payload, process.env.TOKEN_SCRET, { expiresIn: process.env.EXPIRE_TOKEN })}`;
    }
    getRefreshToken(payload) {
        return `Miru ${jwt.sign(payload, process.env.REFRESH_TOKEN_SCRET, { expiresIn: process.env.EXPIRE_REFRESH_TOKEN })}`;
    }
    tokenExpire(code, scret) {
        let state = false;
        let payload = {};
        const token = code ? code.split(' ')[1] : null;
        jwt.verify(token, scret, async function(err, decode) {
            if(!err) {
                try {
                    state = true;
                    payload = decode;
                    const { info } = await Account.findById(decode._id, 'info').exec();
                    payload['avatarPath'] = info.avatarPath;
                } catch (error) {
                    console.log(error)
                }
            }
            //console.log({err: err ? err.message : err, decode});
        });
        return { state, payload, token };
    }
    getInfo(code) {
        let payload = {};
        let isErr = true;
        const token = code ? code.split(' ')[1] : null;
        jwt.verify(token, process.env.TOKEN_SCRET, function(err, decode) {
            if(!err) {
                isErr = false;
                payload = decode;
            }
            //console.log({err: err ? err.message : err, decode});
        });
        return isErr ? new Error('Dont throw data from token!') : payload;
    }
    getInfoAccount(_id) {
        return new Promise(async (res, rej) => {
            const data = await Account.findById(_id).exec();
            res(data.info);
            if(!data) {
                rej(null);
            }
        })
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

export default new helperApi;
