import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

//todo: add publishable key
const stripePromise = loadStripe('')
const Payment = () => {
	return (
		<div>
			<Elements stripe={stripePromise}>

			</Elements>
		</div>
	);
};

export default Payment;