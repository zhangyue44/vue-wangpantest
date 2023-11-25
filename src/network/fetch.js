/**
 * @param use 封装的使用场景
 * 1. fetch封装是经过nodeJs的koa框架启动的node服务验证的，对于java启动的服务还需自行验证修改
 * 2. 验证通过了普通的get/psot、表单上传、上传文件,下载文件等
 * @param koa
 * 1. 使用koa搭建服务端时，为了搭配fetch使用要配置跨域，建议使用koa2-cors开源库
 * @param fetch
 * 1. 选择使用fetch是因为是浏览器原生支持的方法，不需引入其它依赖。同时使用fecth会遇到跨域问题，需服务端配置请求响应头
 * 2. 本次封装暴露出了get与post两个方法
 * 3. 遗留问题：没有设置超时时间 // TODO:
 * @param get post
 * 1. 形参主要有 路径path(接口的url):必传，data参数(object):选传，options配置参数(object):选传
 * 2. options参数中可以传入fecth的headers配置等，也有一个默认type属性，默认值为'json',主要处理headers中的'Content-Type'属性值
 * 3. type值有 'json' 'text' 'file' 'blob' 'arrayBuffer'等
 * @param type
 * 1. 加入type值是为了处理'Content-Type'与body取值的问题
 * 2. body取值：在type值为'json'、'text'、'blob'时,需要进行JSON.stringify()转换;在值为'file'时，无需进行转换
 * 3. 'Content-Type'取值：在type值为'json'、'text'、'blob'时,需要配置 headers["Content-Type"] = "application/json";在值为'file'时，无需进行配置，配置了反而有问题，浏览器会自行添加配置
 * @param response
 * 1. 在type值为'json'、'file'时，response.json();值为'text'时，response.text();值为'blob'时，response.blob()
 */

// 基础配置
const baseURL = "http://192.168.0.106:8002";

// 接口报错统一提示
function errorCallBack(message) {
  console.log(`${message || "接口传参错误"}`); // 正式使用时使用$message提示
}

// 公共逻辑处理
async function request(method, path, data, config = {}, type = "json") {
  if (!(typeof method === "string" && ["get", "post", "delete", "put"].includes(method)) || !(typeof path === "string") || !(!data || typeof data === "object") || !(typeof config === "object") || !(typeof type === "string")) {
    errorCallBack();
    return;
  }
  const configDefault = { headers: {} };
  method = method.toUpperCase();
  let initConfig;
  let url = path.startsWith("http") ? path : baseURL + path;
  const token = localStorage.getItem("token");
  if (token) configDefault.headers.authorization = "Bearer " + localStorage.getItem("token"); // 这里的authorization怎么赋值要看服务端的设置
  if (method === "get") {
    initConfig = { ...configDefault, ...config };
    const params = data
      ? JSON.stringify(data)
          .replace(/:/g, "=")
          .replace(/"/g, "")
          .replace(/,/g, "&")
          .match(/\{([^)]*)\}/)[1]
      : ""; // 有问题就使用qs开源库处理
    if (params) url += `${url.includes("?") ? "&" : "?"}${params}`;
  } else {
    const body = data && ["json", "text", "blob"].includes(type) ? JSON.stringify(data) : data; // json file text
    initConfig = data ? { ...configDefault, ...config, method, body } : { ...configDefault, ...config, method };
  }
  if (["json", "text", "blob"].includes(type)) initConfig.headers["Content-Type"] = "application/json";
  const response = await fetch(url, initConfig);
  // response.status [200,300)
  if (response.ok) {
    if (["text"].includes(type)) return response.text();
    if (["blob"].includes(type)) return response.blob();
    if (["arrayBuffer"].includes(type)) return response.arrayBuffer();
    return response.json();
  }
  // 也可以塞入对token失效等情况的判断以及处理逻辑
  errorCallBack("Something went wrong on API server!");
  throw new Error("Something went wrong on API server!");
}

export function get(path, params, options = { type: "json" }) {
  const config = options.config || {};
  const type = options.type || "json";
  return request("get", path, params, config, type);
}
export function post(path, params, options = { type: "json" }) {
  const config = options.config || {};
  const type = options.type || "json";
  return request("post", path, params, config, type);
}

// const timeoutPromise = (timeout) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("我是 timeoutPromise，已经完成了");
//     }, timeout);
//   });
// };
