// @ts-nocheck
const fs = require('fs')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generate = require('@babel/generator').default
const template = require('@babel/template').default

const code = fs.readFileSync('../reducer.js', {
  encoding: 'utf8',
})

console.log(typeof code)

const ast = parse(code, {
  sourceType: 'module',
})

const node = t.ObjectMethod(
  'method',
  t.Identifier('* pageChangeAction'),
  [ t.ArrayPattern(
      [t.Identifier('page'), t.Identifier('size')]
    )
  ],
  
    t.BlockStatement(
      [
        // t.ExpressionStatement(
        //   t.YieldExpression(
        //     t.isExpression(
        //       t.StringLiteral("''")
        //       // t.identifier('console.log'),
        //       // [t.identifier('arg1')]
        //     )
        //   )
        // ),
        t.ExpressionStatement(
          t.AssignmentExpression(
            '=',
            t.MemberExpression(
              t.MemberExpression(
                t.MemberExpression(
                  t.ThisExpression(),
                  t.Identifier('state')
                ),
                t.Identifier('pageAreaData')
              ),
              t.Identifier('page')
            ),
            t.Identifier('page')
          )
        ),
      ]
    )
  // t.blockStatement([
  //   t.expressionStatement(
  //       t.callExpression(
  //           t.identifier('console.log'),
  //           [t.identifier('arg1')]
  //       )
  //   )
  // ])
)
console.log('node', node);

// const getNode = template(`* pageChangeAction([page, size]) {
//   yield '';
//   this.state.pageAreaData.page = page;
//   this.state.pageAreaData.perPage = size;
// }`)
// console.log(getNode())


// console.log('ast树：', ast);

// let temp = 0;
traverse(ast, {
  enter(path) {
    // temp++;
    // console.log(temp);
    if (path.node.type === "ObjectProperty" && path.node.key.name === "$init") {
      console.log('找到这个节点了', path.node.key.name)
      // const node = t.importDeclaration(
      //   [t.importDefaultSpecifier(t.identifier('A'))],
      //   t.stringLiteral('a')
      // )
      path.insertAfter(node);
    }
    // console.log('path:', path);
  },
});

// let imported = false
// let node
// // 对 ast 进行深度遍历
// traverse(ast, {
//   // 当遍历到 import 语句相关的节点会执行这个方法
//   ImportDeclaration(path) {
//     const prevNode = path.getPrevSibling().node
//     // 判断当前这个 import 语句是不是第一个
//     if ((!prevNode || prevNode.type !== 'ImportDeclaration') && !imported) {
//       // 需要插入的节点
//       node = t.importDeclaration(
//         [t.importDefaultSpecifier(t.identifier('A'))],
//         t.stringLiteral('a')
//       )
//       path.insertBefore(node)
//       imported = true
//     }
//   },
// })

console.log(generate(ast).code)


// fs.writeFileSync('../reducer.js', generate(ast).code, function (error) {
//   console.log(error)
//   if (error) {
//     console.log('写入失败')
//   } else {
//     console.log('写入成功了')
//   }
// })

console.log('结束')