const vscode = require('vscode');
const path = require('path')
const fs = require('fs')
const FILE = path.resolve(__dirname, './templates/')

module.exports = {
  async install() {
    vscode.window.showQuickPick(
      [
        { description: '分页器组件模版', label: 'pagination'},
        { description: '文本输入框组件模版', label: 'input'},
        { description: '数字输入框组件模版', label: 'input.number'},
        { description: '下拉选择组件模版', label: 'select'},
        { description: '日期选择组件模版', label: 'datePicker'},
      ]
    )
    .then(async ({ label }) => {
      try {
        const file = fs.readFileSync(path.join(FILE,`${label}.txt`), "utf-8");
        await insertText(file);
        vscode.window.showInformationMessage("创建成功");
      } catch (err) {
        console.log(err)
        vscode.window.showErrorMessage("创建失败");
      }
    })
  }
}

function insertText(val) {
  const editor = vscode.window.activeTextEditor;

  const selection = editor.selection;
  const lineOfSelectedStartVar = selection.start.line;
  const lineOfSelectedEndVar = selection.end.line;
  const columnOfSelectedStartVar = selection.start.character;
  const columnOfSelectedEndVar = selection.end.character;

  if (!editor) {
    vscode.window.showErrorMessage("无法插入");
    return;
  }

  editor.edit((editBuilder) => {
    if (selection.isEmpty) {
      editBuilder.insert(new vscode.Position(lineOfSelectedStartVar, columnOfSelectedStartVar), val);
    } else {
      editBuilder.replace(new vscode.Range(new vscode.Position(lineOfSelectedStartVar, columnOfSelectedStartVar), new vscode.Position(lineOfSelectedEndVar, columnOfSelectedEndVar)), val);
    }
  });
}