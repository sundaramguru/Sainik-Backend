import u_user_reg from "../models/UserModel.js";
import Admin from "../models/AdminModel.js";

import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await u_user_reg.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].Name;
            const service_no = user[0].Service_No;
            const email = user[0].Mail_Id;
            const accessToken = jwt.sign({userId, name,service_no, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}

export const adminRefreshToken = async(req, res) => {
    try {
        const adminRefreshToken = req.cookies.refreshToken;
        if(!adminRefreshToken) return res.sendStatus(401);
        const admin = await Admin.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!admin[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const service_no = user[0].service_no;
            const email = user[0].email;
            const accessToken = jwt.sign({userId, name,service_no, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}
