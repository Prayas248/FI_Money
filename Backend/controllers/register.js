import { validationResult } from 'express-validator';

import User from '../models/User.js';
import * as Auth from '../lib/auth.js';

const registerUserHandler = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
        const { username, password, ...details } = req.body;

        const hashedPassword = await Auth.hashPw(password);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            ...details,
        });

        const responsePayload = {
            message: 'User registration successful.',
            userId: newUser.id,
        };

        return res.status(201).json(responsePayload);

    } catch (error) {
       
        if (error.code === 11000) {
            return res.status(409).json({ 
                message: `The username '${req.body.username}' is already taken.` 
            });
        }
        
        return res.status(500).json({ 
            message: 'An error occurred during the registration process.' 
        });
    }
};

export default registerUserHandler;