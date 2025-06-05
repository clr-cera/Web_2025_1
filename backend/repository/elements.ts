import { Element } from '../model/db.ts';

class ElementRepository {
  static async getAllElements() {
    return await Element.find()
  }
  static async getElementsByCategory(category: string) {
    return await Element.find({ category: category })
  }
  static async getElementByName(name: string) {
    return await Element.findOne({ name: name })
  }
  static async createElement(elementData: any) {
    return await Element.create(elementData)
  }
  static async updateElementById(id: string, updateData: any) {
    return await Element.updateOne({ _id: id }, updateData)
  }
  static async deleteElementById(id: string) {
    return await Element.deleteOne({ _id: id })
  }
}

export { ElementRepository };
