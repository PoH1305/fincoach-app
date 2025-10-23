const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testGemini() {
  console.log('Testing Gemini API...');
  console.log('API Key exists:', !!GEMINI_API_KEY);
  
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env.local');
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    console.log('Sending test message...');
    const result = await model.generateContent('Say hello in one sentence');
    const response = await result.response;
    const text = response.text();

    console.log('✅ Success! Response:', text);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('API_KEY_INVALID')) {
      console.error('Your API key is invalid. Get a new one from https://makersuite.google.com/app/apikey');
    }
  }
}

testGemini();
