import React, { useState } from 'react';
import "../styles/ContactForm.css";
import { toast } from "react-toastify";
import { sendSupportForm } from '../api/supportService';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    problemType: '',
    problemDescription: ''
  });

  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendSupportForm(
        formData.name,
        formData.email,
        formData.problemType,
        formData.problemDescription
      );
      toast.success('Zgłoszenie zostało wysłane!');
      setFormData({ name: '', email: '', problemType: '', problemDescription: '' });
    } catch (error) {
      toast.error('Wystąpił błąd podczas wysyłania zgłoszenia.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="contact-form">
      <header className="contact-form-header">
        <h1>Wsparcie Techniczne</h1>
        <p className="tagline">Opisz swój problem i prześlij zgłoszenie!</p>
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

          <label htmlFor="problemType">Rodzaj Problemu</label>
          <select
            id="problemType"
            name="problemType"
            value={formData.problemType}
            onChange={handleChange}
            required
          >
            <option value="">Wybierz typ problemu</option>
            <option value="Sprzęt">Sprzęt</option>
            <option value="Oprogramowanie">Oprogramowanie</option>
            <option value="Kompatybilność">Kompatybilność</option>
            <option value="Inny">Inny</option>
          </select>

          <label htmlFor="problemDescription">Opis Problemu</label>
          <textarea
            id="problemDescription"
            name="problemDescription"
            value={formData.problemDescription}
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
