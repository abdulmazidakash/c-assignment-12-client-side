- Banner Image
![App Screenshot](https://i.ibb.co.com/KpypCWf0/sholarship-Hub-banner.jpg)
 
# 🌟 ScholarshipHub 🚀

ScholarshipHub is a comprehensive Scholarship Management System designed to assist students in searching for suitable universities and scholarships. It also facilitates the application process, allowing students to apply for scholarships directly through the platform. The system supports three types of users: default users, administrators, and moderators. Upon registration, a user is assigned the 'user' role by default. Administrators have the capability to change user roles as needed.

---
---

## 🌐 Live Demo
--
Netlify Live Link:
🔗 **[https://scholarship-hub-akash.netlify.app/])**

---
--
Firebase Live Link:
🔗 **[https://assignment-12-23.web.app/])**

---
--
Vercel Link:
🔗 **[https://assignment-12-server-side-black.vercel.app/])**

---

---

## 📦 NPM Packages Frontend

This project uses the following NPM packages:

| 📦 Package             | 📋 Description                       |
|------------------------|---------------------------------------|
| **Tailwind CSS**       | Modern and responsive CSS framework  |
| **DaisyUI**            | Predefined UI components             |
| **React Router DOM**   | Routing and navigation               |
| **React Hot Toast**    | Interactive toast notifications      |
| **React Icons**        | Sleek and modern icons               |
| **React Helmet**       | Manage dynamic page titles           |
| **React Helmet**       | Manage dynamic page payment           |
| **@stripe/react-stripe-js**       | payment            |
| **@tanstack/react-queryt**       | fetch data            |
| **axios**       | fetch data            |
| **chart.js**       | --            |
| **date-fns**       | --            |
| **localforage**       | --            |
| **firebase**       | --            |
| **match-sorter**       | --            |
| **react**       | --            |
| **react-chartjs-2**       | --            |
| **react-datepicker**       | --            |
| **react-dom**       | --            |
| **react-fast-marquee**       | --            |
| **react-hot-toast**       | --            |
| **react-responsive-carousel**       | --            |
| **react-slick**       | --            |
| **slick-carousel**       | --            |
| **sweetalert2**       | --            |
| **swiper**       | --            |
-

---
---

## 📦 NPM Packages Backend

This project uses the following NPM packages:

| 📦 Package             | 📋 Version                       |
|------------------------|---------------------------------------|
| **cors**       | 2.8.5  |
| **dotenv**            | 16.4.7          |
| **express**   | 4.21.2|
| **jsonwebtoken**   | 9.0.2|
| **mongodb**   | 6.12.0|
| **morgan**   | 1.10.0|
| **stripe**   | 17.5.0|


---
## ✨ Key Features
---
Studend Features:
- Search for universities and available scholarships.
- Apply for scholarships directly through the platform.
- Track application status and receive notifications.


---
---
Administrator Features:
- Manage user roles and permissions.
- Oversee scholarship listings and applications.
- Generate reports on application statistics and outcomes.

---
---
Moderator Features:
- Review and approve or reject scholarship applications.
- Communicate with applicants for additional information.

---
---

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Styling Framework**: Tailwind CSS with DaisyUI components
- **Notifications**: SweetAlert2 and react-hot-toast for user-friendly alerts
---

### **Development Dependencies**
These packages assist in development but are not included in production builds:  

- `@eslint/js`, `eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` - Linting and code quality  
- `@types/react`, `@types/react-dom` - TypeScript support for React  
- `@vitejs/plugin-react` - React plugin for Vite  
- `autoprefixer`, `postcss`, `tailwindcss`, `daisyui` - CSS utilities and framework  
- `vite` - Build tool and development server  
- `globals` - Shared global variables  

---

## ⚙️ **Setting Up the Project Locally**  

Follow these steps to set up and run the project on your local machine.  

### **1️⃣ Prerequisites**  
Ensure you have the following installed:  
- **Node.js** (Latest LTS version recommended) - [Download Here](https://nodejs.org/)  
- **Package Manager** (npm or yarn)  
- **Git** (Optional, for cloning the repository)  

### **2️⃣ Clone the Repository**  
If you haven't cloned the project yet, run:  
```sh
git clone <repository_url>
cd <project_folder>
```

### **3️⃣ Install Dependencies**  
Run the following command to install all required packages:  
```sh
npm install
```
or  
```sh
yarn install
```

### **4️⃣ Configure Environment Variables**  
Create a `.env` file in the root directory and add the necessary environment variables. These might include:  
```
REACT_APP_API_KEY=your_api_key_here
REACT_APP_FIREBASE_CONFIG=your_firebase_config_here
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_key_here
```
📌 *Ensure you get the correct values from your Firebase, Stripe, or API providers.*  

### **5️⃣ Start the Development Server**  
Run the following command to start the local development server:  
```sh
npm run dev
```
or  
```sh
yarn dev
```

This will start the Vite development server, and you should see the project running at:  
```
http://localhost:5173
```

### **6️⃣ Build for Production (Optional)**  
To create an optimized production build, run:  
```sh
npm run build
```
or  
```sh
yarn build
```

### **7️⃣ Run the Production Build Locally (Optional)**  
To preview the production build locally:  
```sh
npm run preview
```
or  
```sh
yarn preview
```

---

## 🎯 **You're All Set!**  
Now you can start developing and testing the project locally. 🚀  