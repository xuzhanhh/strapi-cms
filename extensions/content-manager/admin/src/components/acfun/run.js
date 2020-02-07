// const fs = require('fs');
// var readDir = fs.readdirSync("./").filter(name => name.indexOf('.png')>=0).map(item => item.split('.')[0]);
// console.log(readDir);
// const genTemplate = name => {
//   return `.ac-${name} {
//     background-image: url('./${name}.png');
//     background-position: center;
//     background-repeat: no-repeat;
//   }
//   `;
// }
// fs.writeFile('ac.scss', readDir.map(genTemplate).join('\n'), ()=>{});
// fs.writeFile('constant.js', `export const name = ${JSON.stringify(readDir, null, 4)};`, ()=>{});