const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const response = require("./template.json").files;
function createWebTemplate() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    return vscode.window.showErrorMessage("No workspace folder is open.");
  }
  
  const firstWorkspaceFolder = workspaceFolders[0].uri.fsPath;
  try {
    fs.mkdirSync(path.join(firstWorkspaceFolder, "assets"));
    response.forEach((elm) => createFile(firstWorkspaceFolder, elm.fileName, elm.content));
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
  }
}

function createFile(folderPath, fileName, content) {
  const filePath = path.join(folderPath, fileName);
  try {
    fs.writeFileSync(filePath, content);
    vscode.window.showInformationMessage(`Created ${fileName}`);
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
  }
}

function activate(context) {
  context.subscriptions.push(vscode.commands.registerCommand("create-template.createWebTemplate", createWebTemplate));
}
function deactivate() {}
module.exports = {
  activate,
  deactivate,
};
