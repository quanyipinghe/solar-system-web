# 太阳系模拟 (Solar System Simulation)

这是一个使用 Three.js 构建的交互式3D太阳系模拟项目。用户可以探索太阳系的行星，查看它们的基本信息，并通过鼠标控制视角。

## ✨ 功能特性 (Features)

- **3D 太阳系模型**: 包含太阳和八大行星的简化3D模型。
- **行星轨道运动**: 所有行星都会围绕太阳公转，同时也会自转。
- **交互式信息卡**: 点击任意行星，会显示该行星的详细信息卡，包括直径、质量和平均日距。
- **高亮提示**: 当鼠标悬停在行星上时，行星会高亮显示。
- **自由视角控制**: 用户可以使用鼠标进行缩放、平移和旋转，以从不同角度观察太阳系。
- **动态星空背景**: 使用了程序化生成的星空作为背景，增强了沉浸感。
- **响应式设计**: 场景会根据浏览器窗口大小自动调整。
- **背景音乐**: 添加了背景音乐以提升用户体验。

## 🛠️ 技术栈 (Technologies Used)

- **HTML5**: 项目的基础结构。
- **CSS3**: 用于信息卡和基本页面样式。
- **JavaScript (ES6+)**: 项目的主要逻辑。
- **[Three.js](https://threejs.org/)**: 一个强大的3D图形库，用于创建和渲染3D场景。

## 🚀 如何运行 (Setup and Installation)

这是一个纯前端项目，无需复杂的安装过程。

1.  **克隆或下载项目**:
    ```bash
    git clone https://github.com/your-username/solar-system-web.git
    ```
2.  **打开 `index.html`**:
    由于浏览器安全策略（CORS），直接在本地文件系统打开 `index.html` 可能会导致某些功能（如纹理加载）无法正常工作。推荐使用一个简单的本地服务器来运行项目。

    **使用 VS Code 的 Live Server 插件**:
    - 在 VS Code 中安装 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 插件。
    - 在项目文件夹中，右键点击 `index.html` 文件，选择 "Open with Live Server"。

    **使用 Python 的简易服务器**:
    - 确保您的电脑安装了 Python。
    - 在项目根目录下打开终端，运行以下命令：
      ```bash
      # Python 3
      python -m http.server
      # Python 2
      python -m SimpleHTTPServer
      ```
    - 在浏览器中访问 `http://localhost:8000`。

## 🎮 如何使用 (How to Use)

- **旋转视角**: 按住鼠标左键并拖动。
- **平移视角**: 按住鼠标右键并拖动。
- **缩放视角**: 滚动鼠标滚轮。
- **查看行星信息**: 单击任意行星。
- **关闭信息卡**: 点击信息卡右上角的 "×" 按钮。

## 📂 文件结构 (File Structure)

```
.
├── .gitignore       # Git 忽略文件配置
├── index.html       # 主 HTML 文件
├── main.js          # Three.js 场景、动画和交互逻辑
├── style.css        # 页面样式文件
├── README.md        # 项目说明文档
└── background-music.mp3 # (需要您自行添加) 背景音乐文件
```
