import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const CheckoutForm = () => {

	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async(event) =>{
		event.preventDefault();

		if(!stripe || !elements){
			return;
		}

		const card = elements.getElement(CardElement);

		if(card === null){
			return;
		}
	}
	return (
		<div>
			<form onSubmit={handleSubmit} action="">
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
				/>
			</form>
		</div>
	);
};

export default CheckoutForm;