import { config } from 'dotenv';
config();

import { Configuration, OpenAIApi } from 'openai';
import readline from 'readline';

const openAi = new OpenAIApi(
	new Configuration({
		apiKey: process.env.OPEN_AI_API_KEY,
		baseURL: 'https://api.pulze.ai/v1',
	})
);

const userInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

export function hello() {
	return 'Hello World';
}

// module.exports.hello = function () {
// 	return 'Hello World';
// };

userInterface.prompt();
userInterface.on('line', async (input) => {
	const response = await openAi.createChatCompletion({
		model: 'pulze-v0',
		messages: [{ role: 'user', content: input }],
	});
	console.log(response.data.choices[0].message.content);

	//return response.data.choices[0].message.content;

	userInterface.prompt();
});
