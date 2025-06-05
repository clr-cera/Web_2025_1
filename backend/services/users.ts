import { UserRepository } from '../repository/users';

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
}


export { UserService }
