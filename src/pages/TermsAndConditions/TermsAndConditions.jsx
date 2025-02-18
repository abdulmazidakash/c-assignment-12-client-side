import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const TermsAndConditions = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className={`my-8 rounded-lg ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} p-6 md:p-12`}>


      {/* Page Content */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 md:p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
          Terms & Conditions
        </h1>

        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 text-center">
          Last Updated: February 2025
        </p>

        <div className="space-y-6 text-justify">
          <section>
            <h2 className="text-xl font-semibold text-secondary">1. Introduction</h2>
            <p>
              Welcome to ScholarshipHub! By accessing or using our services, you agree
              to comply with and be bound by these Terms and Conditions. If you do not
              agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary">2. User Responsibilities</h2>
            <p>
              Users must provide accurate information when creating an account. Any form
              of misrepresentation or fraudulent activity may result in suspension or
              termination of access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary">3. Privacy Policy</h2>
            <p>
              We respect your privacy and are committed to protecting your personal
              information. Please review our Privacy Policy to understand how we
              collect, use, and safeguard your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-secondary">4. Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these Terms and Conditions at any
              time. Continued use of our services after changes are posted constitutes
              acceptance of the revised terms.
            </p>
          </section>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-center mt-6">
          <input type="checkbox" id="agree" className="checkbox checkbox-primary" />
          <label htmlFor="agree" className="ml-2 text-sm">
            I have read and agree to the Terms and Conditions.
          </label>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
