import getChatbotReply from "../services/chatbot.service.js";

const chat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const aiResponse = await getChatbotReply(message);
    res.json({ reply: aiResponse });
  } catch (err) {
    console.error("Chatbot error:", err.message);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
};

export default { chat };
