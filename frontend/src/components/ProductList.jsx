// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/productService';
import "../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category.name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="productGrid">
      {Object.entries(groupedProducts).map(([categoryName, products]) => (
        <div key={categoryName} className="categorySection">
          <h2 className="categoryTitle">{categoryName}</h2>
          <div className="productsInCategory">
            {products.map(product => (
              <Link to={`/products/${product.id}`} key={product.id} className="productCard">
                <h3 className="productName">{product.name}</h3>
                <p className="productDescription">{product.description}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;