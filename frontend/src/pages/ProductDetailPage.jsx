import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/productService';
import { handleAddToBasket } from "../utils/basketUtils";
import "../styles/ProductDetailPage.css";

const ATTRIBUTE_MAPPING = {
  cpu: "Procesor",
  ram: "Pamięć RAM",
  storage: "Dysk Twardy",
  gpu: "Karta Graficzna",
  screen_size: "Rozmiar Ekranu",
  battery: "Bateria",
  core_count: "Ilość rdzeni",
  clock_speed: "Taktowanie",
  power_draw: "Pobór prądu",
  integrated: "Zintegrowana",
  type: "Typ",
  color: "Kolor",
  psu: "Zasilacz",
  side_panel: "Panel boczny",
  external_volume: "Objętość zewnętrzna",
  mb_type: "Typ płyty głównej",
}; // should be in a common file


const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Ilość produktu

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    handleAddToBasket(product.id, quantity, navigate); // Wywołaj funkcję z utils
  };

  const renderAttributes = () => {
    if (!product?.attributes || Object.keys(product.attributes).length === 0) {
      return <p>Brak dodatkowych informacji o produkcie.</p>;
    }

    const attributes = JSON.parse(product.attributes); // Parsowanie JSON-a

    return (
      <div className="main-productAttributes">
        {Object.keys(attributes).map((attr) => (
          <p key={attr} className="main-product-attribute">
            <strong>{ATTRIBUTE_MAPPING[attr] || attr}:</strong> {attributes[attr] || "-"}
          </p>
        ))}
      </div>
    );
  };

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="main-productDetailContainer">
  <div className="main-productImage">
    <img
      src="/images/msi-rtg.jpg"
      alt={product.name}
      className="main-productImagePlaceholder"
    />
  </div>
  <div className="main-productDetails">
    <h1 className="main-productTitle">{product.name}</h1>
    
    {/* Category and Producer */}
    <p><strong>Kategoria:</strong> {product.category?.name}</p>
    <p><strong>Producent:</strong> {product.producer}</p>
    
    <div>
      <h3>Specyfikacja:</h3>
      {renderAttributes()}
    </div>
  </div>

  {/* Right Side: Price, Availability, and Cart Actions */}
  <div className="main-cartActionsContainer">
  {/* Cena */}
  <p className="main-price">Cena: {product.price} $</p>

  {/* Ilość */}
  <input
    type="number"
    min="1"
    max={product.availability}
    value={quantity}
    onChange={(e) =>
      setQuantity(Math.max(1, Math.min(product.availability, +e.target.value)))
    }
    className="main-quantityInput"
  />

  {/* Dostępność */}
  <p className="main-availability">
    Dostępność: {product.availability > 0 ? "W magazynie" : "Brak na stanie"}
  </p>

  {/* Przycisk dodania do koszyka */}
  <button
    className="main-addToCartButton"
    onClick={handleAddToCart}
    disabled={product.availability <= 0}
  >
    Dodaj do koszyka
  </button>
</div>

</div>


  );
};

export default ProductDetailPage;
