// @ts-nocheck
const fs = require('fs');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;
const prettier = require('prettier');
const jsBeautify = require('js-beautify').js_beautify;

export function addPagination() {
  // 读取源文件
  const code = fs.readFileSync('../reducer.js', {
    encoding: 'utf8',
  })

  // 生成ast树
  const ast = parse(code, {
    sourceType: 'module',
  })

  // 生成要插入ast树中的node节点
  const node = t.ObjectMethod(
    'method',
    t.Identifier('pageChangeAction'),
    [ t.ArrayPattern(
        [t.Identifier('page'), t.Identifier('size')]
      )
    ],
    t.BlockStatement(
      [
        t.ExpressionStatement(
          t.YieldExpression(
            t.StringLiteral('')
          )
        ),
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
              t.Identifier('perPage')
            ),
            t.Identifier('size')
          )
        ),
      ],
    ),
    false,
    // generator参数
    true,
  )

  // 查找正确节点将node节点插入
  traverse(ast, {
    enter(path) {
      if (path.node.type === "ObjectProperty" && path.node.key.name === "$init") {
        console.log('找到这个节点了', path.node.key.name)
        path.insertAfter(node);
      }
    },
  });

  // 格式化处理单引号问题
  const formatted = prettier.format(generate(ast, { retainLines: true }).code, {
    // 字符串使用单引号
    singleQuote: true,
  })

  // 处理*号问题
  const ddd = jsBeautify(
    formatted,
    {
      indent_size: 2,
    }
  )

  // 将方法写入
  fs.writeFileSync('../reducer.js', ddd, function (error) {
    console.log(error)
    if (error) {
      console.log('写入失败')
    } else {
      console.log('写入成功了')
    }
  })
}