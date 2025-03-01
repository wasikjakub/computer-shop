import React from 'react';
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <header className="privacy-policy-header">
        <h1>Polityka Prywatności</h1>
        <p className="tagline">Twoja prywatność jest dla nas ważna!</p>
      </header>

      <section className="policy-section">
        <h2>1. Wprowadzenie</h2>
        <p>
          Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób zbieramy, przetwarzamy i przechowujemy Twoje dane osobowe
          podczas korzystania z naszej strony internetowej i usług. Korzystając z naszej strony, wyrażasz zgodę na
          zbieranie i przetwarzanie Twoich danych zgodnie z tą polityką.
        </p>
      </section>

      <section className="policy-section">
        <h2>2. Jakie dane zbieramy?</h2>
        <p>
          Zbieramy dane osobowe, takie jak: imię, nazwisko, adres e-mail, adres zamieszkania, dane dotyczące płatności i
          inne informacje niezbędne do realizacji zamówienia lub udostępnienia usług.
        </p>
      </section>

      <section className="policy-section">
        <h2>3. Jak wykorzystujemy Twoje dane?</h2>
        <p>
          Twoje dane wykorzystujemy do:
        </p>
        <ul>
          <li>Realizacji zamówień i świadczenia usług;</li>
          <li>Kontaktowania się w sprawie zamówienia lub zapytania;</li>
          <li>Poprawy jakości usług;</li>
          <li>Marketingu i promocji naszych produktów (na podstawie zgody użytkownika);</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>4. Jak przechowujemy Twoje dane?</h2>
        <p>
          Przechowujemy Twoje dane osobowe na bezpiecznych serwerach z zastosowaniem odpowiednich środków technicznych i
          organizacyjnych, aby zapewnić ich ochronę przed nieautoryzowanym dostępem.
        </p>
      </section>

      <section className="policy-section">
        <h2>5. Przekazywanie danych</h2>
        <p>
          Twoje dane mogą być przekazywane naszym partnerom i usługodawcom, którzy pomagają nam świadczyć usługi (np.
          firmy zajmujące się płatnościami). Wszystkie dane są przekazywane zgodnie z obowiązującymi przepisami prawa.
        </p>
      </section>

      <section className="policy-section">
        <h2>6. Twoje prawa</h2>
        <p>
          Masz prawo do dostępu, poprawiania, usuwania swoich danych osobowych oraz do wycofania zgody na ich
          przetwarzanie w dowolnym momencie. Możesz skontaktować się z nami w celu realizacji tych praw.
        </p>
      </section>

      <section className="policy-section">
        <h2>7. Kontakt</h2>
        <p>
          Jeśli masz jakiekolwiek pytania dotyczące naszej Polityki Prywatności, skontaktuj się z nami pod adresem e-mail: 
          <strong> pc.configurator@example.com</strong>.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
