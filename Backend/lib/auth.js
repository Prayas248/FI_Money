import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'hehee2131231';
const SALT_WORK_FACTOR = 10;


export function comparePassword(plaintextPassword, hash) {
  return bcrypt.compare(plaintextPassword, hash);
}
export function createPasswordHash(password) {
  return bcrypt.hash(password, SALT_WORK_FACTOR);
}



export function generateAuthToken(userId) {
  const payload = { sub: userId };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, JWT_SECRET, options);
}



export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7); 
  }

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.sub;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}