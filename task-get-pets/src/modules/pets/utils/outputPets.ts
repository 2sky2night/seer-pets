import { exit } from "node:process";
import { jsonSafeStringify, logger, outputByJSONFile } from "../../../utils";
import type { IPet } from "../../../types";

/**
 * 输出精灵数据文件
 * @param pets - 精灵数据数组
 * @param outputPath - 输出文件的路径
 */
export function outputPets(pets: IPet[], outputPath: string) {
  try {
    outputByJSONFile({
      data: {
        pets,
        timestamp: Date.now(), // 为了内容无变更导致的提交失败，这里做了时间戳对比
      },
      path: outputPath,
    });
    logger.info("精灵数据已输出到路径成功");
  } catch (error) {
    logger.error("精灵数据输出失败: " + jsonSafeStringify(error));
    exit(1); // 让脚本报错，工作流就能停止
  }
}
