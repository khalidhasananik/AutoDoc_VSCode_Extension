import { OpenAI } from 'openai';
// eslint-disable-next-line @typescript-eslint/naming-convention
// const { OpenAI } = require('openai');
// const openaiMain = require('openai');

// console.log('script.js is working lohjhhjh hjhjh h jhj hjh jhjh jhjh k');

const customLabels = { foo: 'bar' };

const weights = { cost: 0.2, quality: 0.8, latency: 0 };



const openai = new OpenAI({
	apiKey: '', // supply your key however you choose
	baseURL: 'https://api.pulze.ai/v1', // enter Pulze's URL
	defaultHeaders: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'Pulze-Labels': JSON.stringify(custom_labels),
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'Pulze-Weights': JSON.stringify(weights),
	},
});

const prompt = `\n`;

const vscode = acquireVsCodeApi();

const chatCompletion = async (content) => {
	const response = await openai.chat.completions.create({
		messages: [{ role: 'user', content: prompt + content }],
		model: 'pulze-v0',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		max_tokens: 500,
	});

	return response.choices[0].message.content;
};

async function generateAutoDoc() {
	const userInput = document.getElementById('userInput').value;
	const response = await chatCompletion(userInput);

	const autoDocOutput = document.getElementById('autoDocOutput');
	autoDocOutput.innerHTML = response;

	const autoDocOutputDiv = document.getElementById('outputContainer');
	autoDocOutputDiv.style.display = 'block';
}

window.generateAutoDoc = generateAutoDoc;
