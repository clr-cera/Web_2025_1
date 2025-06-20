import { CartItem } from "@/context/CartContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const finalizePurchaseService = async (cartItems: CartItem[]) => {
  for (const item of cartItems) {
    const updatedStock = item.stock - item.quantity;

    if (updatedStock < 0) {
      throw new Error(`Insufficient stock for ${item.name}`);
    }

    // Atualiza o estoque no backend
    await fetch(API_BASE_URL + `/elements/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") || "",
      },
      body: JSON.stringify({ stock: updatedStock }),
    });
  }
};
