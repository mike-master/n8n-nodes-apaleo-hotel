
export const bookingProperties = [
    {
        displayName: "Booking ID",
        name: "bookingId",
        type: "string",
        default: "",
        description: "The ID of the booking",
    },
    {
        displayName: "Booking Status",
        name: "status",
        type: "options",
        options: [
            { name: "Confirmed", value: "confirmed" },
            { name: "Pending", value: "pending" },
        ],
        default: "confirmed",
        description: "The status of the booking",
    },
];
