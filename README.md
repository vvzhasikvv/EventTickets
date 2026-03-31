# Система бронирования билетов на события

Полноценное веб‑приложение для регистрации, управления событиями и бронирования билетов.

## Технологии

- Frontend: React + Vite + React Router + Axios
- Backend: Node.js + Express + MongoDB (Mongoose)
- Аутентификация: JWT + bcrypt
- Загрузка файлов: Multer

## Структура проекта

```
/backend
/frontend
```

## Требования

- Node.js 18+
- MongoDB (Atlas)

## Настройка Backend

```
cd backend
npm.cmd install
```

Создайте `.env`:

```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/event_ticket
JWT_SECRET=change_me
NODE_ENV=development
```

Запуск:

```
npm.cmd run dev
```

Проверка здоровья:

```
http://localhost:4000/health
```

## Настройка Frontend

```
cd frontend
npm.cmd install
```

Создайте `.env`:

```
VITE_API_URL=http://localhost:4000
```

Запуск:

```
npm.cmd run dev
```

## Запуск тестов

Тесты backend (health + 404):

```
cd backend
npm.cmd test
```

## Чек‑лист ручного тестирования

- Регистрация нового пользователя
- Вход под созданным пользователем
- Назначение роли admin (в MongoDB: `role = "admin"`)
- Создание события в `/admin`
- Редактирование и удаление события
- Просмотр списка событий и страницы детали
- Бронирование билета
- Просмотр `/bookings`
- Проверка защиты от повторного бронирования

## API (кратко)

Auth:
- POST `/api/auth/register`
- POST `/api/auth/login`

Events:
- GET `/api/events`
- GET `/api/events/:id`
- POST `/api/events` (admin)
- PUT `/api/events/:id` (admin)
- DELETE `/api/events/:id` (admin)

Bookings:
- POST `/api/bookings`
- GET `/api/bookings/my`

## Деплой

См. `DEPLOY_GUIDE.md`.
