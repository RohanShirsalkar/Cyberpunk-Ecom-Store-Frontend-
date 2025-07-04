import { useState } from "react";
import { Shield, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCartState } from "../store/cart/cartSlice";
import CheckoutProductCart from "../components/checkoutPage/CheckoutProductCart";
import CheckoutPromoCode from "../components/checkoutPage/CheckoutPromoCode";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../api/order/orderServices";
import { showErrorToast, showSuccessToast } from "../store/app/appSlice";
import { getAuthState } from "../store/auth/authSlice";
import { type PaymentMethod } from "../api/models/orderModel";
import ConfirmationDialog from "../components/checkoutPage/ConfirmationDialog";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { handleRzpPayment } from "../services/razorpay";

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  state: string;
  phone: string;
};

type FormErrors = {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  state?: string;
  phone?: string;
};

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState<boolean>(false);

  const {
    cartItems,
    cartTotal,
    discountedTotal,
    discountAmount,
    appliedCoupon,
    totalItmes,
  } = useSelector(getCartState);

  const { userId } = useSelector(getAuthState);
  const { getCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    state: "",
    phone: "",
  });

  const resetForm = () => {
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      state: "",
      phone: "",
    });
    setErrors({});
  };

  const shipping: number = 0;
  const dispatch = useDispatch();

  const { mutate: placeOrder } = useMutation({
    mutationKey: ["place-order"],
    mutationFn: createOrder,
    onSuccess: (res) => {
      // handle razorpay payment
      if (res.isPending) {
        // takes orderId and callback function
        handleRzpPayment(userId, res.order._id!, (isSuccess) => {
          setIsProcessing(false);
          if (isSuccess) {
            dispatch(
              showSuccessToast({
                title: "Placed",
                message: "Order placed successfully",
              })
            );
            resetForm();
            getCart();
            navigate("/");
          } else {
            dispatch(
              showErrorToast({
                title: "Not Placed",
                message: "Something went wrong",
              })
            );
          }
        });
        return;
      } else {
        // handle cash on delivery payment
        setIsProcessing(false);
        dispatch(
          showSuccessToast({
            title: "Placed",
            message: "Order placed successfully",
          })
        );
        resetForm();
        getCart();
        navigate("/");
      }
    },
    onError: (error) => {
      setIsProcessing(false);
      console.log(error);
      dispatch(
        showErrorToast({ title: "Not Placed", message: "Order not placed" })
      );
    },
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const processPayment = () => {
    setIsProcessing(true);
    placeOrder({
      userId,
      orderItems: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.productQty,
        price: item.price,
        image: item.img,
      })),
      shippingInfo: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.zip,
        state: formData.state,
        country: formData.country,
        phone: formData.phone,
      },
      coupon: appliedCoupon ? appliedCoupon._id : null,
      itemsPrice: parseFloat(cartTotal),
      taxPrice: 0,
      shippingPrice: shipping,
      discountPrice: parseFloat(discountAmount),
      totalPrice: parseFloat(discountedTotal) + shipping,
      paymentMethod: paymentMethod,
    });
  };

  const handleConfirmation = (action: "confirm" | "cancel") => {
    if (action === "confirm") {
      processPayment();
      //   handleRzpPayment();
    }
    setIsConfirmationDialogOpen(false);
  };

  const openConfirmationDialog = () => {
    if (!validateForm()) {
      return;
    }
    setIsConfirmationDialogOpen(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 pb-8">
      {isConfirmationDialogOpen && (
        <ConfirmationDialog handleConfirmation={handleConfirmation} />
      )}
      <div className="my-12">
        <h1 className="text-3xl sm:text-5xl text-center font-bold text-cyan-400 mb-2">
          SECURE_CHECKOUT
        </h1>
        {/* <div className="h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 w-32"></div> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="border border-cyan-900 bg-black/60">
            <div className="border-b border-cyan-900 p-4 bg-cyan-900/20">
              <h2 className="text-lg font-bold text-cyan-400">
                CONTACT INFORMATION
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL ADDRESS"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-black border text-cyan-400 px-4 py-3 placeholder-cyan-700 focus:outline-none ${
                      errors.email
                        ? "border-red-500"
                        : "border-cyan-900 focus:border-cyan-400"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div></div>
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="FIRST NAME"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-black border text-cyan-400 px-4 py-3 placeholder-cyan-700 focus:outline-none ${
                      errors.firstName
                        ? "border-red-500"
                        : "border-cyan-900 focus:border-cyan-400"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="LAST NAME"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-black border text-cyan-400 px-4 py-3 placeholder-cyan-700 focus:outline-none ${
                      errors.lastName
                        ? "border-red-500"
                        : "border-cyan-900 focus:border-cyan-400"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border border-cyan-900 bg-black/60">
            <div className="border-b border-cyan-900 p-4 bg-cyan-900/20">
              <h2 className="text-lg font-bold text-cyan-400">
                SHIPPING ADDRESS
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="STREET ADDRESS"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full bg-black border text-cyan-400 px-4 py-3 placeholder-cyan-700 focus:outline-none ${
                      errors.address
                        ? "border-red-500"
                        : "border-cyan-900 focus:border-cyan-400"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="city"
                      placeholder="CITY"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full bg-black border text-cyan-400 px-4 py-3 placeholder-cyan-700 focus:outline-none ${
                        errors.city
                          ? "border-red-500"
                          : "border-cyan-900 focus:border-cyan-400"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP CODE"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className={`w-full bg-black border text-cyan-400 px-4 py-3 placeholder-cyan-700 focus:outline-none ${
                        errors.zip
                          ? "border-red-500"
                          : "border-cyan-900 focus:border-cyan-400"
                      }`}
                    />
                    {errors.zip && (
                      <p className="text-red-400 text-xs mt-1">{errors.zip}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="country"
                      placeholder="COUNTRY"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`w-full bg-black border text-cyan-400 px-4 py-3 placeholder-cyan-700 focus:outline-none ${
                        errors.country
                          ? "border-red-500"
                          : "border-cyan-900 focus:border-cyan-400"
                      }`}
                    />
                    {errors.country && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="state"
                      placeholder="STATE"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full bg-black border text-cyan-400 px-4 py-3 placeholder-cyan-700 focus:outline-none ${
                        errors.state
                          ? "border-red-500"
                          : "border-cyan-900 focus:border-cyan-400"
                      }`}
                    />
                    {errors.state && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="phone"
                      placeholder="PHONE"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-black border text-cyan-400 px-4 py-3 placeholder-cyan-700 focus:outline-none ${
                        errors.phone
                          ? "border-red-500"
                          : "border-cyan-900 focus:border-cyan-400"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border border-cyan-900 bg-black/60">
            <div className="border-b border-cyan-900 p-4 bg-cyan-900/20">
              <h2 className="text-lg font-bold text-cyan-400">
                PAYMENT METHOD
              </h2>
            </div>
            <div className="p-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`px-4 py-2 border font-bold transition-all ${
                    paymentMethod === "cash"
                      ? "border-cyan-400 bg-cyan-400 text-black"
                      : "border-cyan-900 text-cyan-400 hover:border-cyan-400"
                  }`}
                >
                  CASH ON DELIVERY
                </button>
                <button
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`px-4 py-2 border font-bold transition-all ${
                    paymentMethod === "razorpay"
                      ? "border-cyan-400 bg-cyan-400 text-black"
                      : "border-cyan-900 text-cyan-400 hover:border-cyan-400"
                  }`}
                >
                  RAZORPAY
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="border border-cyan-900 bg-black/60">
            <div className="border-b border-cyan-900 p-4 bg-cyan-900/20">
              <h2 className="text-lg font-bold text-cyan-400">ORDER SUMMARY</h2>
            </div>
            <div className="p-4 space-y-4">
              {cartItems?.map((item) => (
                <CheckoutProductCart key={item?._id} item={item} />
              ))}
            </div>
          </div>

          {/* Promo Code */}
          {totalItmes > 0 && (
            <CheckoutPromoCode appliedCoupon={appliedCoupon} />
          )}

          {/* Price Summary */}
          <div className="border border-cyan-900 bg-black/60">
            <div className="p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-cyan-600">SUBTOTAL:</span>
                <span className="text-cyan-400">${cartTotal}</span>
              </div>
              {appliedCoupon && (
                <>
                  <div className="flex justify-between">
                    <span className="text-green-600">TOTAL SAVINGS</span>
                    <span className="text-green-400">${discountAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-600">
                      DISCOUNT ({appliedCoupon?.code})
                    </span>
                    <span className="text-cyan-400">
                      {appliedCoupon?.discountPercentage}%
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-cyan-600">SHIPPING:</span>
                <span className="text-cyan-400">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-cyan-900 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-cyan-400">TOTAL:</span>
                  <span className="text-pink-400">
                    ${discountedTotal + shipping}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="border border-green-900 bg-green-900/20 p-4">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-400 font-bold">
                SECURE TRANSACTION
              </span>
            </div>
            <p className="text-green-300 text-xs">
              256-bit SSL encryption and quantum-resistant protocols ensure your
              data remains secure.
            </p>
          </div>

          {/* Complete Order Button */}
          <button
            onClick={openConfirmationDialog}
            disabled={isProcessing || cartItems.length === 0}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 font-bold transition-all duration-300 border border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/25 disabled:opacity-50"
          >
            <div className="flex items-center justify-center">
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  PROCESSING PAYMENT...
                </>
              ) : cartItems.length === 0 ? (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  CART IS EMPTY
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  COMPLETE SECURE ORDER
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
