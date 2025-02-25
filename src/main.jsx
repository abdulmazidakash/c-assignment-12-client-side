
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import { RouterProvider} from "react-router-dom";
// import { router } from './Routes/Routes';
// import { HelmetProvider } from 'react-helmet-async';
// import AuthProvider from './providers/AuthProvider';
// import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
// import { Toaster } from 'react-hot-toast';
// import ThemeProvider from './context/ThemeContext';

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Toaster position="top-center" reverseOrder={false} />
//     <AuthProvider>
//       <QueryClientProvider client={queryClient}>
//         <HelmetProvider>
//          <ThemeProvider>
//          <div className=''>
//             <RouterProvider router={router} />
//           </div>
//          </ThemeProvider>
//         </HelmetProvider>
//       </QueryClientProvider>
//     </AuthProvider>
//   </React.StrictMode>,
// )
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { router } from './Routes/Routes';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from './context/ThemeContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
