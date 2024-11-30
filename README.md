# CloudStock: Modernizing and Simplifying Inventory Management with Cloud Technology

![React](https://img.shields.io/badge/React-v18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-v4.0.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-v4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-v5.10.0-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-v4.12.0-000000?style=for-the-badge&logo=fastify&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-v6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-v6.9.0-AA2929?style=for-the-badge)

## Project Overview

**CloudStock** is a prototype application developed as a college project to modernize and streamline inventory management by leveraging cloud-based technology. While this project is not hosted on a global cloud platform and utilizes a local database setup, it demonstrates the core principles of transitioning traditional inventory systems to the cloud.

The primary goal of CloudStock is to enhance operational efficiency, reduce IT infrastructure costs, and ensure data security and integrity through advanced features. With this system, companies can access inventory information remotely and in real-time, enabling more precise tracking of product flow and better decision-making.

---

## Features

- **Modern UI/UX**: Built with [Material UI (MUI)](https://mui.com/) for a responsive and accessible interface.
- **Real-time Inventory Updates**: Leverages MongoDB and Fastify for a smooth backend experience.
- **Scalability in Design**: Uses modular code with [React Vite](https://vitejs.dev/) and TypeScript.
- **Local Database Storage**: Demonstrates cloud principles using a locally hosted MongoDB database.
- **Security Focus**: Emphasizes safe data handling through TypeScript and Mongoose models.

---

## Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **UI Library**: [Material UI (MUI)](https://mui.com/)

### Backend
- **Framework**: [Fastify](https://www.fastify.io/)
- **Language**: TypeScript
- **Database**: [MongoDB](https://www.mongodb.com/) (Local Instance)
- **ORM**: [Mongoose](https://mongoosejs.com/)

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB installed and running locally
- npm or yarn installed

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/cloudstock.git
   cd cloudstock```

2. **Install Dependencies**:
- For the frontend:
   ```bash
    cd frontend
     npm install
    ```
- For the backend:
   ```bash
    cd backend
    npm install
   ```

3. Run the Application:

- Start the MongoDB server locally.
- Launch the backend server:
   ```bash
  cd backend
  npm run dev
  ```
- Launch the frontend:
  ```bash
  cd frontend
  npm run dev
  ```
4. Access the application via your browser at `http://localhost:5173`.


