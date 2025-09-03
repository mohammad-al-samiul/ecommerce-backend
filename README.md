# NestJS E-Commerce API

A full-featured e-commerce backend built with **NestJS**, **TypeORM**, **PostgreSQL**, and **JWT Authentication**.  
Supports user authentication, product management, and shopping cart functionality with role-based access control.

---

## Features

### Authentication

- JWT-based authentication
- User registration and login
- Role-based access control (Admin/User)

### Products

- CRUD operations for products
- Admin-only access for create, update, and delete
- Get all products or single product by ID

### Carts

- Add products to cart
- Update product quantity
- Remove single product or clear entire cart
- User-specific cart operations (requires authentication)

### Database

- PostgreSQL with TypeORM
- Auto-run migrations
- Entities: User, Product, Cart

---

## Tech Stack

- **Backend:** NestJS, TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **Validation:** class-validator
- **Environment Variables:** dotenv
- **Testing:** Jest

---

## Installation

1. **Clone the repository**

```bash
git https://github.com/mohammad-al-samiul/shoply
cd shoply
```

Install dependencies

```bash
npm install
```

Set environment variables
Create a .env file at the root:

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=1d

Run migrations (if any)

npm run typeorm migration:run

Start the server

# Development mode with hot reload

````bash
npm run start:dev
```bash

### API Endpoints

# Auth
``` bash
POST /api/auth/register – Register a new user

POST /api/auth/login – Login user and get JWT token
```
# Products
``` bash
GET /api/products – Get all products

GET /api/products/:id – Get a single product

POST /api/products – Create a new product (Admin only)

PATCH /api/products/:id – Update a product (Admin only)

DELETE /api/products/:id – Delete a product (Admin only)
```
# Carts
``` bash
POST /api/carts/add – Add a product to cart (Auth required)

GET /api/carts – Get all cart items for the user

PATCH /api/carts/:id – Update quantity of a cart item

DELETE /api/carts/:id – Remove a single cart item

DELETE /api/carts – Clear all items from cart
```
### Folder Structure
```bash
src/
├─ auth/
├─ carts/
│ ├─ dto/
│ ├─ entiies/
│ │ └─ carts.controller.spec.ts
│ ├─ carts.controller.ts
│ ├─ carts.module.ts
│ ├─ carts.service.spec.ts
│ └─ carts.service.ts
├─ common/
│ ├─ decorators/
│ ├─ enums/
│ └─ guards/
├─ products/
│ ├─ dto/
│ ├─ entities/
│ │ └─ products.controller.spec.ts
│ ├─ products.controller.ts
│ ├─ products.module.ts
│ ├─ products.service.spec.ts
│ └─ products.service.ts
├─ users/
│ ├─ entities/
│ │ └─ users.controller.spec.ts
│ ├─ users.controller.ts
│ ├─ users.module.ts
│ ├─ users.service.spec.ts
│ └─ users.service.ts
├─ app.controller.spec.ts
├─ app.controller.ts
├─ app.module.ts
├─ app.service.ts
└─ main.ts
````
