import { UserRepository } from '../repository/users.ts';
import { VerifyPassword } from '../repository/hash.ts';
import { createJwtToken } from '../repository/jwt.ts'

// Class to handle business logic related to users
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
    try {
      return await UserRepository.CreateUser(userData);
    } catch (error) {
      return null; // User already exists
    }
  }
  static async deleteUserByEmail(email: string) {
    return await UserRepository.DeleteUserByEmail(email)
  }
  static async updateUserByEmail(email: string, updateData: any) {
    try {
      return await UserRepository.UpdateUserByEmail(email, updateData);
    } catch (error) {
      return null; // Email already exists in database
    }
  }

  // Creates JWT token for the user after verifying email and password
  static async loginUser(email: string, password: string) {
    const user = await UserRepository.GetUserByEmailWithPassword(email);
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

  // Checks if the user is an admin or super admin
  static async isAdmin(email: string) {
    const user = await UserRepository.GetUserByEmail(email);
    if (!user) {
      return false;
    }
    return user.role == "Admin" || user.role == "Super Admin";
  }

  // Checks if the user is a super admin
  static async isSuperAdmin(email: string) {
    const user = await UserRepository.GetUserByEmail(email);
    if (!user) {
      return false;
    }
    return user.role == "Super Admin";
  }
}


export { UserService }
