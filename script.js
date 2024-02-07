/* script.js */
const submitButton = document.getElementById('submit-button');
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const loadingIndicator = document.getElementById('loading-indicator');

// Import the GoogleGenerativeAI library
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const API_KEY = 'YOUR_API_KEY'; // Replace with your API key
const genAI = new GoogleGenerativeAI(API_KEY);

async function run(prompt) {
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text; 
}

submitButton.addEventListener('click', async () => {
  const prompt = inputText.value.trim();

  if (!prompt) {
    alert('Please enter a prompt.');
    return;
  }

  loadingIndicator.style.display = 'block'; 

  try {
    const generatedText = await run(prompt); 
    outputText.textContent = generatedText;
  } catch (error) {
    console.error(error);
    outputText.textContent = 'An error occurred. Please try again later.';
  } finally {
    loadingIndicator.style.display = 'none'; 
  }
});






