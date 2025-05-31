import vm from "vm";
import { logger } from "../../../utils";
import type { IPetsRaw } from "../../../types";
import type { JSDOM } from "jsdom";

/** 从html字符串中解析出精灵数据 */
export async function matchPetsDataFromHtml(dom: JSDOM): Promise<IPetsRaw> {
  // 1. 使用 jsdom 加载 HTML
  // const dom = new JSDOM(htmlString);
  // 2. 遍历所有 <script> 标签
  const scriptTags = dom.window.document.querySelectorAll("script");
  for (const script of scriptTags) {
    const scriptContent = script.textContent;
    if (!scriptContent) continue;
    try {
      // 3. 使用 vm 模块执行 JavaScript 代码并提取变量
      const sandbox: { petData?: any } = {};
      vm.createContext(sandbox); // 创建一个沙盒环境
      vm.runInContext(scriptContent, sandbox); // 在沙盒中运行脚本
      // 4. 检查是否存在 petData
      if (sandbox.petData) {
        logger.info("找到petData" + "长度：" + sandbox.petData.length);
        return sandbox.petData;
      }
    } catch (err) {
      // 忽略解析错误，继续检查下一个 <script>
      continue;
    }
  }
  return Promise.reject("未找到包含 petData 的 <script> 标签");
}
