import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-opacity-30 bg-gradient-to-tr from-sky-800 to-slate-800 backdrop-blur-md text-white shadow-lg">
      <div className="text-center">
        <FaExclamationTriangle className="text-yellow-300 text-8xl mb-6 animate-bounce mx-auto" />
        <h1 className="text-5xl font-extrabold mb-3">Oops! 404 Error</h1>
        <p className="text-lg font-medium mb-6">We can't find the page you're looking for.</p>
        <a 
          href="/" 
          className="btn btn-accent text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl">
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;