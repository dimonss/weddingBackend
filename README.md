# Guest List API

## 📌 Описание
Это простое Node.js приложение для управления списком гостей. Оно использует SQLite в качестве базы данных и позволяет получать информацию о гостях по их UUID.

## 🚀 Функционал
- Добавление гостей в базу данных
- Получение информации о госте по UUID
- Обновление статуса присутствия гостя
- Удаление гостя из списка

## 🛠️ Установка и запуск

### 1. Клонируйте репозиторий:
```sh
git clone https://github.com/dimonss/wedding_backend.git
cd wedding_backend
```

### 2. Установите зависимости:
```sh
npm install
```

### 3. Запустите сервер:
```sh
npm start
```

Сервер запустится на `http://localhost:3000`

## 📡 API Эндпоинты

### 🔍 Получить информацию о госте по UUID
**GET** `/guests/:uuid`

#### Пример запроса:
```sh
curl -X GET http://localhost:3000/guests/123e4567-e89b-12d3-a456-426614174000
```

#### Пример ответа:
```json
{
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Иван Иванов",
  "status": "confirmed"
}
```

### ➕ Добавить гостя
**POST** `/guests`

#### Пример запроса:
```sh
curl -X POST http://localhost:3000/guests -H "Content-Type: application/json" -d '{
  "name": "Иван Иванов",
  "status": "pending"
}'
```

#### Пример ответа:
```json
{
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Иван Иванов",
  "status": "pending"
}
```

### 🔄 Обновить статус гостя
**PATCH** `/guests/:uuid`

#### Пример запроса:
```sh
curl -X PATCH http://localhost:3000/guests/123e4567-e89b-12d3-a456-426614174000 -H "Content-Type: application/json" -d '{"status": "confirmed"}'
```

## 📦 Структура проекта
```
/wedding_backend
│── /routes        # Маршруты API
│── /models        # Модели данных
│── server.js      # Главный файл сервера
│── db.sqlite3    # База данных SQLite
│── package.json   # Зависимости проекта
│── README.md      # Документация
```

## 🏗️ Технологии
- **Node.js** (Express.js)
- **SQLite** (better-sqlite3)
- **UUID** (для генерации уникальных идентификаторов гостей)

## 📌 Лицензия
MIT

---
Автор: Chalysh Dmitrii

