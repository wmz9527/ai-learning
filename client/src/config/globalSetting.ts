/**
 * 全局配置文件
 */

interface EnvSetting {
  local: GlobalSetting;
  prodSetting: GlobalSetting;
}

interface GlobalSetting {
  baseUrl: string;
  domTitle: string;
  urlPrefix: string;
  storagePreName: string; // 存储key
  aesKey?: string;
  ossPath: string;
  SIGNKEY?: string;
  needEnc?: boolean; // 是否需要加密
  encSuffix?: string; // 加密后缀
  encPrefix?: string; // 加密前缀
}

/**
 * 本地环境
 */
const localSetting: GlobalSetting = {
  baseUrl: "http://localhost:9527/",
  domTitle: "王大娘的AI之旅",
  urlPrefix: "wdn",
  storagePreName: "local-wdn-ai",
  ossPath: "https://oss.xxjie.com/",
  SIGNKEY: "EDH6sOgEILMSMPkJt78ilfMUpJ5FajXJ",
  needEnc: true
};

/**
 * 生产环境
 */
const prodSetting: GlobalSetting = {
  baseUrl: "http://localhost:9527/",
  domTitle: "王大娘的AI之旅",
  urlPrefix: "factoring",
  storagePreName: "production--wdn-ai",
  ossPath: "https://oss.xxjie.com/",
}

let currentNodeEnv: string = import.meta.env.VITE_MODE;

if (import.meta.env.VITE_MODE !== "production")
  // currentNodeEnv = "production";
  currentNodeEnv = "local";

const envSetting: EnvSetting = {
  local: localSetting,
  prodSetting: prodSetting
};
console.log("currentNodeEnv", currentNodeEnv, import.meta.env.VITE_MODE);

export const globalSetting = envSetting[currentNodeEnv as keyof EnvSetting];