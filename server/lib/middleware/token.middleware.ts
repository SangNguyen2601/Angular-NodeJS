import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as path from 'path'
import { injectable } from 'inversify';
import { jwtService } from './jwt';
import 'reflect-metadata';

// use 'utf8' to get string instead of byte array  (512 bit key)
const privateKEY  = fs.readFileSync(path.resolve('lib/config/private.key'), 'utf8');
const publicKEY  = fs.readFileSync(path.resolve('lib/config/publish.key'), 'utf8');

@injectable()
export class TokenService implements jwtService{

    public signToken (payload){
        // Token signing options
        var signOptions = {
            expiresIn:  "1h",    // 1 hour validity
            algorithm:  "RS256"    
        };
        return jwt.sign(payload, privateKEY, signOptions);
    }
    public verifyToken(token){
        var verifyOptions = {
            expiresIn:  "1h",
            algorithm:  ["RS256"]
        };
        try{
            return jwt.verify(token, publicKEY, verifyOptions);
        }catch (err){
            return "false";
        }
    }
    public decode(token){
        return jwt.decode(token, {complete: true});
        //returns null if token is invalid
    }
}

