const path = require("path");

module.exports = {
  entry: "./src/index.ts", // 入口文件
  output: {
    filename: "bundle.js", // 输出的文件名
    path: path.resolve(__dirname, "dist"), // 输出目录
  },
  resolve: {
    extensions: [".ts", ".js"], // 支持解析的文件扩展名
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配 .ts 文件
        use: "ts-loader", // 使用 ts-loader 处理 TypeScript 文件
        exclude: /node_modules/, // 排除 node_modules 目录
      },
    ],
  },
  target: "node", // 指定目标环境为 Node.js
  mode: "production", // 打包模式（production 会优化代码）
};