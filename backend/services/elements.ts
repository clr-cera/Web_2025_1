import { ElementRepository } from "../repository/elements.ts";

// Class to handle business logic related to elements
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
  static async getElementById(id: string) {
    return await ElementRepository.getElementById(id);
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
  // Purchase Element logic
  // If the stock is greater than the requested amount, update the stock
  static async patchElementStock(id: string, updatedStock: number) {
    const element = await ElementRepository.getElementById(id);
    if (!element) {
      throw new Error("Element not found");
    }
    if (updatedStock > element.stock) {
      throw new Error("Insufficient stock");
    }

    return await ElementRepository.updateElementStock(id, updatedStock);
  }
}

export { ElementService };
