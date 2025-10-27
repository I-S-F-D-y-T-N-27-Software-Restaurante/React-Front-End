# App RESTO Frontend

## Getting Started

### First, install dependencies

```bash
npm install
#or
pnpm install
```

### Second, duplicate _env.example and rename it to .env

### After, run the development server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Login Test Data

#### Seed Users and Roles

##### These users are preloaded for testing. Each has password pass123

**Seeded Users and Roles**

Alice

* Email: [alice@example.com](mailto:alice@example.com)
* Roles: Cashier, Waiter, Cook

Bob

* Email: [bob@example.com](mailto:bob@example.com)
* Roles: Waiter

Charlie

* Email: [charlie@example.com](mailto:charlie@example.com)
* Roles: Cook

Diana

* Email: [diana@example.com](mailto:diana@example.com)
* Roles: Cashier

Evan

* Email: [evan@example.com](mailto:evan@example.com)
* Roles: Admin only (no other roles assigned)

**Notes**

* Roles determine access to different parts of the app (e.g., Waiter sees `/mesas`, Cashier sees `/pedidos`).
* Evan has full admin privileges but no specific employee profiles.

---

This format clearly shows which users exist, their emails, and their roles for front-end logic.
