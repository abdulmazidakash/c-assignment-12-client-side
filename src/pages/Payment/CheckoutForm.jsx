import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaCreditCard } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { ThemeContext } from '../../context/ThemeContext';

const CheckoutForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const { darkMode } = useContext(ThemeContext);

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch scholarship data
  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/scholarships/${id}`);
      return data;
    },
  });

  useEffect(() => {
    if (scholarship.applicationFees) {
      axiosSecure
        .post('/create-payment-intent', { applicationFees: scholarship.applicationFees })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(() => {
          toast.error('Failed to create payment intent.');
        });
    }
  }, [axiosSecure, scholarship.applicationFees]);

  // Handle checkout form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      toast.error('Stripe is not loaded.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error('Card details are not entered.');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      toast.error(error.message);
      return;
    } else {
      setError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      toast.error(confirmError.message);
    } else if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);
      toast.success(`Payment successful! Transaction ID: ${paymentIntent.id}`);
      navigate(`/dashboard/applyScholarship/${id}`);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!scholarship) return <p>Error: Scholarship data not found.</p>;

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <MdPayment className="text-blue-500 dark:text-blue-400" />
          Scholarship Payment
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
          Complete your payment securely and easily
        </p>
      </div>

      {/* Payment Form */}
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg border border-gray-300 dark:border-gray-600">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
          <FaCreditCard className="text-green-600 dark:text-green-400" />
          Enter Your Payment Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border border-gray-400 dark:border-gray-200 rounded-md bg-gray-100 dark:bg-gray-900">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '18px',
                    color: darkMode ? '#ffffff' : '#424770',
                    backgroundColor: 'transparent',
                    '::placeholder': {
                      color: darkMode ? '#e5e7eb' : '#aab7c4',
                    },
                    padding: '10px',
                  },
                  invalid: {
                    color: '#ff4d4d',
                  },
                },
              }}
            />
          </div>
          <button
            className={`bg-gradient-to-tr ${darkMode ? 'from-sky-700 to-slate-800' : 'from-sky-900 to-slate-800'} text-white font-semibold btn mt-4 w-full`}
            type="submit"
            disabled={!stripe || !clientSecret || !scholarship.applicationFees}
          >
            Pay ${scholarship.applicationFees || 0}
          </button>
          {error && <p className="text-red-600 text-center">{error}</p>}
          {transactionId && (
            <p className="text-green-600 text-center">
              Your Transaction ID: <span className="font-semibold">{transactionId}</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
