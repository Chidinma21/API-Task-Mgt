import jwt from 'jsonwebtoken';
import config from '../config';

export const signJwt = async (userId: string, email: string) => {
  try {
    const token = jwt.sign({ userId, email }, config.jwtSecKey, {
      expiresIn: config.jwtExpiry + 's'
    });
    return token;
  } catch (err: any) {
    throw new Error(`Error signing JWT: ${err.message}`);
  }
};
