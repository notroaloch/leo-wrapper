import bcrypt from 'bcrypt';
import { PASSWORD_HASH_SALT_ROUNDS } from './index';

// Hashes plain text password to Bcrypt hash 10 rounds salt
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = PASSWORD_HASH_SALT_ROUNDS;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};
