import React, { useEffect, useState } from "react";
import "rc-slider/assets/index.css"; // Import stylów dla rc-slider
import Slider from "rc-slider";
import "../styles/Filter.css";

const Filters = ({ filters, setFilters, onSearch, category }) => {
  const [producers, setProducers] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 3000]); // Domyślny zakres cen

  useEffect(() => {
    // Funkcja do pobierania producentów na podstawie kategorii
    const fetchProducers = async () => {
      if (!category) {
        setProducers([]); // Jeśli kategoria nie jest ustawiona, wyczyść listę producentów
        return;
      }

      try {
        const response = await fetch(`/api/producers?category=${category}`);
        if (response.ok) {
          const data = await response.json();
          setProducers(data);
        } else {
          console.error("Failed to fetch producers:", response.status);
        }
      } catch (error) {
        console.error("Error fetching producers:", error);
      }
    };

    fetchProducers();
  }, [category]); // Uruchamiaj ponownie, gdy kategoria się zmieni

  // Aktualizacja filtra ceny
  const updatePriceRange = (newRange) => {
    setPriceRange(newRange);
    setFilters({ ...filters, minPrice: newRange[0], maxPrice: newRange[1] });
  };

  return (
    <div className="main-filters">
      <h2>Filtry</h2>
      <div className="main-filter-group">
        <label>Cena</label>
        <div className="main-price-slider">
          <Slider
            range
            min={0}
            max={3000}
            step={100}
            value={priceRange}
            onChange={updatePriceRange}
          />
          <div className="main-price-inputs">
            <div>
              <label>Min:</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => {
                  const newMin = Math.min(
                    parseInt(e.target.value, 10) || 0,
                    priceRange[1]
                  );
                  updatePriceRange([newMin, priceRange[1]]);
                }}
              />
            </div>
            <div>
              <label>Max:</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => {
                  const newMax = Math.max(
                    parseInt(e.target.value, 10) || 0,
                    priceRange[0]
                  );
                  updatePriceRange([priceRange[0], newMax]);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="main-filter-group">
        <label>Producent</label>
        <select
          value={filters.producer || ""}
          onChange={(e) =>
            setFilters({ ...filters, producer: e.target.value || null })
          }
        >
          <option value="">Dowolny</option>
          {producers.map((producer) => (
            <option key={producer} value={producer}>
              {producer}
            </option>
          ))}
        </select>
      </div>
      <div className="main-filter-group">
        <label>Dostępność</label>
        <select
          value={filters.availability || ""}
          onChange={(e) =>
            setFilters({ ...filters, availability: e.target.value || null })
          }
        >
          <option value="">Dowolna</option>
          <option value="1">Dostępny</option> {/* 1 oznacza dostępny */}
          <option value="0">Niedostępny</option> {/* 0 oznacza niedostępny */}
        </select>
      </div>
      <div className="main-filter-group">
        <label>Szukaj po nazwie</label>
        <input
          type="text"
          placeholder="Wpisz nazwę produktu"
          value={filters.name || ""}
          onChange={(e) =>
            setFilters({ ...filters, name: e.target.value })
          }
        />
      </div>

      <button onClick={onSearch}>Szukaj</button>
    </div>
  );
};

export default Filters;
