# AI 应用开发工程师学习路径（Vue3 版）

适用背景：你已经是一名前端开发，主要技术栈是 Vue3，现在希望转向 AI 应用开发工程师，并通过系统学习、作品产出和面试准备，具备找工作的能力。

## 一、转型目标

你的目标不是成为算法工程师，而是成为能把大模型能力做成真实产品的 AI 应用开发工程师。

核心能力包括：

- 使用大模型 API 构建 AI 应用
- 设计稳定的 Prompt 和结构化输出
- 实现流式对话体验
- 构建 RAG 知识库问答系统
- 使用 Function Calling / Tool Calling 让 AI 调用业务能力
- 构建 Agent 工作流
- 做 AI 应用的工程化、评测、安全和部署

你的前端优势非常重要：

- 你已经懂用户界面和交互体验
- 你能把 AI 能力产品化
- 你能做完整作品，而不是只写接口 Demo
- Vue3 + TypeScript 可以作为你的主力技术栈继续使用

## 二、推荐技术栈

### 前端

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Naive UI / Element Plus / shadcn-vue
- Markdown 渲染组件
- SSE / Fetch Stream 流式输出

### 后端

- Node.js
- Hono 或 NestJS
- OpenAI API / 其他大模型 API
- Zod 参数校验
- Prisma ORM
- PostgreSQL

### AI 应用能力

- Prompt Engineering
- Structured Output
- Function Calling / Tool Calling
- RAG
- Embedding
- Vector Database
- Agent Workflow
- AI Evaluation
- Prompt Injection 防护

### 数据与部署

- Supabase PostgreSQL + pgvector
- Qdrant / Pinecone / Milvus 可选
- Vercel / Railway / Render / Cloudflare Workers
- GitHub
- 环境变量管理
- 日志与错误追踪

## 三、12 周学习路径

## 第 1-2 周：AI 应用基础与 Vue3 流式聊天

### 学习目标

能够使用 Vue3 做出一个基础 AI Chat 应用，并实现流式输出。

### 需要掌握

- 大模型基本概念
- token、上下文窗口、temperature
- system prompt / user prompt / assistant message
- OpenAI API 或兼容模型 API 调用
- SSE / ReadableStream
- Vue3 中实现流式输出
- loading、停止生成、错误提示、重试

### 练习任务

- 创建 Vue3 + Vite + TypeScript 项目
- 创建 Node.js 后端服务
- 实现 `/api/chat` 接口
- 前端输入问题，后端调用模型
- 前端逐字显示 AI 回复
- 支持清空会话、停止生成、错误重试

### 阶段作品

作品 1：AI 对话助手

功能包括：

- 用户输入问题
- AI 流式回答
- Markdown 渲染
- 会话历史
- 停止生成
- 错误处理

## 第 3-4 周：结构化输出与 AI 简历优化助手

### 学习目标

能够让 AI 按固定 JSON 结构返回结果，并在 Vue3 页面中渲染成完整产品界面。

### 需要掌握

- 结构化 Prompt
- JSON Schema
- Zod
- 输出格式约束
- 模型返回结果校验
- 前端模块化渲染 AI 结果
- AI 输出失败时的兜底处理

### 阶段作品

作品 2：AI 简历优化助手

功能包括：

- 输入目标岗位
- 输入岗位 JD
- 输入个人经历
- 生成岗位匹配度
- 生成简历优化建议
- 改写项目经历 bullet
- 分析技能差距
- 预测面试问题

### 建议项目结构

```txt
ai-resume-coach/
  client/
    src/
      components/
      pages/
      stores/
      api/
      types/
  server/
    src/
      routes/
      services/
      prompts/
      schemas/
  README.md
```

### 面试可讲点

- 为什么要结构化输出
- 如何处理模型返回非法 JSON
- 如何设计 Prompt
- 前端如何优雅展示 AI 结果
- 如何让结果可复制、可编辑、可导出

## 第 5-6 周：RAG 知识库问答系统

### 学习目标

能够构建一个基于私有文档回答问题的 AI 知识库。

### 需要掌握

- RAG 基本流程
- 文档上传
- PDF / Markdown / TXT 解析
- 文档 chunk 切分
- Embedding
- 向量数据库
- 相似度检索
- 引用来源展示
- 无答案拒答
- 幻觉控制

### 阶段作品

作品 3：个人知识库 AI 问答系统

功能包括：

- 上传文档
- 自动解析文本
- 文档切片
- 生成 embedding
- 存入向量数据库
- 用户提问
- 检索相关片段
- AI 基于资料回答
- 展示引用来源

### 推荐技术组合

- Vue3 + TypeScript
- Node.js + Hono
- PostgreSQL + pgvector
- Prisma
- OpenAI Embeddings 或兼容 embedding 模型

### 面试可讲点

- RAG 和微调的区别
- chunk 大小如何选择
- 如何提升召回率
- 如何减少幻觉
- 如何展示引用来源
- 如何处理用户无权限访问的文档

## 第 7-8 周：Tool Calling 与业务动作

### 学习目标

让 AI 不只是聊天，而是能调用系统工具，完成真实业务动作。

### 需要掌握

- Function Calling / Tool Calling
- 工具参数设计
- JSON Schema
- Zod 校验
- 工具调用状态展示
- 人工确认机制
- 工具失败重试
- 高风险操作权限控制

### 阶段作品

作品 4：AI 任务助理

功能包括：

- 用户用自然语言下达任务
- AI 判断是否需要调用工具
- 创建 Todo
- 查询模拟订单
- 生成邮件草稿
- 写入表单
- 高风险操作前弹出确认
- 展示工具调用过程

### 面试可讲点

- Tool Calling 的执行流程
- 参数校验为什么重要
- 如何防止模型越权操作
- 如何做人工确认
- 工具调用失败怎么办

## 第 9-10 周：Agent 工作流

### 学习目标

掌握多步骤 AI 任务，能构建可以计划、执行、观察和修正的 Agent 应用。

### 需要掌握

- Agent 基本思想
- plan -> act -> observe -> revise
- 多步骤任务状态管理
- 工作流和 Agent 的区别
- LangGraph / OpenAI Agents SDK
- 人类介入
- 长任务日志
- 失败恢复

### 阶段作品

作品 5：AI 竞品分析 Agent

功能包括：

- 输入产品名称或网址
- 自动拆解分析任务
- 搜集资料
- 提取竞品
- 生成竞品对比表
- 总结产品定位
- 输出分析报告
- 用户可查看每一步执行过程

### 面试可讲点

- Agent 和普通 Chat 的区别
- Agent 和固定 Workflow 的区别
- 如何避免 Agent 无限循环
- 如何处理工具失败
- 如何做任务状态持久化

## 第 11 周：工程化、上线与产品化

### 学习目标

把 Demo 升级成可展示、可部署、可面试的作品。

### 需要掌握

- 用户登录
- 数据库存储
- 环境变量
- API Key 安全
- Token 统计
- 成本控制
- 日志记录
- 错误追踪
- Prompt 版本管理
- AI 输出缓存
- 部署上线

### 作品升级要求

选择前面最好的一个作品，升级为正式项目：

- 有登录功能
- 有数据库
- 有真实 AI 调用
- 有完整 UI
- 有部署地址
- 有 README
- 有架构图
- 有演示截图或录屏
- 有异常处理
- 有基础评测样例

## 第 12 周：评测、安全与面试准备

### 学习目标

具备面试 AI 应用开发工程师所需的表达能力和项目讲解能力。

### 需要掌握

- AI 应用评测
- RAG 命中率
- 答案准确率
- 拒答率
- Prompt Injection
- 数据权限
- Tool Calling 安全
- 模型降级策略
- 成本优化
- 面试项目表达

### 面试重点题

- RAG 是什么？和微调有什么区别？
- 向量数据库怎么选？
- embedding 是什么？
- chunk 太大或太小有什么问题？
- 如何减少模型幻觉？
- 如何做引用来源？
- Function Calling 的流程是什么？
- Tool Calling 有哪些安全风险？
- Agent 和 Workflow 的区别是什么？
- 如何避免 Agent 无限循环？
- 前端如何实现流式输出？
- 如何处理模型响应慢？
- 如何控制 token 成本？
- 如何评估 AI 应用质量？
- 如果用户上传恶意文档怎么办？

## 四、最终作品集规划

建议最终准备 3 个高质量作品，而不是很多浅层 Demo。

### 作品一：AI 简历优化助手

展示能力：

- Vue3 交互设计
- AI 流式输出
- 结构化输出
- Prompt 设计
- 用户结果编辑与复制

适合面试表达：

- 我如何让 AI 输出稳定结构
- 我如何处理模型返回异常
- 我如何设计用户体验

### 作品二：RAG 知识库问答系统

展示能力：

- 文件上传
- 文档解析
- 向量检索
- Embedding
- 引用来源
- 幻觉控制

适合面试表达：

- RAG 全流程
- chunk 策略
- 检索质量优化
- 数据权限设计

### 作品三：AI Agent 自动化工具

展示能力：

- Tool Calling
- Agent 工作流
- 多步骤任务
- 状态展示
- 权限确认
- 工具失败处理

适合面试表达：

- AI 如何调用业务系统
- Agent 如何拆解任务
- 如何保证执行安全

## 五、每周学习节奏

建议每周投入 10-15 小时。

### 每周固定安排

- 2 小时：学习概念
- 4 小时：写代码
- 2 小时：补工程化细节
- 1 小时：写 README 和项目总结
- 1 小时：整理面试表达

### 每个阶段都要产出

- 可运行代码
- README
- 截图
- 技术总结
- 面试讲解稿

## 六、简历包装方向

你的目标岗位可以写：

- AI 应用开发工程师
- 前端 AI 应用工程师
- LLM 应用开发工程师
- AIGC 产品开发工程师
- Agent 应用开发工程师

简历关键词：

- Vue3
- TypeScript
- Node.js
- OpenAI API
- LLM
- Prompt Engineering
- RAG
- Embedding
- Vector Database
- Function Calling
- Agent
- Streaming Response
- PostgreSQL
- Prisma
- Supabase

## 七、推荐从第一个项目开始

第一个正式项目建议做：

AI 简历优化助手

原因：

- 业务容易理解
- 适合 Vue3 做界面
- 功能边界清晰
- 能快速做出作品
- 面试时容易展示
- 和求职目标天然相关

第一版功能：

- 输入目标岗位
- 输入岗位 JD
- 输入个人经历
- 点击生成分析
- 流式输出结果
- 输出简历优化建议
- 输出技能差距
- 输出面试问题

第二版功能：

- 结构化结果渲染
- 简历 bullet 改写
- 一键复制
- 导出 Markdown
- 历史记录

第三版功能：

- 登录
- 保存分析记录
- 上传 PDF 简历
- 多岗位对比
- 部署上线

## 八、学习原则

- 不要只学理论，每两周必须做出一个可运行功能
- 不要只做聊天机器人，要做有业务场景的 AI 应用
- 不要过早学习模型训练，先掌握 AI 应用工程
- 不要忽略前端体验，AI 产品非常依赖交互设计
- 不要只会调 API，要能讲清楚稳定性、安全、成本和评测

## 九、下一步行动

下一步开始做第一个作品：AI 简历优化助手。

建议开发顺序：

1. 创建 Vue3 + Vite + TypeScript 项目
2. 搭建基础页面
3. 创建 Node.js 后端服务
4. 接入大模型 API
5. 实现流式输出
6. 设计 Prompt
7. 增加结构化输出
8. 优化 UI
9. 写 README
10. 部署上线

