import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
    {
        feed: {
            type: String,
        },
        createdAt: {
            type: Date,
        },
        content: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
