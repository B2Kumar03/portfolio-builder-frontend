import fetch, { Headers } from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";
global.fetch = fetch;
global.Headers = Headers;

const genAi = new GoogleGenerativeAI(process.env.API_KEY);

export const generateDetails = async (req, res) => {
    const {name,degree,status,skills,experience}=req.body
  try {
    let prompt = `I am ${name}, ${status} with a ${degree}. I have skills in ${skills.join(", ")} and ${experience} years of experience. Write a professional summary about me in four lines.`;
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    let text;
    let result = await model.generateContent(prompt);
    let response = await result.response;
    text = response.text();
    text=`I am ${name}`+" "+text
    res.status(200).json({message:text,success:true})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred while generating the content. ${error}` });
  }
};
