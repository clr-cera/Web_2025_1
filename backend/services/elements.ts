import { ElementRepository } from "../repository/elements";

class ElementService {
  static async getAllElements() {
    return await ElementRepository.getAllElements();
  }
  static async getElementsByCategory(category: string) {
    return await ElementRepository.getElementsByCategory(category);
  }
  static async getElementByName(name: string) {
    return await ElementRepository.getElementByName(name);
  }
  static async createElement(elementData: any) {
    return await ElementRepository.createElement(elementData);
  }
  static async updateElementById(id: string, updateData: any) {
    return await ElementRepository.updateElementById(id, updateData);
  }
  static async deleteElementById(id: string) {
    return await ElementRepository.deleteElementById(id);
  }
}

export { ElementService };
