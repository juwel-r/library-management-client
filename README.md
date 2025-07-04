Thanks! Here's your **updated `README.md`** for the **frontend** of the **Minimal Library Management System**, now including:

* ✅ Live links to deployed frontend & backend
* ✅ Info on backend API structure & validation
* ✅ Updated with your `IBook` data model
* ✅ Emphasis on MVC backend structure (light touch since this README is frontend-only)

---

````markdown
# 📚 Minimal Library Management System – Frontend

A clean and functional **Library Management System** frontend built with **React**, **Redux Toolkit Query**, and **TypeScript**. This client app communicates with a RESTful API to allow users to view, add, edit, delete, and borrow books — all with proper state management and responsive UI.

> 🔗 **Live Demo**: [https://r-library-56.netlify.app](https://r-library-56.netlify.app)  
> 🔗 **Backend API** (MVC): [https://library-management-server-delta.vercel.app](https://library-management-server-delta.vercel.app)

---

## 📖 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Page List](#page-list)
- [UI/UX](#uiux)
- [Bonus Features](#bonus-features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [API & Data Model](#api--data-model)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🧩 Project Overview

This frontend app enables users to manage books and borrowing activities with **no authentication** required. The UI is minimal yet responsive, and integrates with a **modular MVC backend API** for real-time operations.

---

## ✨ Features

### ✅ Public Access

- No login or account creation needed.
- All functionalities (view, borrow, add, edit, delete) available openly.

### 📚 Book Management

- List all books with table view.
- Book actions:
  - 📝 **Edit Book**
  - ❌ **Delete Book** (with confirmation)
  - 📆 **Borrow Book**
- Add new books with validations:
  - `copies` required
  - `available` cannot be set to `true` if `copies` is `0`

### 🔄 Borrowing System

- Borrow form includes:
  - Quantity (validated)
  - Due Date
- Borrowed books update the availability of the book automatically.
- Borrowed book data is submitted via the API and aggregated in summary.

### 📊 Borrow Summary

- Aggregated list of all borrowed books.
- Displays total quantity borrowed for each book.

---

## 🗂️ Page List

| Route | Description |
| ----- | ----------- |
| `/books` | All books with CRUD + Borrow actions |
| `/create-book` | Add a new book |
| `/books/:id` | View single book details |
| `/edit-book/:id` | Update a book |
| `/borrow/:bookId` | Borrow a book |
| `/borrow-summary` | Borrow aggregation summary |

---

## 🎨 UI/UX

- Responsive with **Tailwind CSS**
- Clean, minimalist layout
- Mobile and tablet-friendly
- Toast notifications via **React Toastify**
- Modal & dialog components from **Radix UI**

---

## 🎁 Bonus Features

| Feature | Status |
| ------- | ------ |
| Optimistic UI Updates | ✅ |
| Toast Notifications | ✅ |
| Responsive Layout | ✅ |
| Type-Safe Forms | ✅ (Zod + React Hook Form) |

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/library-management-client.git
cd library-management-client

# Install dependencies
npm install
````

---

## 🚀 Usage

```bash
# Start the dev server
npm run dev
```

Visit: `http://localhost:5173`

---

## 🧪 Tech Stack

| Layer         | Technology                  |
| ------------- | --------------------------- |
| Frontend      | React 19 + TypeScript       |
| State Mgmt    | Redux Toolkit + RTK Query   |
| Forms         | React Hook Form + Zod       |
| Styling       | Tailwind CSS                |
| UI Components | Radix UI, Lucide Icons      |
| Charts        | Recharts                    |
| Notifications | React Toastify, SweetAlert2 |

---

## 🗂️ Folder Structure

```
📁 src/
├── assets/              # Static files
├── components/          # Reusable UI components
├── features/            # RTK Query endpoints & slices
├── layouts/             # Layout wrappers
├── pages/               # Page views (Books, Create, Edit, Borrow)
├── routes/              # Route definitions
├── types/               # TypeScript interfaces
├── utils/               # Utility functions/constants
├── App.tsx              # App root
└── main.tsx             # Entry point
```

---

## 🔌 API & Data Model

### API Base URL

Set in `.env`:

```env
VITE_API_BASE_URL=https://library-management-server-delta.vercel.app/api/v1
```

### 📦 Book Data Structure

```ts
export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBooksResponse {
  success: boolean;
  totalBooks: number;
  message: string;
  data: IBook[];
}
```

> Backend API is structured in MVC pattern and includes validation.
> ✅ Copies cannot be zero if availability is true (server-side check).
> ✅ Proper response types and pagination supported.

---

## ⚙️ Configuration

1. Create a `.env` file at root:

```env
VITE_API_BASE_URL=https://library-management-server-delta.vercel.app/api/v1
```

2. Restart server after any `.env` change.

---

## 💡 Examples

* **Add Book**:

  * Fill all fields, ensure `copies > 0`
* **Edit Book**:

  * Navigate to edit route, change details
* **Borrow Book**:

  * Borrowing more than available throws an error
* **Borrow Summary**:

  * Aggregated from backend using RTK Query

---

## 🐞 Troubleshooting

| Issue               | Solution                                         |
| ------------------- | ------------------------------------------------ |
| 404 on routes       | Check routing setup in `routes/index.tsx`        |
| Borrow fails        | Ensure copies > 0 and backend is reachable       |
| Styling issues      | Ensure Tailwind and Vite are properly configured |
| Data not refreshing | Check RTK Query cache or invalidation tags       |

---

## 📄 License

This project is for academic and demonstration purposes only.

---

> Developed with ❤️ using React, Redux Toolkit, and TypeScript.

```
