# bfrrequest

一个基于 `axios` 的轻量请求封装库，内置：

- 统一响应处理（按 `status/message/data` 结构解析）
- 请求/响应拦截器扩展点
- 可配置错误提示（`message` / `modal` / `none`）
- 重复请求取消（可选）
- 请求重试（可选）
- `FormData` 文件上传

## 安装

```bash
pnpm add bfrrequest axios@0.27.2 lodash-es qs
```

> `axios`、`lodash-es`、`qs` 是此库的 `peerDependencies`，业务项目需要自行安装。

## 快速开始

### 1) 初始化全局配置

```ts
import { setConfig } from "bfrrequest";

setConfig({
  apiUrl: "https://api.example.com",
  showMessageError(message) {
    // 可接入你的 UI 组件库提示，例如 message.error(message)
    console.error(message);
  },
  showModalError({ title, content }) {
    // 可接入你的弹窗组件
    console.error(title, content);
  },
  onTokenExpired() {
    // token 过期逻辑，例如跳转登录页
    console.warn("token expired");
  },
});
```

### 2) 创建请求实例

```ts
import { createAxios } from "bfrrequest";

const request = createAxios({
  timeout: 10_000,
  requestOptions: {
    // 是否自动解析后端返回结构
    isTransformResponse: true,
    // 错误提示方式：none | message | modal
    errorMessageMode: "message",
    // 关闭时可避免 URL 自动拼时间戳
    joinTime: true,
    // 请求重试
    retryRequest: {
      isOpenRetry: false,
      count: 3,
      waitTime: 200,
    },
  },
});
```

### 3) 发起请求

```ts
// GET
const user = await request.get<{ id: string; name: string }>({
  url: "/user/info",
  params: { id: "1001" },
});

// POST
const created = await request.post<{ ok: boolean }>({
  url: "/user/create",
  data: { name: "Alice" },
});
```

## 上传文件

```ts
const result = await request.uploadFile(
  { url: "/file/upload" },
  {
    file,
    name: "file",
    filename: "avatar.png",
    data: { bizType: "avatar" },
  },
);
```

## 单次请求覆盖默认配置

```ts
const data = await request.get(
  { url: "/report/list", params: { page: 1 } },
  {
    errorMessageMode: "none",
    joinTime: false,
    isTransformResponse: true,
  },
);
```

## 返回数据约定

默认按以下结构解析响应：

```ts
type Result<T> =
  | { status: "success"; message: string; data: T; datetime?: number }
  | { status: "fail"; message: string; data: undefined; datetime?: number };
```

当 `requestOptions.isTransformResponse = true` 时：

- `status === "success"`：返回 `data`
- 否则抛出异常，并按 `errorMessageMode` 触发错误提示

如果你的后端字段不一致，可在源码中的 `src/index.ts` 里调整 `transformResponseHook` 逻辑。

## 可用导出

```ts
import {
  createAxios,
  setConfig,
  getConfig,
  AxiosCanceler,
  type RequestOptions,
  type RetryRequest,
  type UploadFileParams,
  type ErrorMessageMode,
  type Result,
} from "bfrrequest";
```

## 构建

```bash
pnpm run build
```
