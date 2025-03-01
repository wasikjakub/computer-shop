import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productService";
import { handleAddToBasket } from "../utils/basketUtils";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Products.css";

const ATTRIBUTE_MAPPING = {
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
};

const Products = ({ categoryId, filters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [previousPage, setPreviousPage] = useState(false);
  const [selectedQuantities, setSelectedQuantities] = useState({}); // Track selected quantities
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsData = await getProducts(
          categoryId,
          filters?.minPrice || null,
          filters?.maxPrice || null,
          filters?.producer || null,
          filters?.availability || null,
          filters?.name || null,
          currentPage
        );
        setProducts(productsData.results || productsData);
        setNextPage(productsData.next !== null);
        setPreviousPage(productsData.previous !== null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
      setLoading(false);
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId, filters, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  const goToNextPage = () => {
    if (nextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (previousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const navigateToProduct = (productId) => {
    navigate(`/products/${productId}`); // Przejście na stronę produktu
  };

  const renderProductCard = (product) => {
    const attributes = JSON.parse(product.attributes);

    return (
      <div 
        key={product.id} 
        className="main-product-card"
        onClick={() => navigateToProduct(product.id)}>
        <div className="main-product-image">
          <img
            src="../../images/msi-rtg.jpg"
            alt={product.name}
            className="main-product-placeholder"
          />
        </div>
        <div className="main-product-details">
          <h3 className="main-product-name">{product.name || "-"}</h3>
          <p className="main-product-producer">
            <strong>Producent:</strong> {product.producer || "-"}
          </p>
          {Object.keys(attributes).map((attr) => (
            <p key={attr} className="main-product-attribute">
              <strong>{ATTRIBUTE_MAPPING[attr] || attr}:</strong> {attributes[attr] || "-"}
            </p>
          ))}
        </div>
        <div className="main-product-actions">
  <p className="main-product-price">
    {product.price ? `${product.price} $` : "-"}
  </p>
  <div className="main-product-buttons">
    <select
      className="main-quantity-select"
      value={selectedQuantities[product.id] || 1}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
    >
      {[...Array(10).keys()].map((num) => (
        <option key={num + 1} value={num + 1}>
          {num + 1}
        </option>
      ))}
    </select>
    <button
      className="main-add-button"
      onClick={(e) => {
        e.stopPropagation();
        const quantity = selectedQuantities[product.id] || 1;
        handleAddToBasket(product.id, quantity, navigate);
      }}
    >
      Dodaj
    </button>
  </div>
</div>

      </div>
    );
  };

  return (
    <div className="main-products-page">
      {loading && <p>Ładowanie produktów...</p>}
      {!loading && products.length > 0 && (
        <div className="main-products-list">
          {products.map((product) => renderProductCard(product))}
          <div className="main-pagination">
            <button
              onClick={goToPreviousPage}
              className="main-nav-button"
              disabled={!previousPage}
            >
              Poprzednia
            </button>
            <button
              onClick={goToNextPage}
              className="main-nav-button"
              disabled={!nextPage}
            >
              Następna
            </button>
          </div>
        </div>
      )}
      {!loading && products.length === 0 && (
        <p>Brak produktów w tej kategorii.</p>
      )}
    </div>
  );
};

export default Products;
