# Leonardo Qin - Portfolio Website

一个使用 React + Vite + TailwindCSS 构建的现代个人作品集网站，定位为申请 Forward Deployed Engineer (FDE) 岗位的版本。

## 技术栈

- **React 18** - UI框架
- **Vite** - 构建工具
- **TailwindCSS** - CSS框架
- **Lucide React** - 图标库

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目特点

- ✨ 极简主义设计风格
- 📱 完全响应式布局
- 🎨 现代化的UI/UX设计
- ⚡ 快速的页面加载速度
- 🎯 清晰的信息层次结构

## 自定义指南

### 替换个人照片

将您的照片放在 `public` 文件夹中,然后在 `src/App.jsx` 中更新图片路径。

### 添加实际图片

项目中有三个图片占位符需要替换:
1. AAAI会议照片
2. 东京黑客松照片
3. Google新加坡照片

将图片放在 `public` 文件夹中,并更新 `src/App.jsx` 中的 `src` 属性。

### 修改内容

所有内容都在 `src/App.jsx` 中,可以直接编辑文本、链接和样式。

## 项目结构

```
edward-portfolio/
├── public/              # 静态资源
├── src/
│   ├── App.jsx         # 主组件
│   ├── main.jsx        # 应用入口
│   └── index.css       # 全局样式
├── index.html          # HTML模板
├── package.json        # 项目配置
├── tailwind.config.js  # TailwindCSS配置
└── vite.config.js      # Vite配置
```

## License

MIT License - 自由使用和修改
