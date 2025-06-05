import { UserRepository } from '../repository/users.ts';
import { VerifyPassword } from '../repository/hash.ts';
import { createJwtToken } from '../repository/jwt.ts'
class UserService {
  static async getUsers() {
    return await UserRepository.GetAllUsers()
  }
  static async getAdmins() {
    return await UserRepository.GetAdminUsers()
  }
  static async getUserByEmail(email: string) {
    return await UserRepository.GetUserByEmail(email)
  }
  static async createUser(userData: any) {
    return await UserRepository.CreateUser(userData);
  }
  static async deleteUserByEmail(email: string) {
    return await UserRepository.DeleteUserByEmail(email)
  }
  static async updateUserByEmail(email: string, updateData: any) {
    return await UserRepository.UpdateUserByEmail(email, updateData);
  }
  static async loginUser(email: string, password: string) {
    const user = await UserRepository.GetUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    if (!VerifyPassword(password, user.password)) {
      return null;
    }
    else {
      const token = createJwtToken(email);
      return token;
    }
  }

  static async isAdmin(email: string) {
    const user = await UserRepository.GetUserByEmail(email);
    if (!user) {
      return false;
    }
    return user.role == "Admin" || user.role == "Super Admin";
  }
  static async isSuperAdmin(email: string) {
    const user = await UserRepository.GetUserByEmail(email);
    if (!user) {
      return false;
    }
    return user.role == "Super Admin";
  }
}


export { UserService }
