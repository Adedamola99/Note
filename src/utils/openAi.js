import axios from 'axios';

export const analyzeTask = async (taskDescription) => {
  const prompt = `Analyze the following task and suggest a priority (High, Medium, Low):\nTask: "${taskDescription}"\nPriority:`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt,
        max_tokens: 10,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.KEY}`,
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error analyzing task:', error);
    return 'Medium';
  }
};

export const getAutoCompletion = async (inputText) => {
  const prompt = `Provide auto-completion for the following task description: "${inputText}"\nAuto-completion:`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt,
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.KEY}`,
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error getting auto-completion:', error);
    return '';
  }
};
