import * as KJUR from 'jsrsasign';
import {decode, encode} from 'base-64'

class Kjur {
    constructor() {
        this.sHead = {
            alg: 'RS256'
        };
        this.keyPair = KJUR.KEYUTIL.generateKeypair('RSA', 1024);
    }

    encode(params) {
        let encode = null;
        try {
            encode = KJUR.jws.JWS.sign(this.sHead.alg, this.sHead, params, this.keyPair.prvKeyObj);
        } catch (ex) {
            console.log('Error: ' + ex);
            return {error: true};
        }
        return encode;
    }
    decode(token) {
        if(!token) {
            return {}
        }
        let decoded = null;
        let payload = null;
        try {
            payload  = token.split('.')[1];
            // decoded = JSON.parse(window.atob(payload));
            decoded = JSON.parse(decode(payload))
        } catch (ex) {
            console.log('Error: ' + ex);
            return {error: true};
        }
        return decoded;
    }
}
export default new Kjur();