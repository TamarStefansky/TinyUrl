import mongoose from "mongoose";

const LinkSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    clicks: Array,
    targetParamName: String,
    targetValues: Array
});

export default mongoose.model("links", LinkSchema);
