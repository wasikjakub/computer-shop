import React, { useState } from 'react';
import "../styles/ContactForm.css";
import { toast } from "react-toastify";
import { sendContactForm } from '../api/supportService';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactForm(
        formData.name,
        formData.email,
        formData.message
      );
      toast.success('Wysłano pomyślnie! Dziękujemy za kontakt.');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      toast.error('Wystąpił błąd podczas wysyłania zgłoszenia.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="contact-form">
      <header className="contact-form-header">
        <h1>Formularz Kontaktowy</h1>
        <p className="tagline">Masz pytania? Skontaktuj się z nami!</p>
      </header>

      <section className="form-section">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Imię i Nazwisko</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Adres E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Wiadomość</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Wyślij</button>
        </form>

        {formStatus && <div className="form-status">{formStatus}</div>}
      </section>
    </div>
  );
};

export default ContactForm;
