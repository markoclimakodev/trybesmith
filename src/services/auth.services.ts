import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Auth } from '../types/Auth';
import generateToken from '../utils/generateToken';

type LoginResponse = string | null;

async function authenticateUser(login: Auth): Promise<LoginResponse> {
  const user = await UserModel.findOne({ where: { username: login.username } });

  if (!user || !bcrypt.compareSync(login.password, user.dataValues.password)) return null;

  const { id, username } = user.dataValues;
  const token = generateToken.generateJwtToken({ id, username });

  return token;
}

export default {
  authenticateUser,
};
