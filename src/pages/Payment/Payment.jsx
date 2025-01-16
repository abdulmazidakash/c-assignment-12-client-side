import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

//todo: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gatway_PK)
const Payment = () => {

	

	return (
		<div>
			<Elements stripe={stripePromise}>
				<CheckoutForm/>
			</Elements>
		</div>
	);
};

export default Payment;