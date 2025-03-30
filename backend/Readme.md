# ShelfShare

## Overview

ShelfShare is a comprehensive Node.js and Express-based API designed to streamline the management of books, user authentication, orders, and shopping carts. It empowers users to easily list, search, and manage books, build and update their shopping carts, and place orders seamlessly. At the same time, administrators are provided with robust tools to approve, reject, and monitor transactions, ensuring smooth and secure operations throughout the platform.

## Features

- User authentication and authorization (Admin and User roles)
- Secure JWT-based authentication
- CRUD operations for books
- Order management system
- Payment methods ( user balance, on_delivery or using stripe)
- Shopping cart functionality
- Admin controls for book approval, rejection, and order management

## Technologies Used

- **Node.js** (Backend framework)
- **Express.js** (Web framework)
- **MongoDB & Mongoose** (Database & ODM)
- **JWT** (Authentication)

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **MongoDB** (Local or MongoDB Atlas)

### Steps to Install

1. Clone the repository:
   ```sh
   git clone https://github.com/GHR2-SWD2-S2-Team2/ShelfShare.git
   cd ./ShelfShare/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- **Register a new user**

  ```http
  POST /api/auth/register
  ```

  **Request Body:**

  ```json
  {
    "name": "example", //required
    "email": "example@example.com", //required
    "password": "123456", // required
    "address": "City, Country", //required
    "phone": "+201014248353", //required
    "img": "https://imgUrl..."
  }
  ```

  **Response Body**

  ```json
  {
    "_id": "67e802c1f467a3e2e581d6e5",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTgwMmMxZjQ2N2EzZTJlNTgxZDZlNSIsImlhdCI6MTc0MzI1ODMwNSwiZXhwIjoxNzQ1ODUwMzA1fQ.HTDZEysIztkDAWL9ZEWR14KIx2u4oOMJ-EwpHetVgMk",
    "name": "example",
    "email": "example@example.com",
    "password": "123213",
    "address": "City, Country",
    "phone": "+201014248353"
  }
  ```

- **Login and receive a JWT**
  ```http
  POST /api/auth/login
  ```
  **Request Body:**
  ```json
  {
    "email": "example@example.com",
    "password": "123456"
  }
  ```
  **Response Body:**
  ```json
  {
    "_id": "67e5a66e1d22dddb9a99e889",
    "name": "example",
    "email": "example@example.com",
    "img": "https://th.bing.com/th/id/OIP.pdgwLL8oxjSs9n4AV66x5wHaHa?rs=1&pid=ImgDetMain",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTVhNjZlMWQyMmRkZGI5YTk5ZTg4OSIsImlhdCI6MTc0MzIwOTc0MSwiZXhwIjoxNzQ1ODAxNzQxfQ.hX1E77wcpwjes2iY5zVFGnhq_NA6JPCTe02IuwQvsaY"
  }
  ```

### User

- **Get my profile info**

  ```http
  GET /api/user/me
  ```

  **response body**

  ```json
  {
    "_id": "67e802c1f467a3e2e581d6e5",
    "name": "example",
    "email": "example@example.com",
    "img": "https://th.bing.com/th/id/OIP.pdgwLL8oxjSs9n4AV66x5wHaHa?rs=1&pid=ImgDetMain",
    "address": "City, Country",
    "phone": "+20101424835",
    "balance": 0,
    "pendingBalance": 0,
    "createdAt": "2025-03-29T14:25:05.776Z",
    "updatedAt": "2025-03-29T14:25:05.776Z",
    "__v": 0
  }
  ```

- **Update my info**
  ```http
  PATCH /api/user
  ```
  **Request Body:**
  ```json
  {
    "field": "newValue"
  }
  ```
  **Response Body:**
  ```json
  {
    "_id": "67e802c1f467a3e2e581d6e5",
    "name": "example",
    "email": "example@example.com",
    "img": "https://th.bing.com/th/id/OIP.pdgwLL8oxjSs9n4AV66x5wHaHa?rs=1&pid=ImgDetMain",
    "address": "City, Country",
    "phone": "+201014248353"
  }
  ```

### Books

- **Get all books** (Admins see all; users see other users **ready** books)

  ```http
  GET /api/books
  ```

  **Response Body:**

  ```json
  [
    {
      "title": "Rich Dad Poor Dad-2",
      "ISBN": "0-446-67745-0",
      "author": "Robert Kiyosaki",
      "description": "A book about financial literacy",
      "coverImage": "https://image-url...",
      "price": 280
    },
    {
      "title": "Rich Dad Poor Dad-2",
      "ISBN": "0-446-67745-0",
      "author": "Robert Kiyosaki",
      "description": "A book about financial literacy",
      "coverImage": "https://image-url...",
      "price": 20
    }
  ]
  ```

- **Get user's books**

  ```http
  GET /api/books/myBooks
  ```

  **Response Body**

  ```json
  [
    {
      "_id": "67e5bc5b6dcf93ebf2bfb900",
      "title": "book1/user1",
      "author": "Robert kiyosaki",
      "ISBN": "45-45-45",
      "description": "test book",
      "coverImage": "https://th.bing.com/th/id/OIP.01_QdsAtJVZWlEroIroQsAHaIk?w=1079&h=1249&rs=1&pid=ImgDetMain",
      "price": 280,
      "status": "ordered",
      "createdAt": "2025-03-27T21:00:11.617Z",
      "updatedAt": "2025-03-29T00:52:20.022Z",
      "__v": 0
    },
    {
      "_id": "67e5a71e1d22dddb9a99e8ac",
      "title": "book4/user1",
      "author": "Robert kiyosaki",
      "ISBN": "45-45-45",
      "description": "test book",
      "coverImage": "https://th.bing.com/th/id/OIP.01_QdsAtJVZWlEroIroQsAHaIk?w=1079&h=1249&rs=1&pid=ImgDetMain",
      "price": 280,
      "status": "ordered",
      "createdAt": "2025-03-27T19:29:34.947Z",
      "updatedAt": "2025-03-29T00:42:19.447Z",
      "__v": 0
    }
  ]
  ```

- **Get a book details** (Admins can retrieve any book; users can retrieve only **ready** books or their own)

  ```http
  GET /api/books/:bookId
  ```

  **Response Body**

  ```json
  {
    "_id": "67e5bc5b6dcf93ebf2bfb900",
    "title": "book1/user1",
    "author": "Robert kiyosaki",
    "ISBN": "45-45-45",
    "description": "test book",
    "publisher": "67e5a66e1d22dddb9a99e889",
    "coverImage": "https://th.bing.com/th/id/OIP.01_QdsAtJVZWlEroIroQsAHaIk?w=1079&h=1249&rs=1&pid=ImgDetMain",
    "price": 280,
    "status": "ordered",
    "createdAt": "2025-03-27T21:00:11.617Z",
    "updatedAt": "2025-03-29T00:52:20.022Z",
    "__v": 0
  }
  ```

- **Add a new book** (user can add books **title is uniqe for each user**)

  ```http
  POST /api/books/add
  ```

  **Request Body:**

  ```json
  {
    "title": "Rich Dad Poor Dad", //required
    "ISBN": "0-446-67745-0", //required
    "author": "Robert Kiyosaki", //required
    "description": "A book about financial literacy",
    "coverImage": "https://image-url...", //required
    "price": 280 //required
  }
  ```

  **Response Body**

  ```json
  {
    "title": "Rich Dad Poor Dad",
    "author": "Robert kiyosaki",
    "ISBN": "45-45-45",
    "description": "test book",
    "coverImage": "https://th.bing.com/th/id/OIP.01_QdsAtJVZWlEroIroQsAHaIk?w=1079&h=1249&rs=1&pid=ImgDetMain",
    "price": 280,
    "status": "waiting",
    "_id": "67e808a2874d5c38861fcaca",
    "createdAt": "2025-03-29T14:50:10.063Z",
    "updatedAt": "2025-03-29T14:50:10.063Z",
    "__v": 0
  }
  ```

  **Response Error**

  ```json
  {
    "message": "Something went wrong"
  }
  ```

- **Edit a book**

  ```http
  PATCH /api/books/:bookId
  ```

  **Request Body:**

  ```json
  {
    "title": "new title",
    "price": 300
  }
  ```

  **Admin Request Body (for approval/rejection):**

  ```json
  {
    "status": "ready" | "rejected" // (ADMINS ONLY)
  }
  ```

- **Delete a book** (Users can delete their books; Admins can delete any book)

  ```http
  DELETE /api/books/:bookId
  ```

  **Response Body**

  ```josn {
  "message": "Book deleted successfully"
  }
  ```

### Cart

- **View cart**

  ```http
  GET /api/cart
  ```

  **Response Body**

  ```json
  {
    "_id": "67e5c801b16f7c27d1a8c51b",
    "user": "67e5a66e1d22dddb9a99e889",
    "books": [
      {
        "title": "Rich Dad Poor Dad-2",
        "ISBN": "0-446-67745-0",
        "author": "Robert Kiyosaki",
        "description": "A book about financial literacy",
        "coverImage": "https://image-url...",
        "price": 280
      }
      //....
    ],
    "createdAt": "2025-03-27T21:49:53.732Z",
    "updatedAt": "2025-03-27T21:53:29.517Z",
    "__v": 3,
    "totalPrice": 0,
    "id": "67e5c801b16f7c27d1a8c51b"
  }
  ```

- **Add a book to cart**

  ```http
  POST /api/cart
  ```

  **Request Body:**

  ```json
  {
    "bookId": "67e454013044870b1c77cdf4"
  }
  ```

- **Remove a book from cart**
  ```http
  DELETE /api/cart/book/:bookId
  ```
  **Bad request**
  ```json
  {
    "message": "This book is not in your cart"
  }
  ```

### Orders

- **Create an order** (Based on the user's cart)

  ```http
  POST /api/order/new
  ```

  **Request Body**

  ```json
  {
    "paymentMethod": "balance" // or on_delivery
  }
  ```

  **Response Body**

  ```json
  {
    "message": "Order paid from balance",
    "order": {
      "user": "67e5a67b1d22dddb9a99e88c",
      "books": ["67e5bc5b6dcf93ebf2bfb900"],
      "totalPrice": 280,
      "status": "pending",
      "paymentMethod": "balance",
      "billingData": {
        "name": "user2",
        "email": "user2@gmail.com",
        "phone_number": "+201014248355",
        "address": "City, Country"
      },
      "paid": true,
      "_id": "67e74443b503a34cc3d84416",
      "createdAt": "2025-03-29T00:52:19.567Z",
      "updatedAt": "2025-03-29T00:52:20.183Z",
      "__v": 0
    }
  }
  ```

  - **For card payment using stripe use `http POST /order/stripe`**
    **Stripe Response Body**
    ```json
    {
      "id": "cs_test_a16OgL3EMivzf5WmV4fLccK4n0dmyxFrJKVmSJu1BPr4O9Jxd88OMTL5qX",
      "url": "https://checkout.stripe.com/c/pay/cs_test_a16OgL3EMivzf5WmV4fLccK4n0dmyxFrJKVmSJu1BPr4O9Jxd88OMTL5qX#fidkdWxOYHwnPyd1blpxYHZxWjA0VzJkYkZXYV9JY251PDVqSjZma3VkZ0JkQXNTNWt%2FPXRda3J0XHFDcW9cfFJrc2hrdkEyb0swVkpmTk1Kamk9cTNLQHRoMmBMREJMQ1B2Rn9jdXxHcFRNNTVSYz19TjNkPCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
    }
    ```
    (redirect the user to the `url` given the response)
    then it will be directed it to the success/faild pages in the frontend with query param ?session_id
    in the success page you should request `http GET /order/verify-payment?session_id=cs_test_b1OyqbOs2LFCeryJo3mRaV5d3BXeFhfhFiNcjz6yacImy7dR8WJZEn8rgc` to verify user payment and place the order

- **Get orders** (Users see their orders; Admins see all orders)

  ```http
  GET /api/order
  ```

  **Response Body**

  ```json
  [
    {
      "billingData": {
        "name": "user2",
        "email": "user2@gmail.com",
        "phone_number": "+201014248355",
        "address": "City, Country"
      },
      "_id": "67e74443b503a34cc3d84416",
      "user": "67e5a67b1d22dddb9a99e88c",
      "books": ["67e5bc5b6dcf93ebf2bfb900"],
      "totalPrice": 280,
      "status": "pending",
      "paymentMethod": "balance",
      "paid": true,
      "createdAt": "2025-03-29T00:52:19.567Z",
      "updatedAt": "2025-03-29T00:52:20.183Z",
      "__v": 0
    },
    {
      "billingData": {
        "name": "user2",
        "email": "user2@gmail.com",
        "phone_number": "+201014248355",
        "address": "City, Country"
      },
      "_id": "67e741eb672281ff9d463507",
      "user": "67e5a67b1d22dddb9a99e88c",
      "books": ["67e5a71e1d22dddb9a99e8ac"],
      "totalPrice": 280,
      "status": "completed",
      "paymentMethod": "card",
      "paid": true,
      "createdAt": "2025-03-29T00:42:19.143Z",
      "updatedAt": "2025-03-29T00:50:23.345Z",
      "__v": 0
    }
  ]
  ```

- **Cancel an order** (Users can cancel their pending orders)

  ```http
  PATCH /api/order/cancel/:orderId
  ```

  **Response Body**

  ```json
  { "message": "Order canceled successfully" }
  ```

- **mark Order as completed** (Admins only)
  ```http
  PATCH /api/order/complete/:orderId
  ```
  **Request Body:**
  ```json
  {
    "message": "Order marked as completed"
  }
  ```

## Contributing

Contributions are welcome. Please fork the repository, make your changes, and submit a pull request with clear documentation of your modifications.
