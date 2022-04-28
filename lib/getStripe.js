import { loadStripe } from '@stripe/stripe-js';


let stripePromise; // undefined at 1st...


const getStripe = () => {

    // kind of --> Single Tone Design Pattern for object/instance creation...
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }

    return stripePromise;
}


export default getStripe;