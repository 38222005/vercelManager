# 电动车管家 App

基于 Uni-app (Vue3 + TypeScript) 开发的跨平台电动车管家应用。

## 功能特性

- ✅ 激活码激活机制
  - 临时激活码：`13255405952`（有效期24小时，只能使用一次）
  - 永久激活码：`15965867361`（永久有效）
- ✅ 动态TabBar配置
  - 固定页签：首页、其他
  - 可选页签：租赁、维修、新车
- ✅ 模块选择功能
  - 用户可自主选择所需模块
  - 至少选择一个模块
- ✅ 跨平台支持
  - Android
  - iOS
  - H5

## 技术栈

- **框架**: Uni-app + Vue3
- **语言**: TypeScript
- **状态管理**: Pinia
- **样式**: SCSS + rpx响应式单位
- **开发工具**: HBuilderX / VS Code

## 项目结构

```
电动车管家/
├── src/
│   ├── pages/              # 页面目录
│   │   ├── index/         # 首页
│   │   ├── rental/        # 租赁页
│   │   ├── maintenance/   # 维修页
│   │   ├── newVehicle/    # 新车页
│   │   ├── other/         # 其他页
│   │   ├── activation/    # 激活页面
│   │   └── moduleSelect/  # 模块选择页面
│   ├── components/        # 公共组件
│   │   └── CustomTabBar/  # 自定义TabBar
│   ├── store/             # Pinia状态管理
│   │   └── modules/
│   │       ├── activation.ts  # 激活状态
│   │       └── tabConfig.ts   # Tab配置状态
│   ├── utils/             # 工具函数
│   │   ├── activation.js  # 激活验证逻辑
│   │   ├── storage.js     # 存储工具
│   │   └── auth.js        # 权限验证
│   ├── styles/            # 全局样式
│   ├── static/            # 静态资源
│   ├── App.vue            # 应用入口
│   ├── main.js            # 主入口
│   ├── manifest.json      # 应用配置
│   └── pages.json         # 页面路由配置
├── package.json
├── vite.config.js
└── tsconfig.json
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行项目

#### H5开发模式
```bash
npm run dev:h5
```

#### App开发模式
```bash
npm run dev:app
```

#### 微信小程序开发模式
```bash
npm run dev:mp-weixin
```

### 构建项目

#### 构建H5版本
```bash
npm run build:h5
```

#### 构建App版本
```bash
npm run build:app
```

#### 构建微信小程序版本
```bash
npm run build:mp-weixin
```

## 使用 HBuilderX 运行

1. 下载并安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. 打开 HBuilderX，导入项目
3. 点击 `运行` -> `运行到浏览器` 或 `运行到小程序` 或 `运行到手机或模拟器`

## 激活码说明

| 激活码 | 类型 | 有效期 | 使用次数 |
|--------|------|--------|----------|
| `13255405952` | 临时激活 | 24小时 | 仅可使用一次 |
| `15965867361` | 永久激活 | 永久 | 可重复使用 |

## 模块配置

用户首次激活后需要选择功能模块：

- **租赁管理** - 电动车租赁服务
- **维修服务** - 预约维修保养
- **新车选购** - 新车浏览购买

至少选择一个模块，选择后App底部TabBar会动态显示对应的页签。

## 开发说明

### 屏幕适配

项目使用 `rpx` 作为主要单位，以 750rpx 为设计稿基准。

### 样式规范

- 主色调：`#007AFF`（科技蓝）
- 辅助色：`#34C759`（环保绿）
- 背景色：`#F8F8F8`
- 文字色：`#333333` / `#666666` / `#999999`

### 状态管理

使用 Pinia 进行状态管理，主要包括：

- `activationStore` - 管理激活状态
- `tabConfigStore` - 管理TabBar配置

## 后续开发计划

- [ ] 完善租赁管理功能
- [ ] 完善维修服务功能
- [ ] 完善新车选购功能
- [ ] 添加用户反馈功能
- [ ] 添加数据同步功能
- [ ] 添加推送通知功能

## License

MIT