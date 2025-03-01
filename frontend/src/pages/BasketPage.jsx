import React, { useState, useEffect, useContext } from "react";
import { getBasket, removeItemFromBasket, clearBasket, createOrder } from "../api/basketService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure CSS is included
import { AuthContext } from "../AuthContext";
import "../styles/BasketPage.css"; // Adjust the path if needed

const BasketPage = () => {
    const { isAuthorized } = useContext(AuthContext);
    const [basket, setBasket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [removeQuantities, setRemoveQuantities] = useState({}); // Track quantities to remove

    const fetchBasket = async () => {
        setLoading(true);
        try {
            const data = await getBasket();
            console.log(data);
            const basket = data.length > 0 ? data[0] : null;
            setBasket({ ...basket, items: basket?.items || [] });
        } catch (error) {
            console.error("Error fetching basket:", error);
            toast.error("Pobranie koszyka się nie powiodło.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async (itemId) => {
        const quantity = removeQuantities[itemId] || 1; // Default to 1 if no quantity selected
        if (!basket) return;
        try {
            await removeItemFromBasket(itemId, quantity);
            fetchBasket();
            toast.success("Produkt usunięty z koszyka!");
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Usunięcie produktu nie powiodło.");
        }
    };

    const handleQuantityChange = (itemId, quantity) => {
        setRemoveQuantities((prev) => ({
            ...prev,
            [itemId]: quantity,
        }));
    };

    const handleClearBasket = async () => {
        if (!basket) return;
        try {
            await clearBasket(basket.id);
            fetchBasket();
            toast.success("Koszyk opróżniony!");
        } catch (error) {
            console.error("Error clearing basket:", error);
            toast.error("Opróżnienie koszyka nie powiodło się.");
        }
    };

    const handleCreateOrder = async () => {
        try {
            const response = await createOrder();
            console.log("Order created:", response);
            if (response && response.message) {
                toast.success("Zamówienie zostało pomyślnie złożone!");
            }
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error("Error creating order:", error);
            toast.error("Utworzenie zamówienia nie powiodło się.");
        }
    };

    useEffect(() => {
        if (isAuthorized) fetchBasket();
    }, [isAuthorized]);

    if (!isAuthorized) return <p>Zaloguj się, żeby zobaczyć swój koszyk.</p>;
    if (loading) return <p>Ładowanie koszyka...</p>;
    if (!basket) return <p>Nie znaleziono koszyka.</p>;

    return (
        <div className="basket-page">
            <h1>Twój koszyk</h1>
            {basket.items && basket.items.length > 0 ? (
                <ul className="basket-items-list">
                    {basket.items.map((item) => (
                        <li key={item.id} className="basket-item">
                            <span>{item.product_name} - {item.quantity} x {item.product_price} PLN</span>
                            <div className="basket-item-options">
                                <select
                                    className="basket-item-select"
                                    value={removeQuantities[item.id] || 1}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                >
                                    {Array.from({ length: item.quantity }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className="basket-item-button"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    Usuń
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Twój koszyk jest pusty.</p>
            )}
            {basket.items && basket.items.length > 0 && (
                <>
                    <h2 className="basket-summary-title">Łączna cena: {basket.total_cost} PLN</h2>
                    <button className="basket-summary-button" onClick={handleClearBasket}>
                        Opróżnij koszyk
                    </button>
                    <button className="basket-summary-button" onClick={handleCreateOrder}>
                        Złóż zamówienie
                    </button>
                </>
            )}
        </div>
    );
};

export default BasketPage;