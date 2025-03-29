import { useNavigate } from "react-router-dom";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

function MembershipDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md mb-4 transition duration-300"
        >
          <IoArrowBack className="text-lg" />
          <span className="font-medium">Back</span>
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-amber-500 mb-6">
          ACE PICKLEBALL CLUB, BHOPAL
        </h1>

        {/* Rental Section */}
        <Section title="A. RENTAL">
          <PriceItem label="Rental per Court (Weekdays)" price="₹800.00" />
          <PriceItem label="Rental per Court (Weekends)" price="₹1,000.00" />
        </Section>

        {/* Membership Section */}
        <Section title="B. MEMBERSHIPS">
          <PriceItem label="Normal Membership Per Person" price="₹5,000.00" />
          <PriceItem label="Normal Membership Per Court" price="₹20,000.00" />
        </Section>

        {/* Special Combo Membership Section */}
        <Section title="C. SPECIAL COMBO MEMBERSHIP">
          <PriceItem label="Couple Membership (One Male + One Female)" price="₹9,000.00" />
          <PriceItem label="Family Membership (Husband + Wife + 2 Kids)" price="₹18,000.00" />
          <PriceItem label="Family Membership (Husband + Wife + 1 Kid)" price="₹13,500.00" />
        </Section>

        {/* Note Section */}
        <div className="mt-6 text-sm text-gray-700 bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg">NOTE</h3>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Quarterly Membership gets 5% additional discount.</li>
            <li>Half-Yearly Membership gets 10% additional discount.</li>
            <li>Yearly Membership gets 15% additional discount.</li>
            <li>Corporate Collaboration is available.</li>
            <li>Bookings for events like birthdays are available.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <section className="mt-6">
    <h2 className="text-xl font-semibold bg-amber-500 text-white p-2 rounded-lg">
      {title}
    </h2>
    <ul className="mt-2 text-md">{children}</ul>
  </section>
);

const PriceItem = ({ label, price }) => (
  <li className="flex justify-between border-b py-2 text-lg font-medium">
    <span>{label}</span>
    <span className="text-amber-600 font-semibold">{price}</span>
  </li>
);

export default MembershipDetails;
