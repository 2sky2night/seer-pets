/** 精灵 */
export interface IPet {
  /**
   * 精灵名称
   * @example "小火猴"
   */
  name: string;
  /**
   * 精灵详情页
   * @example "http://news.4399.com/gonglue/seer/tujian/1001316.htm"
   */
  detailUrl: string;
  /**
   * * 精灵图片
   * @example "//newsimg.5054399.com/uploads/userup/2502/261025159338.jpg"
   */
  img: string;
  /**
   * 精灵属性id
   * @example "2093"
   */
  detailId: string;
  /**
   * 搜索关键词
   * @example "B"
   */
  keywords: string;
  /**
   * 精灵id
   * @example "003"
   */
  id: string;
  /**
   * 精灵属性
   * @example "草"
   */
  attribute: string;
  /**
   * 专属技能
   * @example "飞叶风暴"
   */
  proprietarySkill: string;
  /**
   * 来源、怎么获得
   * @example "http://news.4399.com/seer/zenmezhua/201104-11-92572.html"
   */
  source: string;
  /**
   * 种族值
   * @example "525"
   */
  raceValue: string;
}

/** 精灵列表 */
export type IPets = IPet[];

/** 精灵原始数据 */
export type IPetRaw = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];
/** 精灵原始数据列表 */
export type IPetsRaw = IPetRaw[];
