import {TokenService} from './token.middleware';
import { TokenContainer } from '../config/inversify.config';
import { TYPES } from '../config/type';
import { jwtService } from "./jwt";

export class AuthenToken{
    public checkAuthToken = async (req, res, next) => {
        //Get token in header
        let token = req.headers['x-access-token'] || req.headers['authorization'];

        if (token) {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
            let jwt = new TokenService()
            var check = jwt.verifyToken(token);
            req.decoded = check;
            next();
        }
        else {
            return res.status(401).json({ message: 'error' });
        }

        //Test code
        // let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk1MzNlOGI1M2FkYjBkN2M1ZWQ3YmIiLCJpc1VzZXIiOnsibG9jYWwiOnsiZW1haWwiOiJzYW5nMTIzQGdtYWlsLmNvbSIsInNhbHQiOiI3MjA5MTUwMzg0ODciLCJoYXNoX3Bhc3N3b3JkIjoiODg3NmQ5ZmE4ZWI1YWUzZDdiOGM3MGQ1OGMzNGMxMDI4YWQyZTk2YSJ9LCJfaWQiOiI1ZTk1MzNlOGI1M2FkYjBkN2M1ZWQ3YmIiLCJfX3YiOjB9LCJpYXQiOjE1ODY4MzY0NjMsImV4cCI6MTU4Njg0MDA2M30.B9rZNT0nvWMiVTWfhejp9zssfHAYOpZtu-dEDZuGj4dgVA08oxC1Flw-tvjLXr2v4I0zGfjlSOvrxc80uP5hbA";
        // let jwt = new TokenService()
        // var check = jwt.verifyToken(token);
        // req.decoded = check;
        // next();
    }

    public callback = (req, res, next) => {
        const token = TokenContainer.get<jwtService>(TYPES.jwtService).signToken({ _id: req.user._id, isUser: true});
        console.log(token);
        return res.json({
            message: "Đăng nhập thành công !",
            data: {
                token: token,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
            },
            success: true
        });

    }
}