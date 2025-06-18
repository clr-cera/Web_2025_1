import { User } from '../model/db.ts';
import { HashPassword } from './hash.ts';


// Class to handle database CRUD operations related to users
class UserRepository {
  static async GetAllUsers() {
    return await User.find().select('-password'); // Exclude password from the result
  }
  static async GetAdminUsers() {
    return await User.find({
      $or: [
        { 'role': 'Admin' },
        { 'role': 'Super Admin' },
      ]
    }).select('-password'); // Exclude password from the result
  }
  static async GetUserByEmail(email: string) {
    return await User.findOne({ email: email }).select('-password'); // Exclude password from the result
  }

  static async GetUserByEmailWithPassword(email: string) {
    return await User.findOne({ email: email })
  }

  static async DeleteUserByEmail(email: string) {
    return await User.deleteOne({ email: email })
  }

  static async UpdateUserByEmail(email: string, updateData: any) {
    if (updateData.password) {
      updateData.password = HashPassword(updateData.password);
    }
    return await User.updateOne({ email: email }, updateData)
  }
  static async CreateUser(userData: any) {
    userData.password = HashPassword(userData.password);
    const user = await User.create(userData)
    user.password = ""; // Exclude password from the returned user object
    return user
  }
}
export { UserRepository }
