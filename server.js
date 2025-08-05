import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post("/api/generate", async (req, res) => {
  const { name, purpose } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: `Write a professional email from ${name} about: ${purpose}` }],
      max_tokens: 300
    });
    res.json({ message: completion.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API request failed" });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
