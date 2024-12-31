# AutoDoc - AI Chat Bot Extension for VS Code

AutoDoc is an AI-powered chatbot extension for Visual Studio Code designed to enhance your coding experience with AI-based assistance.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/khalidhasananik/AutoDoc_VSCode_Extention.git
```

### Install Dependencies

Navigate to the project directory and run:

```bash
npm install
```

### Navigate to the Extension Directory

```bash
cd Extension
```

## Project Structure

- **`out/extension.js`**: Contains the code for the extension.
- **`src/media/script.js`**: Includes all the code for interacting with the LLM API.
- **`some.html`**: Provides the design layout for the extension. If you make any changes to this file, ensure you copy the updates into `extension.js`.

## Running the Extension

1. Open the `extension.js` file in Visual Studio Code.
2. Press `F5` to launch a new VS Code instance.
3. In the new VS Code window, open the Command Palette using `Ctrl + Shift + P`.
4. Type `View: Show AutoDoc` and select it to open the extension.

## Notes

- Remember to keep `extension.js` updated with any design changes made in `some.html`.

Happy coding! 🚀
