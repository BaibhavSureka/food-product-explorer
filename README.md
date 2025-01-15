# Food Product Explorer

![WhatsApp Image 2025-01-15 at 16 14 34_bcc233ac](https://github.com/user-attachments/assets/9c459b59-62a6-48f2-9401-a9a3e5f9005e)

An end-to-end web application built with **React** for the front-end and **Node.js** with **Express** for the back-end. This application allows users to search, filter, and view detailed information about food products using the **OpenFoodFacts API**.

## Features

- **Search Functionality**: Users can search for food products by name.
- **Category Filter**: Filter products by category (e.g., Snacks, Beverages, Dairy).
- **Sorting Options**: Sort products by product name, nutritional score, etc.
- **Product Details**: Click on a product to view detailed information like ingredients, nutritional facts, and labels.
- **Responsive UI**: Built with **React** and **TailwindCSS** for a smooth and responsive user experience across devices.
- **State Management**: Global state management using **React Context API** for handling filters, search queries, and other dynamic states.

![WhatsApp Image 2025-01-15 at 16 15 07_9b668a87](https://github.com/user-attachments/assets/eac9954e-b9dc-45a6-bab6-98be8120ed4e)

![WhatsApp Image 2025-01-15 at 16 15 45_ef70547b](https://github.com/user-attachments/assets/6d44f1e4-905f-4108-ac9d-5bbc76e6e145)

## Technologies Used

- **Frontend**: React.js, TailwindCSS, Axios
- **Backend**: Node.js, Express.js
- **API**: OpenFoodFacts API
- **State Management**: React Context API

## Setup & Installation

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/food-product-explorer.git
cd food-product-explorer
```

### 2. Install Dependencies

Install the required packages for both client and server:

```bash
# For server (backend)
cd Backend
npm install

# For client (frontend)
cd Frontend
npm install
```

### 3. Run the Application

**Backend**
To run the server locally:
```bash
node server.js
```

**Frontend**
To start the React app:
```bash
npm run dev
```

### 4. Test the API

Use Postman or any other API testing tool to test the backend routes and ensure data fetching from OpenFoodFacts API works as expected.

## Dependencies

### Backend
- `express`: Web framework for Node.js
- `axios`: Promise-based HTTP client for making requests to the OpenFoodFacts API
- `dotenv`: Loads environment variables from the `.env` file

### Frontend
- `react`: JavaScript library for building user interfaces
- `react-router-dom`: React routing for handling different views
- `axios`: HTTP client for fetching product data
- `tailwindcss`: Utility-first CSS framework for building custom designs

## Future Enhancements

- Implement group chat functionality
- Add message read receipts and typing indicators
- Improve the UI/UX design with advanced features

## License

This project is open-source and available under the MIT License.
