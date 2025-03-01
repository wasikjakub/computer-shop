import React, { useState, useEffect } from 'react';
import { getOrders } from '../api/basketService';
import '../styles/Profile.css'; 

const ProfileInfo = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); //handling errors

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Hasło nie właściwe!");
            return;
        }

        setError("");

        console.log({
            firstName,
            lastName,
            address,
            phoneNumber,
            password,
        });
    };

    return (
        <div className="profile-info-container">
            <h2>Uaktualnij swój profil</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Imię</label>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        placeholder="Wprowadź swoje imię" 
                    />
                </div>
                <div className="form-group">
                    <label>Nazwisko</label>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        placeholder="Wprowadź swoje nazwisko" 
                    />
                </div>
                <div className="form-group">
                    <label>Adres</label>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        placeholder="Wprowadź swój adres" 
                    />
                </div>
                <div className="form-group">
                    <label>Numer telefonu</label>
                    <input 
                        type="text" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        placeholder="Wprowadź numer telefonu" 
                    />
                </div>
                <div className="form-group">
                    <label>Nowe hasło</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Wprowadź hasło" 
                    />
                </div>
                <div className="form-group">
                    <label>Potwierdź hasło</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Potwierdź nowe hasło" 
                    />
                </div>
                <button type="submit" className="submit-btn">Zapisz zmiany</button>
            </form>
        </div>
    );
};


const Orders = () => {
    const [orders, setOrders] = useState(null); // State to store order history data
    const [loading, setLoading] = useState(true); // State to show loading status
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getOrders(); // Fetch data using API call
                setOrders(ordersData); // Set the fetched data as the orders state
            } catch (err) {
                setError('Failed to load orders'); // Set error message if API call fails
            } finally {
                setLoading(false); // Change loading state to false
            }
        };

        fetchOrders();
    }, []); // Empty dependency array to run effect once when component mounts

    return (
        <div className="profile-container">
            <div className="tab-content">
                <h2>Twoje Zamówienia</h2>
                {loading ? (
                    <div>Wczytywanie...</div> // Show loading text while fetching data
                ) : error ? (
                    <div>{error}</div> // Show error message if API call fails
                ) : (
                    <div className="orders-list">
                        {orders && orders.length > 0 ? (
                            orders.map(order => (
                            <div key={order.id} className="order-item">
                                <p>Data: {order.created_at.slice(0, 10)}</p>
                                <p>Produkty:</p>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.product_name} - {item.quantity} szt. - {item.total_price} zł
                                        </li>
                                    ))}
                                </ul>
                                <p>Kwota zamówienia: {order.total_cost} zł</p>
                            </div>
                            ))
                        ) : (
                            <p>Brak zamówień</p> // Message if no orders are available
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const Payments = () => {
    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'Credit Card', last4: '1234', expDate: '12/23', isDefault: true },
        { id: 2, type: 'PayPal', last4: '', expDate: '', isDefault: false },
    ]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handleSelectPaymentMethod = (id) => {
        setSelectedPaymentMethod(id);
    };

    const handleDeletePaymentMethod = (id) => {
        const updatedMethods = paymentMethods.filter(method => method.id !== id);
        setPaymentMethods(updatedMethods);
    };

    const handleSetDefault = (id) => {
        setPaymentMethods(paymentMethods.map(method => 
            method.id === id ? { ...method, isDefault: true } : { ...method, isDefault: false }
        ));
    };

    return (
        <div className="saved-payments-container">
            <h2>Metody płatności</h2>
            <div className="payment-methods-list">
                {paymentMethods.map((method) => (
                    <div 
                        key={method.id} 
                        className={`payment-method-card ${method.isDefault ? 'default' : ''}`}
                        onClick={() => handleSelectPaymentMethod(method.id)}
                    >
                        <p>{method.type} kończy się na: {method.last4 || 'N/A'}</p>
                        {method.expDate && <p> Wygasa: {method.expDate}</p>}
                        {method.isDefault && <p className="default-label">Domyślna</p>}
                        <button onClick={(e) => { e.stopPropagation(); handleDeletePaymentMethod(method.id); }}>Usuń</button>
                        {!method.isDefault && (
                            <button onClick={(e) => { e.stopPropagation(); handleSetDefault(method.id); }}>
                                Ustaw jako domyślną
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="add-payment-method">
                <button onClick={() => alert("Przekierowywanie")}>
                    Dodaj nową metodę płatności
                </button>
            </div>
        </div>
    );
};

const Preferences = () => {
    const [preferences, setPreferences] = useState({
        newsletter: false,
        marketingEmails: false,
        productUpdates: false,
    });

    const handlePreferencesChange = (e) => {
        const { name, checked } = e.target;
        setPreferences(prevPreferences => ({
            ...prevPreferences,
            [name]: checked,
        }));
    };

    const handleSavePreferences = () => {
        console.log('Zapisane preferencje:', preferences);
    };

    return (
        <div className="preferences-container">
            <div className="preferences-section">
                <h2>Preferencje</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="newsletter"
                                checked={preferences.newsletter}
                                onChange={handlePreferencesChange}
                            />
                            Zgoda na otrzymywanie newslettera
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="marketingEmails"
                                checked={preferences.marketingEmails}
                                onChange={handlePreferencesChange}
                            />
                            Zgoda na otrzymywanie maili marketingowych
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="productUpdates"
                                checked={preferences.productUpdates}
                                onChange={handlePreferencesChange}
                            />
                            Zgoda na otrzymywanie informacji o nowych produktach
                        </label>
                    </div>

                    <button type="button" onClick={handleSavePreferences}>
                        Zapisz preferencje
                    </button>
                </form>
            </div>
        </div>
    );
};

const HistoryLogs = () => {
    const [logs, setLogs] = useState([]);  // State to store the login history
    const [loading, setLoading] = useState(true);  // Loading state

    // Function to simulate fetching login history
    useEffect(() => {
        const fetchLogs = async () => {
            // Example data simulating login history
            const sampleLogs = [
                { id: 1, timestamp: '2024-12-08 14:32:21', ip: '192.168.0.1', device: 'Desktop' },
                { id: 2, timestamp: '2024-12-07 09:22:10', ip: '192.168.0.2', device: 'Mobile' },
                { id: 3, timestamp: '2024-12-06 16:05:45', ip: '192.168.0.3', device: 'Laptop' },
            ];

            // Simulate loading time
            setTimeout(() => {
                setLogs(sampleLogs);
                setLoading(false);
            }, 1000);
        };

        fetchLogs();
    }, []);

    return (
        <div className="history-logs-container">
            <h1>Historia Logowań</h1>

            {loading ? (
                <p>Ładowanie...</p>
            ) : (
                <table className="history-logs-table">
                    <thead>
                        <tr>
                            <th>Data i Czas</th>
                            <th>Adres IP</th>
                            <th>Urządzenie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length > 0 ? (
                            logs.map(log => (
                                <tr key={log.id}>
                                    <td>{log.timestamp}</td>
                                    <td>{log.ip}</td>
                                    <td>{log.device}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Brak danych o logowaniach.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const Profile = () => {
    const [selectedTab, setSelectedTab] = useState("Profil");

    const renderContent = () => {
        switch (selectedTab) {
            case "Profil":
                return < ProfileInfo />;
            case "Zamówienia":
                return < Orders />;
            case "Płatności":
                return < Payments />;
            case "Preferencje":
                return < Preferences />;
            case "Historia logowania":
                return < HistoryLogs />;
            default:
                return < ProfileInfo />;
        }
    };

    return (
        <div className="profile-container">
            <h1>Twój profil</h1>
            <div className="tabs">
                {["Profil", "Zamówienia", "Płatności", "Preferencje", "Historia logowania"].map(tab => (
                    <button
                        key={tab}
                        className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Profile;
