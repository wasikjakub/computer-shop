import React from "react";
import "../styles/Footer.css"
import { COMPANY_NAME } from "../constants";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <ul className="footer-column">
          <li><strong>Nowości</strong></li>
          <li><a href="/guide">Poradniki</a></li>
          <li><a href="/sets">Konfiguracje innych</a></li>
        </ul>
        <ul className="footer-column">
          <li><strong>Kontakt</strong></li>
          <li><a href="/contact">Formularz kontaktowy</a></li>
          <li><a href="/support">Pomoc techniczna</a></li>
        </ul>
        <ul className="footer-column">
          <li><strong>Firma</strong></li>
          <li><a href="/about-us">O nas</a></li>
          <li><a href="/privacy-policy">Polityka prywatności</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>© 2024 {COMPANY_NAME}. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}

export default Footer;