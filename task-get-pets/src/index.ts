import {
  box,
  fetchWebsite,
  jsonSafeStringify,
  logger,
  outputByJSONFile,
  toChineseWords,
} from "./utils";
import { JSDOM } from "jsdom";
import vm from "vm";
import { mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { IPet, IPetsRaw } from "./types";

/** 网站地址 */
const WEBSITE_URL = "http://news.4399.com/seer/jinglingdaquan/";
/** 超时时间 */
const TIMEOUT = 5000;

async function main() {
  // 1.下载html
  const [downloadError, htmlString] = await box(
    fetchWebsite({ url: WEBSITE_URL, timeout: TIMEOUT }),
  );
  if (downloadError || !htmlString) {
    logger.error("下载html数据失败" + jsonSafeStringify(downloadError));
    return;
  }
  // 2.解析html，获取精灵数据
  const [matchErr, petsRaw] = await box(matchPetsDataFromHtml(htmlString));
  if (matchErr || !petsRaw) {
    logger.error("解析数据失败" + jsonSafeStringify(matchErr));
    return;
  }
  // 3.整理精灵数据
  const pets = formatPets(petsRaw);
  // 4.输出精灵数据
  outputPets(pets);
}

main();

/** 从html字符串中解析出精灵数据 */
async function matchPetsDataFromHtml(htmlString: string): Promise<IPetsRaw> {
  // 1. 使用 jsdom 加载 HTML
  const dom = new JSDOM(htmlString);
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
/** 整理精灵数据 */
function formatPets(petData: IPetsRaw): IPet[] {
  return petData.map(
    ([
      name,
      detailUrl,
      img,
      detailId,
      keywords,
      id,
      attribute,
      proprietarySkill,
      source,
      raceValue,
    ]) => {
      return {
        name: toChineseWords(name),
        detailUrl,
        img,
        detailId,
        keywords,
        id,
        attribute,
        proprietarySkill,
        source,
        raceValue,
      };
    },
  );
}
/** 输出精灵数据文件 */
function outputPets(pets: IPet[]) {
  try {
    const staticPath = path.resolve(__dirname, "./static");
    if (!existsSync(staticPath)) {
      mkdirSync(staticPath);
    }
    const outputPath = path.resolve(staticPath, "pets.json");
    outputByJSONFile({ data: {
      pets,
      timestamp:Date.now(), // 为了内容无变更导致的提交失败，这里做了时间戳对比
    }, path: outputPath });
    logger.info("精灵数据已输出到路径成功");
  } catch (error) {
    logger.error("精灵数据输出失败: " + jsonSafeStringify(error));
  }
}
