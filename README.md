<!--1. project banner image -->
## 🌟 ScholarshipHub 🚀

![App Screenshot](https://i.ibb.co.com/KpypCWf0/sholarship-Hub-banner.jpg)

<!--2. project overview -->

ScholarshipHub is a comprehensive Scholarship Management System designed to assist students in searching for suitable universities and scholarships. It also facilitates the application process, allowing students to apply for scholarships directly through the platform. The system supports three types of users: default users, administrators, and moderators. Upon registration, a user is assigned the 'user' role by default. Administrators have the capability to change user roles as needed.

---

<!--3. live project links and other relevant resources -->

## 🌐 Live Demo


| 📦 Build Site             | 📋 Link                       |
|------------------------|---------------------------------------|
| **Netlify**       | 🔗 **[https://scholarship-hub-akash.netlify.app/])**  |
| **Firebase**       | 🔗 **[https://assignment-12-23.web.app/])**  |
| **Vercel**       | 🔗 **[https://assignment-12-server-side-black.vercel.app/])**  |


---

<!--4. main technologies used list -->

## ‍💻 Technologies Used

- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Styling Framework**: Tailwind CSS with DaisyUI components
- **Notifications**: SweetAlert2 and react-hot-toast for user-friendly alerts
---

<!--5. core features of the project -->

## ✨ Key Features

#### Student Features:
- Search for universities and available scholarships.
- Apply for scholarships directly through the platform.
- Track application status and receive notifications.


#### Administrator Features:
- Manage user roles and permissions.
- Oversee scholarship listings and applications.
- Generate reports on application statistics and outcomes.


#### Moderator Features:
- Review and approve or reject scholarship applications.
- Communicate with applicants for additional information.

---

<!--6. mention the dependencies used list -->

# 🚀 Full Stack Project Setup Guide  

This guide will help you set up and run both the **frontend** and **backend** of your project locally using **npm**.  

---

## 📦 Dependencies  

### **Backend Dependencies**  
The backend is built using **Node.js** and **Express** with the following dependencies:  

| Package       | Version  | Description |
|--------------|----------|-------------|
| `cors`       | ^2.8.5   | Enables cross-origin requests |
| `dotenv`     | ^16.4.7  | Manages environment variables |
| `express`    | ^4.21.2  | Web framework for Node.js |
| `jsonwebtoken` | ^9.0.2 | Handles JWT authentication |
| `mongodb`    | ^6.12.0  | MongoDB database driver |
| `morgan`     | ^1.10.0  | HTTP request logger |
| `stripe`     | ^17.5.0  | Payment processing with Stripe |

### **Frontend Dependencies**  
The frontend is built using **React** and **Vite**, utilizing these dependencies:  

#### **Core Libraries**  
| Package               | Version  | Description |
|-----------------------|----------|-------------|
| `react`              | ^18.3.1  | Core React library |
| `react-dom`          | ^18.3.1  | React DOM rendering |
| `react-router-dom`   | ^7.1.1   | Client-side routing |

#### **State Management & API Handling**  
| Package                   | Version  | Description |
|---------------------------|----------|-------------|
| `@tanstack/react-query`  | ^5.64.1  | Data fetching and caching |
| `axios`                  | ^1.7.9   | HTTP client for API requests |

#### **UI & Styling**  
| Package               | Version  | Description |
|-----------------------|----------|-------------|
| `@headlessui/react`  | ^2.2.0   | Accessible UI components |
| `daisyui`            | ^4.12.23 | UI components for Tailwind CSS |
| `tailwindcss`        | ^3.4.17  | Utility-first CSS framework |
| `postcss`            | ^8.5.1   | CSS processing tool |
| `autoprefixer`       | ^10.4.20 | Vendor prefixing for CSS |
| `react-icons`        | ^5.4.0   | Icon library for React |

#### **Charts & Data Visualization**  
| Package             | Version  | Description |
|---------------------|----------|-------------|
| `chart.js`         | ^4.4.7   | Chart rendering library |
| `react-chartjs-2`  | ^5.3.0   | React wrapper for Chart.js |
| `react-datepicker`  | ^7.6.0   | Date picker component |

#### **Performance & UX Enhancements**  
| Package                      | Version  | Description |
|------------------------------|----------|-------------|
| `react-fast-marquee`        | ^1.6.5   | Marquee scrolling effect |
| `react-helmet-async`        | ^2.0.5   | SEO metadata management |
| `react-hot-toast`           | ^2.5.1   | Notifications and toast messages |
| `react-responsive-carousel` | ^3.2.23  | Carousel component |
| `react-slick`               | ^0.30.3  | Slick carousel for React |
| `slick-carousel`            | ^1.8.1   | Carousel slider styles |
| `swiper`                    | ^11.2.1  | Swiping and carousel functionality |
| `sweetalert2`               | ^11.15.10 | Alert and modal popups |
| `match-sorter`              | ^8.0.0   | Sorting and filtering utilities |
| `sort-by`                   | ^1.2.0   | Sorting utility |
| `localforage`               | ^1.10.0  | Local storage handling |
| `date-fns`                  | ^4.1.0   | Date manipulation |

### **Development Dependencies**  
| Package                     | Version  | Description |
|-----------------------------|----------|-------------|
| `@eslint/js`               | ^9.17.0  | ESLint core |
| `eslint`                   | ^9.17.0  | Linter for JavaScript |
| `eslint-plugin-react`       | ^7.37.2  | React-specific linting rules |
| `eslint-plugin-react-hooks` | ^5.0.0   | Hooks-specific linting rules |
| `eslint-plugin-react-refresh` | ^0.4.16 | Linting for React Refresh |
| `@types/react`             | ^18.3.18 | TypeScript definitions for React |
| `@types/react-dom`         | ^18.3.5  | TypeScript definitions for React DOM |
| `@vitejs/plugin-react`     | ^4.3.4   | React plugin for Vite |
| `vite`                     | ^6.0.5   | Build tool and development server |
| `globals`                  | ^15.14.0 | Shared global variables |

---

## 🚀 Setting Up the Project Locally  

### **1️⃣ Prerequisites**  
Ensure you have the following installed:  
- **Node.js** (Latest LTS version recommended) - [Download Here](https://nodejs.org/)  
- **npm** (Comes with Node.js)  
- **MongoDB** (If running the backend locally) - [Download Here](https://www.mongodb.com/)  
- **Git** (Optional, for cloning the repository)  

---

## 🖥️ Backend Setup  

### **2️⃣ Clone the Backend Repository**  
```sh
git clone <https://github.com/abdulmazidakash/c-assignment-12-server-side.git>
cd <backend_project_folder>
```

### **3️⃣ Install Dependencies**  
```sh
npm install
```

### **4️⃣ Configure Environment Variables**  
Create a `.env` file in the backend root directory and add the required environment variables. Example:  
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```
📌 *Ensure you use the correct credentials for MongoDB and Stripe.*  

### **5️⃣ Start the Backend Server**  
```sh
npm start
```
or  
```sh
npm run dev  # If using nodemon
```
The backend will run at:  
```
http://localhost:5000
```

---

## 💻 Frontend Setup  

### **6️⃣ Clone the Frontend Repository**  
```sh
git clone <https://github.com/abdulmazidakash/c-assignment-12-client-side.git>
cd <frontend_project_folder>
```

### **7️⃣ Install Dependencies**  
```sh
npm install
```

### **8️⃣ Configure Environment Variables**  
Create a `.env` file in the frontend root directory and add necessary variables. Example:  
```
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_CONFIG=your_firebase_config_here
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
```
📌 *Ensure the API base URL matches the backend server's URL.*  

### **9️⃣ Start the Frontend Server**  
```sh
npm run dev
```
The frontend will be available at:  
```
http://localhost:5173
```

---

## 🎯 **You're All Set!**  
Now both the **backend** and **frontend** should be running successfully. 🚀  
If you run into any issues, check the troubleshooting section or consult the project's documentation.  
