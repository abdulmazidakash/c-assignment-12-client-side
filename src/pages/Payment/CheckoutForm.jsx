import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaCreditCard } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

const CheckoutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

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
        .catch((error) => {
          toast.error('Failed to create payment intent.');
        });
    }
  }, [axiosSecure, scholarship.applicationFees]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe is not loaded.');
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
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
        card: card,
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
      toast.success('Payment successful!');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!scholarship) return <p>Error: Scholarship data not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <MdPayment className="text-blue-600" />
          Scholarship Payment
        </h1>
        <p className="text-lg text-gray-600">Complete your payment securely and easily</p>
      </div>

      {/* Payment Form */}
      <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700">
          <FaCreditCard className="text-green-500" />
          Enter Your Payment Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            className="btn btn-primary w-full mt-4"
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
