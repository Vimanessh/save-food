# Save Food – Food Donation & Waste Reduction Platform

Save Food is a full-stack web application designed to reduce food waste by connecting food donors (restaurants, hotels, individuals) with receivers (NGOs and needy people).

## 🚀 Technologies Used

- **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcryptjs
- **State Management:** React Hooks
- **API Client:** Axios
- **Notifications:** React Toastify

## ✨ Main Features

- **Role-Based Access Control:** Donor, Receiver, and Admin roles.
- **Donor Dashboard:** 
  - Post food donations with details (title, quantity, expiry, address).
  - Manage (edit/delete) donations.
  - View and manage incoming requests from receivers.
- **Receiver Dashboard:**
  - Browse available food listings.
  - Search and filter by city and food type (Veg/Non-Veg).
  - Request food and track request status history.
- **Admin Dashboard:**
  - Manage all users (view/delete).
  - Overview of all donations and requests.
  - System-wide statistics.
- **Responsive Design:** Fully optimized for desktop and mobile devices.
- **Real-time Notifications:** Toast notifications for actions like login, registration, and requests.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### 1. Clone the repository
```bash
git clone <repository-url>
cd save-food
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/save-food
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd client
npm install
```

### 4. Running the Application
To run both frontend and backend concurrently from the root directory:
```bash
npm run dev
```
- Frontend will run on: `http://localhost:3000`
- Backend will run on: `http://localhost:5000`

## 🔄 Workflow

1. **Donor** registers and logs in.
2. **Donor** adds a food donation listing.
3. **Receiver** registers and logs in.
4. **Receiver** browses listings and finds a suitable donation.
5. **Receiver** clicks "Request Food".
6. **Donor** sees the request in their dashboard and "Approves" it.
7. **Receiver** gets the donor's contact details and coordinates the pickup.
8. **Donor** marks the donation as "Delivered" once picked up.

## 🌐 Deployment

### Frontend (Vercel)
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Set the build command to `npm run build` and the output directory to `dist`.
4. Add environment variables if any.

### Backend (Render)
1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Set the build command to `npm install` and start command to `node server.js`.
4. Add your environment variables in the Render dashboard.
