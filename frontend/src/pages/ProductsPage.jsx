import React, { useState, useEffect } from "react";
import Products from "../components/Products";
import { getCategories } from "../api/categoryService";
import Filters from "../components/Filters";
import "../styles/ProductsPage.css";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    producer: null,
    availability: null,
    name: null
  });
  const [appliedFilters, setAppliedFilters] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0].id); // Default category
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setFilters({
      minPrice: null,
      maxPrice: null,
      producer: null,
      availability: null,
      name: null
    });
    setAppliedFilters(null);
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  return (
    <div className="main-products-page">
      <header className="main-products-page-header">
        <h1>Wybierz produkty dla siebie!</h1>
      </header>

      <div className="main-category-selector">
        <h2>Wybierz kategorię:</h2>
        <select
          value={selectedCategory || ""}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>


      <div className="main-products-page-content">
        <aside className="main-filters-sidebar">
          <Filters
            filters={filters}
            setFilters={setFilters}
            onSearch={applyFilters}
            category={selectedCategory}
          />
        </aside>
        <main className="main-products-list">
          {selectedCategory ? (
            <Products categoryId={selectedCategory} filters={appliedFilters} />
          ) : (
            <p className="main-select-category-message">
              Wybierz kategorię, aby zobaczyć produkty.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
