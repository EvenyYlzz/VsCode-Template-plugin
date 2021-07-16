// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path')
const fs = require('fs-extra');
const glob = require('glob')
// const CC = require('./commands/plm.react.file')
// vscode.window.showInformationMessage(__dirname)
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "plm-vscode-plugin" is now active!');
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('plm-vscode-plugin.helloWorld', function () {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from plm-vscode-plugin!');
	// });

	// context.subscriptions.push(disposable);

	glob(path.join(__dirname, './commands/*'), {}, (err, files) => {
		files.map(file => {
			if (fs.statSync(file).isDirectory()) {
				console.log(file)
				const sign = file.split('/').slice(-1)[0];
				const command = require(file);
				console.log(sign)
				context.subscriptions.push(vscode.commands.registerCommand(sign, command.install))
			}
			return null;
		})
	})
}
// exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
