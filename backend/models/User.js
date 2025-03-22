const userSchema = {
  name: "string",
  email: "string",
  bookings: [
    {
      bookingId: "string",
      courtId: "string",
      courtTimeSlotId: ["number"],
      payments: "object"
    }
  ],
  createdAt: "timestamp",
  updatedAt: "timestamp"
};

export default userSchema;
