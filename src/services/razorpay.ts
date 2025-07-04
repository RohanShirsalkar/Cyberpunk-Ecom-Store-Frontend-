import axios from 'axios';

export const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};


export const handleRzpPayment = async (userId: string, orderId: string, cb: (isSuccess: boolean) => void) => {
    const res = await loadRazorpay();
    if (!res) return alert('Razorpay SDK failed to load');

    // 1. Create order on backend

    const orderResponse = await axios.post('http://localhost:5000/order/create-rzp-order', {
        amount: 499,
        receipt: 'receipt#1'
    });

    const rzpOrder = orderResponse.data;

    // 2. Open Razorpay payment window
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from .env
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: "My Ecom",
        description: "Test Transaction",
        order_id: rzpOrder.id,
        handler: async function (response: any) {
            // Send response to backend for verification
            const verifyRes = await axios.post('http://localhost:5000/order/rzp-payment-verify', { ...response, orderId: orderId, userId: userId }, {
                headers: { 'Content-Type': 'application/json' },
            });

            const data = verifyRes.data;
            cb(data.success)
        },
        prefill: {
            name: "Rohan",
            email: "rohan@example.com",
            contact: "9999999999"
        },
        theme: {
            color: "#3399cc"
        }
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();
};
