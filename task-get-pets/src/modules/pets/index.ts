import { exit } from "node:process";
import type { JSDOM } from "jsdom";
import { box, jsonSafeStringify, logger } from "../../utils";
import { formatPets, matchPetsDataFromHtml, outputPets } from "./utils";

/** 解析DOM并整理出精灵数据 */
export async function getPetsData(params: { dom: JSDOM; outputPath: string }) {
  const { dom, outputPath } = params;
  const [matchErr, petsRaw] = await box(matchPetsDataFromHtml(dom));
  if (matchErr || !petsRaw) {
    logger.error("解析数据失败" + jsonSafeStringify(matchErr));
    exit(1); // 让脚本报错，工作流就能停止
  }
  // 3.整理精灵数据
  const pets = formatPets(petsRaw);
  // 4.输出精灵数据
  outputPets(pets, outputPath);
}
