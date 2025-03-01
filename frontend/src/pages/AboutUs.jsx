import React from 'react';
import "../styles/AboutUs.css";

const AboutUs = () => {
    return (
      <div className="about-us">
        <header className="about-us-header">
          <h1>Witaj w naszym konfiguratorze PC!</h1>
          <p className="tagline">Gdzie innowacja spotyka się z personalizacją</p>
        </header>
        
        <section className="company-section">
          <h2>O nas</h2>
          <p>
            Nasza siedziba mieści się na Akademii Górniczo-Hutniczej w Krakowie, gdzie pasjonujemy się dostarczaniem najbardziej efektywnych i dostosowanych komputerów. Naszą misją jest pomóc osobom prywatnym, firmom i entuzjastom w projektowaniu idealnych komputerów dopasowanych do ich potrzeb.
          </p>
          <p>
            Nasz zespół ekspertów z różnych dziedzin – sprzętu komputerowego, oprogramowania oraz doświadczenia użytkownika – współpracuje, aby dostarczyć intuicyjny konfigurator online, który upraszcza proces wyboru najlepszych komponentów.
          </p>
        </section>
  
        <section className="mission-section">
          <h2>Nasza misja</h2>
          <p>
            W naszej filozofii stawiamy na umożliwienie użytkownikom podejmowania świadomych decyzji dotyczących ich konfiguracji komputerowych. Naszą misją jest zapewnienie:
          </p>
          <ul>
            <li><strong>Bezproblemowe doświadczenie:</strong> Łatwa w obsłudze platforma online do personalizacji komputerów.</li>
            <li><strong>Zapewnienie kompatybilności:</strong> Gwarancja, że wybrane komponenty będą ze sobą współpracować.</li>
            <li><strong>Wysoka jakość w przystępnej cenie:</strong> Oferowanie najlepszych podzespołów w konkurencyjnych cenach.</li>
          </ul>
        </section>
  
        <section className="values-section">
          <h2>Nasze wartości</h2>
          <div className="values">
            <div className="value">
              <h3>Innowacyjność</h3>
              <p>Nieustannie dążymy do poprawy i integracji najnowszych technologii w naszym konfiguratorze.</p>
            </div>
            <div className="value">
              <h3>Przejrzystość</h3>
              <p>Zapewniamy szczegółowe informacje o każdym produkcie, aby pomóc Ci dokonać najlepszego wyboru.</p>
            </div>
            <div className="value">
              <h3>Zadowolenie klienta</h3>
              <p>Twoje zadowolenie jest naszym priorytetem. Zobowiązujemy się do świadczenia najlepszej obsługi klienta.</p>
            </div>
          </div>
        </section>
  
        <section className="location-section">
          <h1>Nasza lokalizacja</h1>
          <p>Jesteśmy dumnie zlokalizowani na Akademii Górniczo-Hutniczej, gdzie technologia i edukacja spotykają się, aby tworzyć przełomowe rozwiązania.</p>
        </section>
      </div>
    );
  };
  

export default AboutUs;
