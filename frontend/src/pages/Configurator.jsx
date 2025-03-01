import React, { useState, useEffect } from 'react';
import Products from "../components/Products";
import { getCategories } from "../api/categoryService";
import { getProductById } from '../api/productService';
import { toast } from "react-toastify";
import { getBasket, removeItemFromBasket } from "../api/basketService"; // Import basket functions
import Filters from "../components/Filters";
import { useNavigate } from 'react-router-dom';
import '../styles/Configurator.css';

const Configurator = () => {
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [filters, setFilters] = useState({});
  const [basket, setBasket] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [summary, setSummary] = useState({
    price: 0,
    compatibility: 'bezproblemowo',
    powerConsumption: 0,
  });

  const navigate = useNavigate();
  const obligatoryCategories = ["Processors", "Motherboard", "Memory", "GPU", "Case", "Internal Hard Drive", "Power Supply"];

  const handleBasketButton = () => 
  {
    navigate('/basket')
  }

  useEffect(() => {
    fetchBasket();
  }, [basket]);

  useEffect(() => {
    // Fetch categories dynamically
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories(); // Assuming this function fetches categories
      setCategories(fetchedCategories)
      setSelectedCategory(fetchedCategories[0].id);
    };
    fetchCategories();
  }, []);

  const getProductData = async (productId) => {
    try {
      const productData = await getProductById(productId);
      return productData;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return null; // or handle the error as needed
    }
  };
  
  const calculateSummary = (basketItems) => {
    let totalPrice = 0;
    let totalPowerConsumption = 0;
    let compatibility = 'bezproblemowo'; // Default compatibility
    
    if (basketItems?.length > 0) {
      const productPromises = basketItems.map((item) => {
        // Update total price
        totalPrice += item.product_price * item.quantity;
    
        const productId = item.product;
    
        return getProductData(productId)
          .then((productData) => {
            if (productData) {
              let attributes = {};
              try {
                attributes = typeof productData.attributes === 'string' ? JSON.parse(productData.attributes) : productData.attributes;
    
                if (['GPU', 'Processors'].includes(productData.category.name) && attributes?.tdp) {
                  totalPowerConsumption += attributes.tdp * item.quantity * 1.3;
                }

                if (['Power Supply'].includes(productData.category.name) && attributes?.wattage < totalPowerConsumption)
                  {
                    compatibility = "zbyt mała moc zasilacza";
                  }
              } catch (error) {
                console.error('Error parsing attributes for product', productData.name, error);
              }
            }
    
            // Check compatibility (example logic, adjust as needed)
            if (item.is_compatible) {
              compatibility = 'problemy z kompatybilnością'; // Compatibility issues
            }
          })
          .catch((error) => {
            console.error('Error fetching product data for', item.product, error);
          });
      });
      
      // Wait for all promises to resolve
      Promise.all(productPromises).then(() => {
        // Format total price to two decimal places
        totalPrice = parseFloat(totalPrice.toFixed(2));
  
        // Return the updated summary
        setSummary({
          price: totalPrice,
          powerConsumption: totalPowerConsumption,
          compatibility,
        });
      });
    }
  };
  
  // UseEffect to update summary whenever basket changes
  useEffect(() => {
    if (basket?.items) {
      calculateSummary(basket.items);
    }
  }, [basket]);

  const fetchBasket = async () => {
    try {
      const data = await getBasket();
      const basket = data.length > 0 ? data[0] : null;
      setBasket(basket);
    } catch (error) {
      console.error("Error fetching basket:", error);
      toast.error("Nie udało się pobrać koszyka.");
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeItemFromBasket(itemId, 1); // Assuming quantity = 1 for simplicity
      fetchBasket();
      toast.success("Produkt usunięty z koszyka!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Nie udało się usunąć produktu z koszyka.");
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setFilters({
      minPrice: null,
      maxPrice: null,
      producer: null,
      availability: null,
      name: null,
    });
    setAppliedFilters(null);
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const obligatory = categories?.filter((cat) =>
    obligatoryCategories.includes(cat.name)
  ) || [];
  const optional = categories?.filter(
    (cat) => !obligatoryCategories.includes(cat.name)
  ) || [];

  return (
    <div className="configurator-container">
      {/* Section: Selected Items */}
      <h3>Wybrane elementy zestawu</h3>
      <div className="selected-items">
        {/* Render Basket Items */}
        {basket?.items?.length > 0 ? (
          basket.items.map((item) => (
            <div key={item.id} className="selected-item">
              <div className="item-details">
                <strong>{item.product_name}</strong>
                <span> x{item.quantity} - {item.product_price} $</span>
              </div>
              <div className="item-actions">
                <button onClick={() => handleRemoveItem(item.id)}>Usuń</button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-message">Twój koszyk jest pusty.</p>
        )}
      </div>

      {/* Sekcja konfiguratora */}
      <div className="configurator">
        <h3>Wybierz wymagane elementy zestawu komputerowego</h3>
        <div className="required-elements">
          {obligatory.map((category) => (
            <button
              key={category.id}
              className="required-button"
              onClick={() => handleCategoryChange(category.id)}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <h3>Wybierz opcjonalne elementy zestawu komputerowego</h3>
        <div className="optional-elements">
        {optional.map((category) => (
          <button
            key={category.id}
            className="optional-button"
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      </div>

      {/* Sekcja podsumowania */}
      <div className="summary">
        <div className="summary-details">
          <p><strong>Podsumowanie ceny:</strong> {summary.price} $</p>
          <p><strong>Kompatybilność:</strong> {summary.compatibility}</p>
          <p><strong>Przewidywany pobór:</strong> {summary.powerConsumption} W</p>
        </div>
        <button className="cart-button" onClick={handleBasketButton}>
          <span>🛒 Przejdź do koszyka</span>
        </button>
      </div>
      <div className="products-page">
      <div className="products-page-content">
        <aside className="filters-sidebar">
          <Filters
            filters={filters}
            setFilters={setFilters}
            onSearch={applyFilters}
            category={selectedCategory}
          />
        </aside>
        <main className="products-list">
          {selectedCategory ? (
            <Products categoryId={selectedCategory} filters={appliedFilters}  onBasketUpdate={fetchBasket}/>
          ) : (
            <p className="select-category-message">
              Wybierz kategorię, aby zobaczyć produkty.
            </p>
          )}
        </main>
      </div>
    </div>
    </div>
  );
};

export default Configurator;