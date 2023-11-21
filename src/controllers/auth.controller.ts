import { Request, Response } from 'express';
import loginServices from '../services/auth.services';

async function handleAuthentication(req:Request, res:Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }

  const token = await loginServices.authenticateUser({ username, password });

  if (!token) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }

  return res.status(200).json({ token });
}

export default {
  handleAuthentication,
};