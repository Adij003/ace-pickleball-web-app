import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentFail() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
                <p className="text-gray-500 mt-2">Something went wrong. Please try again.</p>

                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}

export default PaymentFail;
