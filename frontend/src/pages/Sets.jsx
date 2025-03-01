import React, { useState, useEffect } from 'react';
import { getProductById } from '../api/productService';
import { useNavigate, Link } from 'react-router-dom';
import { handleAddToBasket } from "../utils/basketUtils";
import SearchBar from '../components/SearchBar';
import '../styles/Sets.css';

const componentTypes = ["All", "Processors", "GPU", "Motherboard", "Memory", "Case", "Power Supply", "CPU cooler", "Internal Hard Drive"];

const computer_sets = [
    {
      ids: [29981, 39815, 36043, 32214, 28862, 41484],
      description: "Kupiłem ten zestaw pół roku temu, szukając czegoś, co pozwoli mi na płynne granie w gry, ale jednocześnie nie przekroczy mojego budżetu. I muszę przyznać, że jestem zadowolony z wyboru. Procesor Ryzen 5 3400G sprawdza się świetnie w grach takich jak Fortnite czy CS:GO, a wbudowany układ graficzny Vega wystarcza do tych mniej wymagających tytułów. Zestaw działa bez zarzutu, nie mam problemów z wydajnością, a całość jest solidnie zbudowana. Dobrze się sprawdza także przy codziennych zadaniach, takich jak przeglądanie internetu czy oglądanie filmów. Zdecydowanie polecam dla osób szukających taniego, ale wystarczająco wydajnego zestawu komputerowego.",
      name: "AMD budżetowa opcja dla graczy",
      image: "images/build-1.png",
    },
    {
      ids: [29976, 39815, 35197, 42717, 28851, 41485, 32213, 30862],
      description: "„Kupiłem ten zestaw pół roku temu, szukając czegoś, co pozwoli mi na płynne granie w gry, ale jednocześnie nie przekroczy mojego budżetu. I muszę przyznać, że jestem zadowolony z wyboru. Procesor Ryzen 5 3400G sprawdza się świetnie w grach takich jak Fortnite czy CS:GO, a wbudowany układ graficzny Vega wystarcza do tych mniej wymagających tytułów. Zestaw działa bez zarzutu, nie mam problemów z wydajnością, a całość jest solidnie zbudowana. Dobrze się sprawdza także przy codziennych zadaniach, takich jak przeglądanie internetu czy oglądanie filmów. Zdecydowanie polecam dla osób szukających taniego, ale wystarczająco wydajnego zestawu komputerowego.",
      name: "AMD średniopółkowy dla graczy",
      image: "images/build-2.png",
    },
    {
      ids: [29961, 39817, 35400, 42621, 28866, 41536, 31157, 32657],
      description: "„Kupiłem ten zestaw pół roku temu, szukając czegoś, co pozwoli mi na płynne granie w gry, ale jednocześnie nie przekroczy mojego budżetu. I muszę przyznać, że jestem zadowolony z wyboru. Procesor Ryzen 5 3400G sprawdza się świetnie w grach takich jak Fortnite czy CS:GO, a wbudowany układ graficzny Vega wystarcza do tych mniej wymagających tytułów. Zestaw działa bez zarzutu, nie mam problemów z wydajnością, a całość jest solidnie zbudowana. Dobrze się sprawdza także przy codziennych zadaniach, takich jak przeglądanie internetu czy oglądanie filmów. Zdecydowanie polecam dla osób szukających taniego, ale wystarczająco wydajnego zestawu komputerowego.",
      name: "AMD najmocniejsza pozycja dla gracza",
      image: "images/build-3.png",
    },
    {
      ids: [29973, 42744, 39856, 35174, 32156, 28898, 41775],
      description: "Zestaw kupiłem pół roku temu i od tego czasu sprawdza się świetnie. Jest to bardzo dobrze zbalansowana maszyna, która nie tylko zapewnia dużą wydajność w grach, ale również jest doskonała do pracy biurowej, edycji wideo i pracy z grafiką. Procesor i karta graficzna sprawiają, że komputer działa stabilnie nawet przy bardziej wymagających aplikacjach. Jako użytkownik, który korzysta zarówno z multimediów, jak i intensywnych aplikacji do obróbki zdjęć, ten zestaw okazał się być odpowiednim wyborem. Cieszę się z zakupu i polecam go każdemu, kto szuka wszechstronnego komputera do codziennych zadań i gier.",
      name: "Intel średniopółkowy do codziennego używania",
      image: "images/build-4.png",
    },
    {
      ids: [30079, 42920, 29030, 35302, 41484, 32346],
      description: "Mimo że ten zestaw nie jest już najnowszy, muszę przyznać, że kupiłem go pół roku temu i nadal działa bardzo dobrze. Choć GTX 970 jest starszym modelem, wciąż daje radę w grach w 1080p na wysokich ustawieniach. Ryzen 5 6600k również zapewnia wystarczającą wydajność do codziennych zadań i gier. Komputer radzi sobie bez problemów z wymagającymi aplikacjami biurowymi i edytorskimi. Grałem w kilka tytułów, takich jak FIFA 22 czy Call of Duty, i wszystko działało płynnie. To świetna opcja dla osób, które nie potrzebują najnowszego sprzętu, ale szukają solidnej wydajności w przystępnej cenie.",
      name: "Intel 6600k + GTX 970 stare combo",
      image: "images/build-5.png",
    },
    {
      ids: [29977, 42452, 39823, 29022, 32182, 35157, 41510],
      description: "Zestaw Intel ARC kupiłem około pół roku temu i od tamtej pory sprawdza się doskonale. Jestem twórcą treści, więc zależało mi na komputerze, który poradzi sobie z edycją wideo, renderowaniem 3D i grami. Zestaw działa świetnie, nie tylko w aplikacjach do tworzenia treści, ale także w nowych grach na wysokich ustawieniach. Procesor Intel i karta graficzna ARC zapewniają fenomenalną wydajność, a całość działa stabilnie. Praca z multimediami stała się o wiele szybsza dzięki tym komponentom. To naprawdę mocny zestaw, idealny dla profesjonalistów i twórców treści, którzy potrzebują sprzętu o dużej mocy obliczeniowej.", 
      name: "Intel ARC dla twórców",
      image: "images/build-6.png",
    },
  ];

  function Sets() {
    const [detailedProducts, setDetailedProducts] = useState({});
    const [loadingProducts, setLoadingProducts] = useState([]);
    const [setTotals, setSetTotals] = useState({});
    const [filter, setFilter] = useState("All");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(6000);
    const [searchQuery, setSearchQuery] = useState(""); // New state for search query
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
            await handleAddToBasket(product.id, 1, navigate);
          }
        } catch (error) {
          console.error("Error adding set to basket:", error);
        }
      } else {
        alert("Some products are still loading. Please try again later.");
      }
    };
  
    // Handle the search query change
    const handleSearchChange = (query) => {
      setSearchQuery(query.toLowerCase()); // Store the lowercase query for case-insensitive search
    };
  
    const filteredSets = computer_sets.filter((set) => {
      const totalPrice = set.ids.reduce((sum, id) => {
        const product = detailedProducts[id];
        return product ? sum + parseFloat(product.price) : sum;
      }, 0);
  
      const matchesSearch =
        set.name.toLowerCase().includes(searchQuery) || set.description.toLowerCase().includes(searchQuery);
  
      return (
        matchesSearch &&
        totalPrice >= minPrice &&
        totalPrice <= maxPrice
      );
    });
  
    return (
      <div className="guide">
        <h1 className="guide-title">Zbudowane przez innych użytkowników</h1>
  
        <SearchBar onSearchChange={handleSearchChange} />
  
        <div className="price-filter-bar">
          <label>
            Min Cena:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              min="0"
            />
          </label>
          <label>
            Max Cena:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              min="0"
            />
          </label>
        </div>
  
        <div className="set-grid">
          {filteredSets.map((set) => (
            <div key={set.name} className="set-card">
              <div className="set-image-container">
                <img src={set.image} alt={set.name} className="set-image" />
              </div>
              <div className="set-info">
                <h3 className="set-name">{set.name}</h3>
                <p className="set-description">{set.description}</p>
                <div className="product-list">
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
                {setTotals[set.name] && (
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
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Sets;