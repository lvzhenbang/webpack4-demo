# webpack4-demo

这是一个webpack4.x的尝试项目。

要了解更多的webpack4.x的可以参考[webpack4.x带来了什么](https://github.com/lvzhenbang/webpack-play/blob/master/doc/two/webpack4.md)。

这个小demo不仅可以处理html模板文件，同时又增加了 `markdown-loader` 时之可以处理 `*.md` 文件，这样一个用来构建个人学习（或经验总结）的工作集就基本完成。

只需要在[`webpack4.x带了什么`](https://github.com/lvzhenbang/webpack-play/blob/master/doc/two/webpack4.md)这篇文章的基础上做如下改动：

1. 添加 `markdown-loader` 和 `marked` 依赖

    npm install marked markdown-loader --save

2. 在 `webapck.config.js` 的 添加如下代码：

```
module: {
    rules: [
        ...
        {
            test: /\.md$/, // 项目中的markdown文件
            use: [
                {
                    loader: "html-loader"
                },
                {
                    loader: "markdown-loader",
                    options: {
                        pedantic: true,
                        renderer
                    }
                }
            ]
        },
        ...
    ]
}

```

其他的 `loader` 和 `plugin` 可根据自己需要添加。
