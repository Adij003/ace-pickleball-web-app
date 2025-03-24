import { useNavigate } from "react-router-dom";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

function MembershipDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white p-4 flex justify-center shadow-2xl">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 w-full max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md mb-4"
        >
          <IoArrowBack />
          <span>Back</span>
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-amber-400">
          ACE PICKLEBALL CLUB, BHOPAL
        </h1>

        {/* Rental Section */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold bg-amber-500 text-white p-2 rounded-lg">
            A. RENTAL
          </h2>
          <ul className="mt-2 text-md">
            <li className="flex justify-between border-b py-2">
              <span>Rental per Court (Weekdays)</span>
              <span>₹800.00</span>
            </li>
            <li className="flex justify-between border-b py-2">
              <span>Rental per Court (Weekends)</span>
              <span>₹1,000.00</span>
            </li>
          </ul>
        </section>

        {/* Membership Section */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold bg-amber-500 text-white p-2 rounded-lg">
            B. MEMBERSHIPS
          </h2>
          <ul className="mt-2 text-md">
            <li className="flex justify-between border-b py-2">
              <span>Normal Membership Per Person</span>
              <span>₹5,000.00</span>
            </li>
            <li className="flex justify-between border-b py-2">
              <span>Normal Membership Per Court</span>
              <span>₹20,000.00</span>
            </li>
          </ul>
        </section>

        {/* Special Combo Membership Section */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold bg-amber-500 text-white p-2 rounded-lg">
            C. SPECIAL COMBO MEMBERSHIP
          </h2>
          <ul className="mt-2 text-md">
            <li className="flex justify-between border-b py-2">
              <span className="flex-col flex">Couple Membership <span>
              (One Male + One Female)</span></span>
              <span>₹9,000.00</span>
            </li>
            <li className="flex justify-between border-b py-2">
              <span className="flex flex-col">Family Membership <span>(Husband + Wife + 2 Kids)</span></span>
              <span>₹18,000.00</span>
            </li>
            <li className="flex justify-between border-b py-2">
              <span className="flex flex-col">Family Membership <span>(Husband + Wife + 1 Kid)</span></span>
              <span>₹13,500.00</span>
            </li>
          </ul>
        </section>

        {/* Note Section */}
        <section className="mt-6 text-sm text-gray-700 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">NOTE</h3>
          <ul className="list-disc ml-6 mt-2">
            <li>Quarterly Membership will get 5% additional discount on the fees.</li>
            <li>Half-Yearly Membership will get 10% additional discount on the fees.</li>
            <li>Yearly Membership will get 15% additional discount on the fees.</li>
            <li>Corporate Collaboration is also available.</li>
            <li>Bookings for events like birthdays are also available.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default MembershipDetails;
