import React, { useState, useEffect } from 'react';
import { getProductById } from '../api/productService';
import { useNavigate, Link  } from 'react-router-dom';
import { handleAddToBasket } from "../utils/basketUtils";
import '../styles/Guide.css';

const computer_sets = [
  {
    ids: [29981, 39815, 36043, 32214, 28862, 41484],
    description: "Najtańsza jednostka do grania w gry komputerowe bazująca na 6 rdzeniowym i 12 wątkowym procesorze i zintegrowanym układzie graficznym Vega. Polecana dla osób o skromnym budżecie na zakup PC. Komputer jest dedykowany graczom mniej wymagających tytułów, takich jak Fortnite, CS:GO czy World of Tanks.",
    name: "AMD budżetowa opcja dla graczy",
    image: "images/guide-1.jpg",
  },
  {
    ids: [29976, 39815, 35197, 42717, 28851, 41485, 32213, 30862],
    description: "Kolejna aktualizacja w polecanych znacząco zmienia wygląd poprzednio oglądanego zestawu. Zmienił się nie tylko procesor, ale również karta graficzna jak i zasilacz. Przesiadka z Ryzena 5 5600X na Ryzen 7 5700X zapewni Wam kilka ekstra procent do osiągów w grach i nawet kilkadziesiąt w programach użytkowych.",
    name: "AMD średniopółkowy dla graczy",
    image: "images/guide-2.png",
  },
  {
    ids: [29961, 39817, 35400, 42621, 28866, 41536, 31157, 32657],
    description: "Propozycja zestawu komputerowego łącząca najwydajniejszy, gamingowy procesor z najwydajniejszą desktopową kartą graficzną. Konfiguracja polecana jest zarówno do gier e-sportowych pod monitory o wysokiej częstotliwość odświeżania matrycy jak i do grania w produkcje AAA pod rozdzielczością 3840×2160 pikseli.",
    name: "AMD najmocniejsza pozycja dla gracza",
    image: "images/guide-3.jpg",
  },
  {
    ids: [29973, 42744, 39856, 35174, 32156, 28898, 41775],
    description: "Zestaw komputerowy składający się z wydajnych komponentów, idealny do gier i pracy z wymagającymi aplikacjami. Ten zestaw zapewnia świetną równowagę między ceną a wydajnością, oferując sprzęt gotowy do intensywnego użytkowania w grach i aplikacjach multimedialnych.",
    name: "Intel średniopółkowy do codziennego używania",
    image: "images/guide-4.jpg",
  },
  {
    ids: [30079, 42920, 29030, 35302, 41484, 32346],
    description: "Zestaw komputerowy, który oferuje solidną wydajność, idealny do gier i codziennych zadań, w tym także bardziej wymagających aplikacji. Ten zestaw to dobra opcja dla osób szukających wydajności w codziennym użytkowaniu oraz grach w rozdzielczości 1080p. Choć GTX 970 nie jest już najnowszym modelem, nadal oferuje bardzo dobrą wydajność w wielu tytułach.",
    name: "Intel 6600k + GTX 970 stare combo",
    image: "images/guide-5.jpg",
  },
  {
    ids: [29977, 42452, 39823, 29022, 32182, 35157, 41510],
    description: "Zestaw komputerowy o bardzo wysokiej wydajności, idealny do intensywnego grania, renderowania, edycji wideo i innych wymagających zastosowań. Ten zestaw jest idealny dla entuzjastów gier, profesjonalistów i twórców treści, którzy wymagają sprzętu najwyższej klasy do zadań wymagających dużych zasobów mocy obliczeniowej.", 
    name: "Intel ARC dla twórców",
    image: "images/guide-6.jpg",
  },
];

function Guide() {
  const [detailedProducts, setDetailedProducts] = useState({});
  const [loadingProducts, setLoadingProducts] = useState([]);
  const [setTotals, setSetTotals] = useState({});
  const navigate = useNavigate();

  const fetchProductDetails = async (id) => {
    if (!detailedProducts[id]) {
      setLoadingProducts((prev) => [...prev, id]);
      try {
        const product = await getProductById(id);
        setDetailedProducts((prev) => ({
          ...prev,
          [id]: product,
        }));
      } catch (error) {
        console.error(`Error fetching details for product ${id}:`, error);
      } finally {
        setLoadingProducts((prev) => prev.filter((loadingId) => loadingId !== id));
      }
    }
  };

  useEffect(() => {
    const fetchAllSetDetails = async () => {
      for (const set of computer_sets) {
        await fetchSetDetails(set);
      }
    };
    fetchAllSetDetails();
  }, []); 
  
  useEffect(() => {
    const newSetTotals = {};
  
    computer_sets.forEach((set) => {
      const total = set.ids.reduce((sum, id) => {
        const product = detailedProducts[id];
        return product ? sum + parseFloat(product.price) : sum;
      }, 0);
      newSetTotals[set.name] = total.toFixed(2);
    });
  
    setSetTotals(newSetTotals);
  }, [detailedProducts]); 
  const fetchSetDetails = async (set) => {
    await Promise.all(set.ids.map(fetchProductDetails));
  };

  const addSetToBasket = async (set) => {
    const products = set.ids.map((id) => detailedProducts[id]).filter(Boolean);
  
    if (products.length === set.ids.length) {
      try {
        for (const product of products) {
          await handleAddToBasket(product.id, 1, navigate); //quantity always 1
        }
      } catch (error) {
        console.error("Error adding set to basket:", error);
      }
    } else {
      alert("Some products are still loading. Please try again later.");
    }
  };

  return (
    <div className="guide">
      <h1 className="guide-title">Proponowane zestawy</h1>
      <div className="set-grid">
        {computer_sets.map((set) => (
          <div key={set.name} className="set-header">
            <img src={set.image} alt={set.name} className="set-image" />
            <h3 className="set-name">{set.name}</h3>
            <h3 className="set-description">{set.description}</h3>
            <div className="product-grid">
              {set.ids.map((id) => (
                <div key={id} className="product-card">
                  {detailedProducts[id] ? (
                    <Link to={`/products/${id}`} className="product-link">
                    <h3 className="product-name">{detailedProducts[id].name}</h3>
                    <p className="product-price">{detailedProducts[id].price} zł</p>
                    </Link>
                  ) : (
                    <div className="loading-placeholder">
                      {loadingProducts.includes(id) ? "Loading..." : "Click to View Details"}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {setTotals[set.name] !== undefined && (
              <p className="set-total">Cena całkowita: {setTotals[set.name]} zł</p>
            )}
            <button
            className="add-set-to-basket-btn"
            onClick={() => addSetToBasket(set)}
            disabled={set.ids.some((id) => !detailedProducts[id])}
            >
            Dodaj zestaw do koszyka
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guide;
