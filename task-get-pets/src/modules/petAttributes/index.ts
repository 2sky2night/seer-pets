import { jsonSafeStringify, logger, outputByJSONFile } from "../../utils";
import { exit } from "node:process";
import type { JSDOM } from "jsdom";

/** 解析并整理出属性数据 */
export function getPetAttributes(params: { dom: JSDOM; outputPath: string }) {
  const { dom, outputPath } = params;
  const typeMap = {
    "0": "all",
    "1": "singleAttribute",
    "2": "doubleAttributes",
  };
  const {
    window: { document },
  } = dom;
  const tab3 = document.querySelector("ul#tab3"); // ul#tab3 存放属性数据的位置
  const attributes = Array.from(tab3?.children || []).map((li) => {
    /** 获取属性id */
    const [type = "", detailId = ""] = (li.getAttribute?.("rel") || "").split(
      ",",
    );
    const a = li.children?.[0];
    const img = a.children?.[0];
    const text = a.childNodes?.[1]?.textContent || "";
    return {
      attributeType: typeMap[type as "0" | "1" | "2"],
      detailId,
      imgSrc: img.getAttribute?.("src") || "",
      name: text,
    };
  });
  const isNotValid = attributes.some(
    (attribute) => !Object.values(attribute).every((value) => value), // 每个 key 都不能为空
  );
  if (isNotValid) {
    logger.error("[getPetAttributes]属性解析有误");
    exit(1); // 让脚本报错，工作流就能停止
  }
  // 输出成文件
  try {
    outputByJSONFile({
      data: {
        attributes,
        timestamp: Date.now(), // 为了内容无变更导致的提交失败，这里做了时间戳对比
      },
      path: outputPath,
    });
    logger.info(
      "精灵属性数据已输出到路径成功" +
        jsonSafeStringify({ length: attributes.length }),
    );
  } catch (error) {
    logger.error("精灵属性数据输出失败: " + jsonSafeStringify(error));
    exit(1); // 让脚本报错，工作流就能停止
  }
}
