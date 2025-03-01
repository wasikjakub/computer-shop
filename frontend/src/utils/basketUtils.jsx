import { toast } from "react-toastify";
import { addItemToBasket } from "../api/basketService";

export const handleAddToBasket = async (productId, quantity, navigate) => {
  try {
    await addItemToBasket(productId, quantity);
    toast.success("Produkt dodany do koszyka!");
  } catch (error) {
    if (error.response?.status === 401) {
      toast.error("Musisz być zalogowany, aby dodać produkt do koszyka.");
      navigate("/login");
    } else {
      console.error("Error adding product to basket:", error);
      toast.error("Dodanie produktu nie powiodło się.");
    }
  }
};
