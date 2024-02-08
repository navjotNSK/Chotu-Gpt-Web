/* script.js */


const chatHistory = document.querySelector('.chat-history');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send-button');

// Import the GoogleGenerativeAI library
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const API_KEY = 'YOUR_API_KEY'; // Replace with your API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });




sendButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();

    console.log(response);
    const generatedText = await chat(message); 
    console.log(generatedText);

    // Create and display the user's message
    const userMessage = createMessage('user', message);
    chatHistory.appendChild(userMessage);
    scrollChatHistory();

    // Create and display the model's response
    const botMessage = createMessage('model', generatedText);
    chatHistory.appendChild(botMessage);
    scrollChatHistory();

    messageInput.value = ''; 
});

function createMessage(sender, content) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chat-message', sender);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.textContent = content;

    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = new Date().toLocaleTimeString();

    messageContainer.appendChild(contentDiv);
    messageContainer.appendChild(timestamp);

    return messageContainer;
}

function scrollChatHistory() {
    chatHistory.scrollTop = chatHistory.scrollHeight;
}


let globalHistory = [];
async function chat(msg) {
 
  const chat = model.startChat({
    history: globalHistory,
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const result = await chat.sendMessage(msg);
  globalHistory.push({role: "user" , parts : msg});
  const response = await result.response;
  const text = response.text();

  globalHistory.push({role: "model" , parts : text});

  return text; 
}










