import { CartItem } from "@/context/CartContext";

export const finalizePurchaseService = async (cartItems: CartItem[]) => {
  for (const item of cartItems) {
    const updatedStock = item.stock - item.quantity;

    if (updatedStock < 0) {
      throw new Error(`Insufficient stock for ${item.name}`);
    }

    // Atualiza o estoque no backend (JSON Server)
    await fetch(`http://localhost:3001/elements/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") || "",
      },
      body: JSON.stringify({ stock: updatedStock }),
    });
  }
};
