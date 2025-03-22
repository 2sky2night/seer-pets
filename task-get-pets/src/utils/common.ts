import { request } from "node:https";
import { logger } from "./";
import { writeFileSync } from "node:fs";

/**
 * 安全的获取Promise的结果，无需try catch
 * @param promiseTask
 * @example
 * const [err, data] = await box(promiseTask);
 * if(err){
 *   console.error(err);
 * }else{
 *   console.log(data);
 * }
 */
export function box<T, E = any>(promiseTask: Promise<T>) {
  return promiseTask
    .then<[null, T]>((data) => [null, data])
    .catch<[E, null]>((err) => [err, null]);
}

/** unicode转中文 */
export function toChineseWords(unicodeStr: string): string {
  return eval("'" + unicodeStr + "'");
}

/** 安全的 JSON.stringify */
export function jsonSafeStringify(value: any) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    return null;
  }
}

/** 请求网站数据 */
export function fetchWebsite(params: { url: string; timeout: number }) {
  const { url = "", timeout = 3000 } = params || {};
  const urlInst = new URL(url);
  let fetchPromiseInnerResolve: (value: string) => void;
  let fetchPromiseInnerReject: (reason?: any) => void;
  const fetchPromise = new Promise<string>((resolve, reject) => {
    fetchPromiseInnerResolve = resolve;
    fetchPromiseInnerReject = reject;
  });
  const req = request(
    {
      hostname: urlInst.hostname,
      path: urlInst.pathname,
      method: "GET",
      timeout: timeout,
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        // "accept-encoding": "gzip, deflate, br, zstd", // 非特殊处理，会导致乱码掉
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "sec-ch-ua": `"Chromium";v="134", "Not:A-Brand";v="24", "Microsoft Edge";v="134"`,
        "sec-ch-ua-platform": "Windows",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
      },
    },
    (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const result = Buffer.concat(chunks).toString();
        fetchPromiseInnerResolve(result);
      });
      res.on("error", (err) => {
        fetchPromiseInnerReject(err);
      });
    },
  );
  req.end(); // 发送请求。这一步不能忘了，否则请求不会被发送，就和res.send一样
  req.on("error", (err) => {
    fetchPromiseInnerReject(err);
  });
  return fetchPromise.catch((err) => {
    logger.error("[fetchWebsite]请求网站数据失败: " + jsonSafeStringify(err));
    throw err;
  });
}

/** 将数据转换成json输出到制定目录 */
export function outputByJSONFile<D>(params: { data: D; path: string }) {
  const { data = "", path = "" } = params;
  try {
    const dataStr = JSON.stringify(data, null, 2);
    writeFileSync(path, dataStr);
    logger.info("数据已输出到路径: " + path);
  } catch (error) {
    logger.error("数据输出失败: " + jsonSafeStringify(error));
  }
}
