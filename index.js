#!/usr/bin/env node

'use strict';

var program = require('commander');
var fs = require('fs');

program
  .version('0.1.0', '-v --version')
  .option('-c, --component-func <functionName>', 'Add React functional components file in component folder.')
  .option('-C, --component-class <className>', 'Add React stateful class component file in components folder.')
  .option('-e, --error-boundary <ebName>', 'Add React error boundary component file in error-components folder.')
  .option('-t, --containerx <ctName>', 'Add container file in containers folder.')
  .option('-a, --action-dispatch [actionName]', 'Add dispatch action file in actions folder.')
  .option('-r, --reducer <type>', 'Add reducer file in reducer folder. type <1> reducer , <2>subReducer.')
  .option('-l, --eslint', 'Add eslint config json template.')
  .option('-n, --cname [name]', 'Add file name.');

program.on('-h', function() {
  console.log('');
  console.log('Examples:');
  console.log('  $ pulin -c <foo>');
  console.log('  $ pulin -C <foo>');
  console.log('  $ pulin -e <errorBoundary>');
});

program.parse(process.argv);

let {
  componentFunc, 
  componentClass, 
  errorBoundary, 
  actionDispatch, 
  reducer, 
  containerx,
  eslint,
  cname
} = program; 


function asycCreateFolder(folderPath) {
  return new Promise((resolve,reject)=>{
    //檢查路徑物件是否存在,存在則繼續下一步，不存在則直接創建目錄.
    if (!fs.existsSync(folderPath)){
      fs.mkdir(folderPath, (err) => {
        if(err){
          reject(err);
        }
        resolve();
      });
    }
    else{
      resolve();
    }
  });
}

function createFile(filePath, fileContent) {
  if(fs.existsSync(filePath)) throw new Error(`Path: ${filePath} 檔案已經存在，創建失敗`);
  

  //若路徑物件不存在則開始寫入檔案 
  fs.writeFile(filePath,fileContent ,(err) => {
    if (err) throw new Error(err);
    
    console.log('File has generated at :\n'+filePath);
  });    
}

function generateFile(folderPath, fileName, tempUrl){
  let copyFrom = '/Users/Vergil/pulin-cli/'+tempUrl;
  let filePath = folderPath+ '/' + fileName;
  
  asycCreateFolder(folderPath)
    .then(()=>{
      //讀取檔案並複製到目標路徑
      fs.readFile(copyFrom,'utf8', (err, data) => {
        if(err) throw new Error(err);
        createFile(filePath, data);
      });
    })
    .catch((err)=>{
      console.log(err);
    });
}


// Add React functional components file in component folder.
// <fileName> 必選
if (componentFunc) {
  let folderPath = 'src/components';
  let fileName = componentFunc+'.js';
  let tempBasePath = 'template/fComponent.js';
  generateFile(folderPath, fileName, tempBasePath);
}

// Add React stateful class component file in components folder.
// <fileName> 必選
if (componentClass) {
  let folderPath = 'src/components';
  let fileName = componentClass+'.js';
  let tempBasePath = 'template/fComponent.js';
  generateFile(folderPath, fileName, tempBasePath);
}

// Add React error boundary component file in error-components folder.
// <fileName> 必選
if (errorBoundary) {
  let folderPath = 'src/error-components';
  let fileName = errorBoundary+'.js';
  let tempBasePath = 'template/errorBoundary.js';
  generateFile(folderPath, fileName, tempBasePath);
}

// Add container file in containers folder.
// <ctName> 必選
if (containerx) {
  let folderPath = 'src/containers';
  let fileName = containerx+'.js';
  let tempBasePath = 'template/container.js';
  generateFile(folderPath, fileName, tempBasePath);
}

// Add React error boundary component file in error-components folder.
// <fileName> 必選
if (eslint) {
  let folderPath = '.';
  let fileName = '.eslintrc.json';
  let tempBasePath = 'template/eslint.json';
  generateFile(folderPath, fileName, tempBasePath);
}

// Add dispatch action file in actions folder.
// [fileName] 選填 ,default file name is 'action'
if (actionDispatch) {
  let folderPath = 'src/action';
  let fileName = 'action.js';
  let tempBasePath = 'template/action.js';
  if(typeof actionDispatch === 'string'){
    fileName = actionDispatch+'.js';
  }
  generateFile(folderPath, fileName, tempBasePath);
}

// Add reducer file in reducer folder. type <1> reducer , <2>subReducer.
// <type> 必選
// 檢查 -n cname是否有值 為fileName , default file name is 'reducer'.
if (reducer) {
  let folderPath = 'src/reducer';
  let type = '1';
  if(typeof reducer === 'string'){
    switch (reducer){
    case '1': 
      type = 'reducer';
      break;
    case '2':
      type = 'subReducer';
      break;
    default :
      break;
    }
  }
  let fileName = type+'.js';
  if(typeof cname === 'string'){
    fileName = cname+'.js';
  }
  let tempBasePath = 'template/'+ type +'.js';
  generateFile(folderPath, fileName, tempBasePath);
}
