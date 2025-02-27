import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    // Validate request data
    if (!userId || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Find user in the database
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check if the user has enough credit balance
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    // Prepare form data for API request
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    // Convert API response to base64 image
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Update user credit balance and store the generated image
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
      resultImage,
    });

    // ✅ Send the response back to Postman
    return res.json({
      success: true,
      message: "Image generated successfully",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.json({ success: false, message: error.message });
  }
};
