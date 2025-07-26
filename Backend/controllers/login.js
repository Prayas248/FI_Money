import User from '../models/User.js';

import * as Auth from '../lib/auth.js';
import { validationResult } from 'express-validator';



const loginController = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }



    const { username, password } = req.body;
    const userRecord = await User.findOne({ username: username }).select('+password');

if (!userRecord) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    
    
    
    const passwordIsValid = await Auth.comparePassword(password, userRecord.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = Auth.generateAuthToken(userRecord.id);
    const responsePayload = {
        access_token: token,
    };

    return res.status(200).json(responsePayload);
};

export default loginController;