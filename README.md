# System do konfiguracji i zakupu sprzętu komputerowego

## Uruchamianie aplikacji Django

Aby uruchomić aplikację Django, należy przejść do folderu, w którym znajduje się plik `manage.py`, i wpisać następującą komendę:

```bash
python manage.py runserver
```
Serwer deweloperski uruchomi się domyślnie na adresie http://127.0.0.1:8000/.

Aby przejść do panelu administracyjnego:

http://127.0.0.1:8000/admin/

Wszystkie zmiany w modelach, które modyfikują pola w bazie danych, należy poprzedzić poniższymi komendami:
```bash
python manage.py makemigrations
python manage.py migrate
```

## Uruchamianie aplikacji React

Przejdź do folderu `frontend` i wpisz komendę:

```bash
npm start
```

Żeby api calle działały, musi być jednocześnie włączony proces Django.
