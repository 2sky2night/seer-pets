import { exit } from "node:process";
import { JSDOM } from "jsdom";
import { box, fetchWebsite, jsonSafeStringify, logger } from "./utils";
import { getPetsData, getPetAttributes } from "./modules";
import path from "node:path";

// TODO 常量搞到环境变量里面去
/** 网站地址 */
const WEBSITE_URL = "http://news.4399.com/seer/jinglingdaquan/";
/** 超时时间 */
const TIMEOUT = 5000;
/** 文件输出的基础路径 */
const FILE_OUTPUT_BASE_PATH = path.resolve(__dirname, "./static");
/** 精灵的输出路径 */
const FILE_OUTPUT_PETS_PATH = path.join(FILE_OUTPUT_BASE_PATH, "pets.json");
/** 精灵属性的输出路径 */
const FILE_OUTPUT_PET_ATTRIBUTES_PATH = path.join(
  FILE_OUTPUT_BASE_PATH,
  "attributes.json",
);

async function main() {
  // 1.下载html
  const [downloadError, htmlString] = await box(
    fetchWebsite({ url: WEBSITE_URL, timeout: TIMEOUT, encoding: "gb2312" }),
  );
  if (downloadError || !htmlString) {
    logger.error("下载html数据失败" + jsonSafeStringify(downloadError));
    exit(1);
  }
  // 2.解析html，获取精灵数据
  const dom = new JSDOM(htmlString);
  await Promise.all([
    getPetsData({ dom, outputPath: FILE_OUTPUT_PETS_PATH }),
    getPetAttributes({ dom, outputPath: FILE_OUTPUT_PET_ATTRIBUTES_PATH }),
  ]);
}

main();
