'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
function activate(context) {
    console.log('Extension activated');
    const provider = new CustomSidebarViewProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(CustomSidebarViewProvider.viewType, provider));
}
exports.activate = activate;
class CustomSidebarViewProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, token) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        // default webview will show doom face 0
        webviewView.webview.html = this.getHtmlContent(webviewView.webview, '0');
    }
    getHtmlContent(webview, i) {
        const scriptPath = vscode.Uri.file(path.join(__dirname, '..', 'dist', 'bundle.js'));
        const scriptUri = webview.asWebviewUri(scriptPath);
        // 		let totalHtml = getHtml(scriptUri);
        // 		totalHtml += `<script src="${scriptUri}"></script>
        //       </body>
        //     </html>
        //   `;
        return getHtml(scriptUri);
    }
}
CustomSidebarViewProvider.viewType = 'autodoc.openview'; // must match the id in package.json
function getHtml(scriptUri) {
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
				background: linear-gradient(
					100deg,
					rgb(255, 174, 215),
					rgb(252, 255, 220)
				);
				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://w...content-available-to-author-only...3.org/2000/svg' viewBox='0 0 460 55'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23fff' stroke-width='7' opacity='.1'%3E%3Cpath d='M-345 34.5s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 48.3 0 48.3s115-13.8 115-13.8 57.5-13.8 115-13.8 115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8'/%3E%3Cpath d='M-345 20.7s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 34.5 0 34.5s115-13.8 115-13.8S172.5 6.9 230 6.9s115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8m-920 27.6s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 62.1 0 62.1s115-13.8 115-13.8 57.5-13.8 115-13.8 115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8'/%3E%3Cpath d='M-345 6.9s57.5-13.8 115-13.8S-115 6.9-115 6.9-57.5 20.7 0 20.7 115 6.9 115 6.9 172.5-6.9 230-6.9 345 6.9 345 6.9s57.5 13.8 115 13.8S575 6.9 575 6.9'/%3E%3Cpath d='M-345-6.9s57.5-13.8 115-13.8S-115-6.9-115-6.9-57.5 6.9 0 6.9 115-6.9 115-6.9s57.5-13.8 115-13.8S345-6.9 345-6.9 402.5 6.9 460 6.9 575-6.9 575-6.9m-920 69s57.5-13.8 115-13.8 115 13.8 115 13.8S-57.5 75.9 0 75.9s115-13.8 115-13.8 57.5-13.8 115-13.8 115 13.8 115 13.8 57.5 13.8 115 13.8 115-13.8 115-13.8'/%3E%3C/g%3E%3C/svg%3E%0A"),
					linear-gradient(80deg, rgb(255, 174, 215), rgb(202, 202, 255));
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

			.txtArea {
				max-width: 400px;
				text-align: center;
				margin-top: 1.2rem;
				margin-bottom: 1.2rem;
				border: none;
			}

			#userInput {
				color: rgb(0, 0, 0);
				background-color: rgb(255, 215, 215);
				min-width: 388px;
				max-width: 400px;
				height: 45px;
				width: 100%;
				padding: 10px;
				box-sizing: border-box;
				border-radius: 30px;
				/* border: 1px transparent; */
				font-family: 'Montserrat', sans-serif;
				font-weight: 300;
				font-size: 15px;
				resize: none;
			}

			#outputContainer {
				max-width: 400px;
				margin-left: auto;
				margin-right: auto;
				min-height: 120px;
				text-align: left;
				/* display: none; */
				font-family: 'Montserrat', sans-serif;
				font-weight: 300;
				font-size: 15px;
				border-radius: 15px;
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
				border-radius: 15px;
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
		<script>
			textarea = document.querySelector('#userInput');
			textarea.addEventListener('input', autoResize, false);

			function autoResize() {
				this.style.height = 'auto';
				this.style.height = this.scrollHeight + 'px';
			}
		</script>
	</head>

	<body>
		<div class="container">
			<div id="outputContainer"></div>
			<div class="txtArea">
				<div style="position: relative; display: flex; align-items: center; width: 100%;">
					<textarea
						id="userInput"
						rows="1"
						cols="50"
						placeholder="ask autodoc..."
						style="padding-right:0px; outline: none;"
					></textarea>
					<button class="send-btn" onclick="generateAutoDoc()" style="position: absolute; right: 25px; background: none; border: none; cursor: pointer;">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" style="width: 24px; height: 24px;">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
						</svg>
					</button>
				</div>
			</div>
		</div>
		<style>
			.txtArea {
				position: fixed;
				bottom: 0;
				width: 100%;
				display: flex;
				align-items: center;
				background-color: rgb(255, 215, 215);
				box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
				border-radius: 50px;
				box-sizing: border-box;
				padding: 10px;
				padding-right: none;

			}
			#userInput {
				flex: 1;
				/* margin-right: none; */
				border-radius: 30px;

				font-family: 'Montserrat', sans-serif;
				font-weight: 300;
				font-size: 15px;
				resize: none;
				outline: none;
				width: 100%;
				box-sizing: border-box;
				display: inline-block;
				text-align: left;
				padding-right: none;

			}
			.send-btn {
				background: none;
				border: none;
				cursor: pointer;
			}
			.send-btn img {
				width: 24px;
				height: 24px;
			}
			.container {
				padding-top: 20px;

			}
		</style>
		<script>
			function generateAutoDoc() {
				const userInput = document.getElementById('userInput').value;
				const outputContainer = document.getElementById('outputContainer');
				const newOutput = document.createElement('div');
				newOutput.textContent = userInput;
				outputContainer.appendChild(newOutput);
				document.getElementById('userInput').value = '';
				document.getElementById('userInput').style.height = 'auto';
			}
		</script>
	</body>
</html>



  `;
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
module.exports = {
    activate,
    deactivate,
};
//# sourceMappingURL=extension.js.map