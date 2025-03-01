import React from 'react';
import "../styles/HomePage.css";
import { useNavigate } from 'react-router-dom';

const computer_guide_set = [
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
]

const computer_build_set = [
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
    ids: [29973, 42744, 39856, 35174, 32156, 28898, 41775],
    description: "Zestaw kupiłem pół roku temu i od tego czasu sprawdza się świetnie. Jest to bardzo dobrze zbalansowana maszyna, która nie tylko zapewnia dużą wydajność w grach, ale również jest doskonała do pracy biurowej, edycji wideo i pracy z grafiką. Procesor i karta graficzna sprawiają, że komputer działa stabilnie nawet przy bardziej wymagających aplikacjach. Jako użytkownik, który korzysta zarówno z multimediów, jak i intensywnych aplikacji do obróbki zdjęć, ten zestaw okazał się być odpowiednim wyborem. Cieszę się z zakupu i polecam go każdemu, kto szuka wszechstronnego komputera do codziennych zadań i gier.",
    name: "Intel średniopółkowy do codziennego używania",
    image: "images/build-7.png",
  },
  {
    ids: [29977, 42452, 39823, 29022, 32182, 35157, 41510],
    description: "Zestaw Intel ARC kupiłem około pół roku temu i od tamtej pory sprawdza się doskonale. Jestem twórcą treści, więc zależało mi na komputerze, który poradzi sobie z edycją wideo, renderowaniem 3D i grami. Zestaw działa świetnie, nie tylko w aplikacjach do tworzenia treści, ale także w nowych grach na wysokich ustawieniach. Procesor Intel i karta graficzna ARC zapewniają fenomenalną wydajność, a całość działa stabilnie. Praca z multimediami stała się o wiele szybsza dzięki tym komponentom. To naprawdę mocny zestaw, idealny dla profesjonalistów i twórców treści, którzy potrzebują sprzętu o dużej mocy obliczeniowej.", 
    name: "Intel ARC dla twórców",
    image: "images/build-6.png",
  },
]

const HomePage = () => {
  const navigate = useNavigate();

  const handleClickConf = () => {
    navigate('/configurator');
  };
 
  const handleClickGuides = () => {
    navigate('/guide');
  };

  const handleClickSets = () => {
    navigate('/sets');
  };

  return (
    <div className="homepage-container">
      {/* Main Header */}
      <h1 className="title">Wybierz części. Zbuduj swojego PC.<br/> Dziel się z innymi!</h1>
      <p className="subtitle">
        W ramach naszej strony możesz wybierać części, ceny, rady dotyczące kompatybilności dla budowanych komputerów!
      </p>

      {/* Button with Icon */}
      <button className="button" onClick={handleClickConf}>
      <span className="home-icon">
        <i className="fas fa-tools"></i>
      </span>
      Otwórz konfigurator
    </button>

      {/* Placeholder Image Section */}
      <div className="placeholder-container">
        <img 
          src="/images/configurator_view.JPG" 
          alt="Placeholder dla zestawu" 
        />
      </div>

      {/* Guides Section */}
      <div className="guides-section">
        <div className="left-column">
            <h2>Poradniki</h2>
            <p>
                Potrzebujesz pomocy w utworzeniu wymarzonego zestawu komputerowego?
                Skorzystaj z przygotowanych zestawów komputerowych przygotowanych do twoich potrzeb w zależności od twojego budżetu!
            </p>
            <button className="button" onClick={handleClickGuides}><span className="home-icon"><i className="fas fa-book"></i> </span>Otwórz poradniki</button>
        </div>
        {computer_guide_set.map((guide, index) => (
        <div className="guides-item" key={index}>
          <img src={guide.image} alt={guide.name} />
          <h3>{guide.name}</h3>
        </div>
      ))}
    </div>


      {/* Builds Section */}
      <div className="builds-section">
  <div className="left-column">
    <h2>Zbudowane zestawy</h2>
    <p>
      Potrzebujesz inspiracji? Sprawdź komputery innych użytkowników, którzy skorzystali z naszego serwisu. Możesz
      zobaczyć w ten sposób części, ceny oraz historię użytkowników posiadających sprzęt.
    </p>
    <button className="button" onClick={handleClickSets}>
      <span className="home-icon">
        <i className="fas fa-desktop"></i> 
      </span>Zobacz zestawy innych
    </button>

    <div className='build-item bigger'>
      <img src="/images/build-3.png" alt="Obrazek w lewej kolumnie"/>
      <h3>AMD najmocniejsza pozycja dla gracza</h3>
    </div>
  </div>
  <div className="right-column">
    {computer_build_set.map((build, index) => (
      <div className="build-item" key={index}>
        <img src={build.image} alt={build.name} />
        <h3>{build.name}</h3>
      </div>
    ))}
    </div>
  </div>
</div>
  );
};

export default HomePage;
