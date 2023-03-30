// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { extensions } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "simple-ext" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('simple-ext.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from simple-ext!');
	});

	let disposable2 = vscode.commands.registerCommand('simple-ext.checkVersionOfDependency', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		let depExt = extensions.getExtension("timheuer.base-ext-sample");
		const version = depExt?.packageJSON.version;
		let isGoodVersion = false;
		if (compareVersions(version, '0.0.1') === 1) {
			isGoodVersion = true;
		}
		if (!isGoodVersion) {
			const selection = await vscode.window.showWarningMessage('In order to use this you need the base to be pre-release. Switch?', 'Switch to Pre-release','Cancel');
			if (selection !== undefined) {
				if (selection == 'Switch to Pre-release') {
					await vscode.commands.executeCommand('workbench.extensions.action.switchToPreReleaseVersion','timheuer.base-ext-sample');
					vscode.commands.executeCommand('workbench.action.reloadWindow'); 
				}
			}			
		}
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

function compareVersions(a: string, b: string) {
	const pa = a.split('.');
	const pb = b.split('.');
	for (let i = 0; i < 3; i++) {
	  const na = Number(pa[i]);
	  const nb = Number(pb[i]);
	  if (na > nb) return 1;
	  if (nb > na) return -1;
	  if (!isNaN(na) && isNaN(nb)) return 1;
	  if (isNaN(na) && !isNaN(nb)) return -1;
	}
	return 0;
  }

// this method is called when your extension is deactivated
export function deactivate() {}
