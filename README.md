# PLM前端VSCODE插件
## 开发方式

> 基础框架已经基于commands目录制定插件命令
+ 第一层级文件夹下面的名字为命令名称，需要在`package.json`文件里面配置
```json
  "contributes" {
    "commands": [
      {
        "command": "文件夹名称",
        "title": "需要显示的标题"
      }
    ]
  }
```

## 命令介绍

+ ### `PLM.LCD`
> 创建基于LCD文件目录
+ ### `PLM.REACT.FILE`
> 创建React模板文件

+ [x] `func` function类型文件
+ [x] `class` class类型文件
