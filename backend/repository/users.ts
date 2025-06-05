import { User } from '../model/db.ts';
import { HashPassword } from './hash.ts';

class UserRepository {
  static async GetAllUsers() {
    return await User.find();
  }
  static async GetAdminUsers() {
    return await User.find({
      $or: [
        { 'role': 'Admin' },
        { 'role': 'Super Admin' },
      ]
    });
  }
  static async GetUserByEmail(email: string) {
    return await User.findOne({ email: email });
  }

  static async DeleteUserByEmail(email: string) {
    return await User.deleteOne({ email: email })
  }

  static async UpdateUserByEmail(email: string, updateData: any) {
    updateData.password = HashPassword(updateData.password);
    return await User.updateOne({ email: email }, updateData)
  }
  static async CreateUser(userData: any) {
    userData.password = HashPassword(userData.password);
    return await User.create(userData)
  }
}
export { UserRepository }
