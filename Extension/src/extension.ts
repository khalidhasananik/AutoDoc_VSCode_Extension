'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension activated');

	const provider = new CustomSidebarViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			CustomSidebarViewProvider.viewType,
			provider
		)
	);
}

class CustomSidebarViewProvider implements vscode.WebviewViewProvider {
	public static readonly viewType = 'autodoc.openview'; // must match the id in package.json

	private _view?: vscode.WebviewView;

	constructor(private readonly _extensionUri: vscode.Uri) {}

	resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext<unknown>,
		token: vscode.CancellationToken
	): void | Thenable<void> {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,
			localResourceRoots: [this._extensionUri],
		};

		// default webview will show doom face 0
		webviewView.webview.html = this.getHtmlContent(webviewView.webview, '0');
	}

	private getHtmlContent(webview: vscode.Webview, i: string): string {
		const scriptPath = vscode.Uri.file(
			path.join(__dirname, '..', 'dist', 'bundle.js')
		);
		const scriptUri = webview.asWebviewUri(scriptPath);
		// 		let totalHtml = getHtml(scriptUri);
		// 		totalHtml += `<script src="${scriptUri}"></script>
		//       </body>
		//     </html>
		//   `;

		return getHtml(scriptUri);
	}
}

function getHtml(scriptUri: vscode.Uri) {
	return `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>AutoDoc Generator</title>
		<style>
			@import url('https://f...content-available-to-author-only...s.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

			/* import for button */
			@import 'https://u...content-available-to-author-only...g.com/open-props';

			body {
				font-family: 'Montserrat', sans-serif;
				font-weight: 400;
				text-align: center;
				background: linear-gradient(100deg, #402, #006);
				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://w...content-available-to-author-only...3.org/2000/svg' viewBox='0 0 460 55'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23fff' stroke-width='7' opacity='.1'%3E%3Cpath d='M-345 34.5s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 48.3 0 48.3s115-13.8 115-13.8 57.5-13.8 115-13.8 115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8'/%3E%3Cpath d='M-345 20.7s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 34.5 0 34.5s115-13.8 115-13.8S172.5 6.9 230 6.9s115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8m-920 27.6s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 62.1 0 62.1s115-13.8 115-13.8 57.5-13.8 115-13.8 115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8'/%3E%3Cpath d='M-345 6.9s57.5-13.8 115-13.8S-115 6.9-115 6.9-57.5 20.7 0 20.7 115 6.9 115 6.9 172.5-6.9 230-6.9 345 6.9 345 6.9s57.5 13.8 115 13.8S575 6.9 575 6.9'/%3E%3Cpath d='M-345-6.9s57.5-13.8 115-13.8S-115-6.9-115-6.9-57.5 6.9 0 6.9 115-6.9 115-6.9s57.5-13.8 115-13.8S345-6.9 345-6.9 402.5 6.9 460 6.9 575-6.9 575-6.9m-920 69s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 75.9 0 75.9s115-13.8 115-13.8 57.5-13.8 115-13.8 115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8'/%3E%3C/g%3E%3C/svg%3E%0A"),
					linear-gradient(80deg, #202, #006);
				background-position: 50% 50%;
				animation: background-move 10s linear infinite;
				background-size: 100vw auto, 100% 100%;
				background-size: unquote('max(100vw, 30em)') auto, 100% 100%;
			}
			@keyframes background-move {
				0% {
					background-position: 0 0, 0 0;
				}
				100% {
					background-position: 100vw 0, 0 0;
					background-position: unquote('max(100vw, 40em)') 0, 0 0;
				}
			}

			.container {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				align-content: center;
				align-items: center;
				justify-content: center;
				max-width: 600px;
				margin-left: auto;
				margin-right: auto;
			}

			#userInput {
				color: white;
				background-color: #101010;
				min-width: 388px;
				max-width: 400px;
				width: 100%;
				padding: 10px;
				box-sizing: border-box;
				border-radius: 5px;
				border: 1px solid #323030;
				font-family: 'Montserrat', sans-serif;
				font-weight: 300;
				font-size: 20px;
			}

			#outputContainer {
				max-width: 400px;
				margin-left: auto;
				margin-right: auto;
				min-height: 120px;
				text-align: left;
				display: none;
			}

			#autoDocOutput {
				font-family: 'Montserrat', sans-serif;
				font-weight: 300;
				font-size: 20px;
				min-width: 388px;
				max-width: 400px;
				width: 100%;
				box-sizing: border-box;
				border: 1px solid #323030;
				padding: 10px;
				min-height: 142px;
				text-align: left;
				color: white;
				background-color: #101010;
				border-radius: 5px;
			}

			.label {
				font-weight: 800;
				max-width: 400px;
				text-align: center;
				margin-top: 1.2rem;
				color: rgb(0, 200, 200);
			}

			.txtArea {
				max-width: 400px;
				text-align: center;
				margin-top: 1.2rem;
				margin-bottom: 1.2rem;
			}

			.btn {
				display: block;
				max-width: 400px;
				text-align: center;
				display: grid;
				place-items: center;
				padding: 1.4rem;
				margin-bottom: 1.2rem;
			}
			button {
				font-family: 'Montserrat', sans-serif;
				font-weight: 600;
				font-size: 24px;
				color: white;
				background: rgb(0, 200, 200);
				border: 0;
				border-radius: 5px;
				padding: var(--size-2) var(--size-4);
				transform: translateY(calc(var(--y, 0) * 1%)) scale(var(--scale));
				transition: transform 0.1s;
				position: relative;
			}
			button:hover {
				--y: -10;
				--scale: 1.1;
				--border-scale: 1;
				border-radius: 5px;
			}
			button:active {
				--y: 5%;
				--scale: 0.9;
				--border-scale: 0.9, 0.8;
				border-radius: 5px;
			}
			button:before {
				content: '';
				position: absolute;
				inset: calc(var(--size-3) * -1);
				border: var(--size-2) solid var(--gray-0);
				transform: scale(var(--border-scale, 0));
				transition: transform 0.125s;
				border-radius: 5px;

				--angle-one: 105deg;
				--angle-two: 290deg;
				--spread-one: 30deg;
				--spread-two: 40deg;
				--start-one: calc(var(--angle-one) - (var(--spread-one) * 0.5));
				--start-two: calc(var(--angle-two) - (var(--spread-two) * 0.5));
				--end-one: calc(var(--angle-one) + (var(--spread-one) * 0.5));
				--end-two: calc(var(--angle-two) + (var(--spread-two) * 0.5));

				mask: conic-gradient(
					transparent 0 var(--start-one),
					white var(--start-one) var(--end-one),
					transparent var(--end-one) var(--start-two),
					white var(--start-two) var(--end-two),
					transparent var(--end-two)
				);

				z-index: -1;
			}
		</style>
		<script src="${scriptUri}"></script>
	</head>

	<body>
		<div class="container">
			<div class="label"><h1>AUTODOC</h1></div>
			<div class="txtArea">
				<textarea
					id="userInput"
					rows="5"
					cols="50"
					placeholder="Enter your code"
				></textarea
				><br />
			</div>
			<div class="btn">
				<button onclick="generateAutoDoc()">Generate</button>
			</div>
			<div id="outputContainer">
				<!-- <strong>GG</strong><br /> -->
				<div id="autoDocOutput"></div>
			</div>
		</div>
	</body>
</html>

  `;
}

// this method is called when your extension is deactivated
export function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
