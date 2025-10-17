// Test DeepSeek API
async function testDeepSeek() {
  const apiKey = 'sk-5af49c873df147b1b8bc4e810b755eba';
  
  console.log('🔑 Testing DeepSeek API...');
  
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a helpful financial coach.' },
          { role: 'user', content: 'Hello, can you help with budgeting?' }
        ],
        max_tokens: 100,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ DeepSeek API is working!');
    console.log('Response:', data.choices[0]?.message?.content || 'No response');
  } catch (error) {
    console.log('❌ DeepSeek API error:', error.message);
  }
}

testDeepSeek();