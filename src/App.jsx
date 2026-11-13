import { useEffect, useState } from 'react';
import { 
  ArrowUpRight, 
  Mail, 
  Github, 
  Linkedin, 
  ChevronRight,
  BookOpen,
  Award,
  Globe,
  X,
  Calendar,
  MapPinIcon,
  Languages
} from 'lucide-react';

const EXPERIENCE_ROUTES = {
  aaai: 'experiences/aaai-2025',
  hackathon: 'experiences/tokyo-singapore-hackathons',
  cyber_exchange: 'experiences/international-cybersecurity-exchange',
  nvidia_gtc: 'insights/nvidia-gtc-2026'
};

// 从当前 URL 中解析语言：路径以 /en/ 开头即为英文版，用于直达链接与刷新后保持语言一致
const resolveLangFromPath = (basePath) => {
  if (typeof window === 'undefined') return 'zh';
  const pathname = window.location.pathname.replace(/\/$/, '');
  const normalizedBasePath = basePath.replace(/\/$/, '');
  const relativePath = pathname.startsWith(normalizedBasePath)
    ? pathname.slice(normalizedBasePath.length).replace(/^\/|\/$/g, '')
    : '';
  return relativePath.split('/')[0] === 'en' ? 'en' : 'zh';
};

const PortfolioLight = () => {
  const [selectedExperienceId, setSelectedExperienceId] = useState(null);
  // GitHub Pages 部署在子路径下，需要用 BASE_URL 拼接 public 目录下的静态资源路径
  const BASE = import.meta.env.BASE_URL;
  // 初始语言直接从 URL 解析，避免英文直达链接先闪一下中文再切换
  const [lang, setLang] = useState(() => resolveLangFromPath(BASE));
  // 轻量翻译辅助函数：按当前语言返回对应文案，中文排版保持不变，英文内容参照中文结构书写
  const t = (zh, en) => (lang === 'en' ? en : zh);
  // 当前语言对应的 URL 前缀：英文版路径统一加 en/，中文保持原路径不变
  const langPrefix = lang === 'en' ? 'en/' : '';

  // 切换语言的同时同步更新 URL（不新增历史记录），保证地址栏与内容语言一致，方便直接分享/收藏
  const toggleLang = () => {
    const newLang = lang === 'zh' ? 'en' : 'zh';
    const currentRoute = selectedExperienceId ? `${EXPERIENCE_ROUTES[selectedExperienceId]}/` : '';
    const newPath = `${BASE}${newLang === 'en' ? 'en/' : ''}${currentRoute}`;

    window.history.replaceState(window.history.state, '', newPath);
    setLang(newLang);
  };

  // 经历详情数据
  const experiences = {
    nvidia_gtc: {
      id: 'nvidia_gtc',
      title: 'NVIDIA GTC 2026: From AI Factories to Enterprise Agents',
      subtitle: t(
        '从 Token 经济、异构推理到企业级 Agent 治理',
        'From token economics and heterogeneous inference to enterprise-grade Agent governance'
      ),
      location: 'San Jose, USA · Online',
      date: 'March 16, 2026',
      category: 'AI Native',
      image: `${BASE}GDC2026.png`,
      content: [
        {
          type: 'intro',
          text: t(
            'NVIDIA GTC 2026 的核心信号，是 AI 基础设施正在从以训练规模为中心，转向以持续、低成本地产出高质量 Token 为目标。对云上 AI 系统而言，算力价值不再只由 GPU 数量决定，而要综合衡量吞吐、时延、功耗、成本与业务收入。',
            'The core signal from NVIDIA GTC 2026 is that AI infrastructure is shifting from a training-scale-centric model toward sustained, low-cost production of high-quality tokens. For cloud AI systems, the value of compute is no longer defined by GPU count alone, but by a joint view of throughput, latency, power consumption, cost and business revenue.'
          )
        },
        {
          type: 'link',
          text: t('NVIDIA GTC 2026 官方回顾', 'Official NVIDIA GTC 2026 recap'),
          url: 'https://blogs.nvidia.com/blog/gtc-2026-news/'
        },
        {
          type: 'heading',
          text: t('AI Factory：用 Token 产出重新衡量云端算力', 'AI Factory: re-measuring cloud compute by token output')
        },
        {
          type: 'paragraph',
          text: t(
            '传统数据中心主要存储和处理文件，AI Factory 则持续将算力、电力和数据转化为 Token。对于云上 AI 业务，更有意义的指标是单位功耗下的 Token 吞吐、并发下的响应速度，以及每百万 Token 的综合成本。',
            'Traditional data centers mainly store and process files, while an AI Factory continuously converts compute, power and data into tokens. For cloud AI workloads, the metrics that matter are token throughput per watt, response speed under concurrency, and the blended cost per million tokens.'
          )
        },
        {
          type: 'paragraph',
          text: t(
            '这意味着系统设计不能停留在"选择哪一种 GPU"，而应从客户的请求特征和服务目标出发，联合评估首 Token 时延、持续生成速度、峰值并发、资源利用率与成本边界，再决定模型、推理引擎和集群形态。',
            'This means system design can no longer stop at "which GPU to choose." Instead, it should start from the customer\'s request patterns and service goals, jointly evaluating time-to-first-token, sustained generation speed, peak concurrency, resource utilization and cost boundaries before deciding on the model, inference engine and cluster topology.'
          )
        },
        {
          type: 'heading',
          text: t('异构推理：为不同计算阶段匹配合适的资源', 'Heterogeneous inference: matching the right resource to each compute stage')
        },
        {
          type: 'paragraph',
          text: t(
            'Vera Rubin 平台与 Groq 3 LPX 展示了异构推理的发展方向：GPU 继续承担通用、高吞吐的训练与推理任务，专用加速器则服务于对低时延和确定性要求更高的生成阶段。算力池需要根据 Prefill、Decode 和长上下文处理的差异进行组合与调度。',
            'The Vera Rubin platform and Groq 3 LPX point to where heterogeneous inference is heading: GPUs continue to handle general-purpose, high-throughput training and inference, while dedicated accelerators serve generation stages that demand lower latency and more deterministic behavior. Compute pools need to be composed and scheduled according to the different demands of prefill, decode and long-context processing.'
          )
        },
        {
          type: 'paragraph',
          text: t(
            '结合对低时延在线推理与云端模型部署的实践观察，真实瓶颈往往分散在模型结构、推理引擎、调度策略、网络链路和业务交互流程中。只有进行端到端观测和联合优化，硬件能力才能转化为用户可感知的收益。',
            'Based on hands-on observations of low-latency online inference and cloud model deployment, real bottlenecks are usually scattered across model architecture, the inference engine, scheduling policy, network links and business interaction flows. Only end-to-end observability and joint optimization can turn raw hardware capability into gains users actually perceive.'
          )
        },
        {
          type: 'heading',
          text: t('企业级 Agent：能力之外还需要安全边界', 'Enterprise Agents: capability alone is not enough without security boundaries')
        },
        {
          type: 'paragraph',
          text: t(
            'NVIDIA 同期发布 NemoClaw，通过 OpenShell 为 OpenClaw Agent 增加隔离执行、网络控制、隐私路由和策略治理能力。这反映出 Agent 从个人工具进入企业环境后，真正的门槛不仅是模型能力，还包括权限、数据安全、可观测性和责任边界。',
            'NVIDIA also released NemoClaw at the same time, using OpenShell to add isolated execution, network control, privacy routing and policy governance to OpenClaw Agents. This reflects that once Agents move from personal tools into enterprise environments, the real bar is no longer just model capability, but also permissions, data security, observability and clear accountability boundaries.'
          )
        },
        {
          type: 'heading',
          text: t('对云端 AI 工程落地的三点启示', 'Three takeaways for shipping cloud AI systems')
        },
        {
          type: 'subheading',
          text: t('1. 从业务 SLO 反推算力架构', '1. Derive the compute architecture from business SLOs')
        },
        {
          type: 'paragraph',
          text: t(
            '先定义交互时延、并发规模、可用性和成本目标，再选择模型规格、推理引擎与资源组合，避免将硬件参数直接等同于业务效果。',
            'Define interaction latency, concurrency scale, availability and cost targets first, then choose the model size, inference engine and resource mix — avoid equating raw hardware specs directly with business outcomes.'
          )
        },
        {
          type: 'subheading',
          text: t('2. 用真实流量完成 POC 与容量验证', '2. Validate POCs and capacity with real traffic')
        },
        {
          type: 'paragraph',
          text: t(
            '以代表性请求、长短上下文和峰值并发进行压测，持续观察端到端时延与资源利用率，让 POC 结果能够支撑后续容量规划和规模化交付。',
            'Stress-test with representative requests, mixed-length contexts and peak concurrency, continuously tracking end-to-end latency and resource utilization — so POC results can genuinely support later capacity planning and large-scale delivery.'
          )
        },
        {
          type: 'subheading',
          text: t('3. 将安全与治理纳入 Agent 架构', '3. Build security and governance into the Agent architecture from the start')
        },
        {
          type: 'paragraph',
          text: t(
            '企业 Agent 的工具调用、数据访问和外部通信需要最小权限、隔离执行、审计与策略控制。治理能力应在系统设计阶段进入架构，而不是上线后的补丁。',
            'Tool calls, data access and external communication by enterprise Agents require least-privilege permissions, isolated execution, auditing and policy control. Governance should be part of the architecture at the design stage, not a patch bolted on after launch.'
          )
        },
        {
          type: 'list',
          items: [
            t('以 Token 吞吐、时延、功耗和成本共同衡量算力价值', 'Measure compute value jointly by token throughput, latency, power and cost'),
            t('通过异构资源与端到端优化匹配不同推理负载', 'Match heterogeneous resources and end-to-end optimization to different inference workloads'),
            t('以真实业务流量验证 POC，并沉淀容量与交付依据', 'Validate POCs with real business traffic and turn results into capacity and delivery evidence'),
            t('将权限、安全和可观测性作为企业 Agent 的基础能力', 'Treat permissions, security and observability as baseline capabilities for enterprise Agents')
          ]
        },
        {
          type: 'quote',
          text: t(
            '云端 AI 工程的价值，不在于堆叠最多的算力，而在于把合适的算力稳定地转化为可衡量的业务体验。',
            'The value of a cloud AI system is not about stacking the most compute, but about reliably turning the right amount of compute into a measurable business experience.'
          )
        }
      ]
    },
    aaai: {
      id: 'aaai',
      title: 'AAAI 2025: From Theory to Practice',
      subtitle: t(
        '大语言模型在代码漏洞检测方向的研究',
        'Research on large language models for code vulnerability detection'
      ),
      location: 'Philadelphia, USA',
      date: 'February 2025',
      category: 'Technical Research',
      image: '',
      content: [
        {
          type: 'heading',
          text: t('参会背景', 'Background')
        },
        {
          type: 'paragraph',
          text: t(
            '2025年2月，我前往美国费城参加人工智能领域顶级学术会议 AAAI 2025，并作为第一作者就大语言模型在代码漏洞检测方向的研究成果进行了口头汇报。本次大会聚焦AI安全、多模态处理、具身智能等前沿领域，通过和业内学者的分享和交流，提升了我对AI技术发展趋势的宏观了解、加深了我对AI安全领域的认知。',
            'In February 2025, I traveled to Philadelphia, USA to attend AAAI 2025, one of the top academic conferences in artificial intelligence, and gave an oral presentation as first author on my research into large language models for code vulnerability detection. The conference covered frontier areas such as AI safety, multimodal processing and embodied intelligence; exchanging ideas with researchers there broadened my view of AI trends and deepened my understanding of AI safety.'
          )
        },
        {
          type: 'image-dual',
          images: [
            {
              src: `${BASE}923212869c3657d8a1113cce9148381c.jpg`,
              caption: t('AAAI 2025 会议现场 - 费城', 'AAAI 2025 conference venue - Philadelphia')
            },
            {
              src: `${BASE}poster.jpg`,
              caption: t('研究海报展示', 'Research poster presentation')
            }
          ]
        },
        {
          type: 'heading',
          text: t('研究成果与实践', 'Research outcomes and practice')
        },
        {
          type: 'paragraph',
          text: t(
            '我的入选论文 "CLNX: Bridging Code and Natural Language for C/C++ Vulnerability-Contributing Commits Identification" 聚焦于提升大语言模型在代码漏洞检测上的能力。随着大语言模型在自然语言处理上的快速发展，其在程序语言领域的应用展现出巨大的挖掘空间。',
            'My accepted paper, "CLNX: Bridging Code and Natural Language for C/C++ Vulnerability-Contributing Commits Identification," focuses on improving large language models\' ability to detect code vulnerabilities. As LLMs have rapidly advanced in natural language processing, their application to programming languages reveals substantial untapped potential.'
          )
        },
        {
          type: 'link',
          text: t('🔗 查看 AAAI 2025 正式论文', '🔗 View the published AAAI 2025 paper'),
          url: 'https://ojs.aaai.org/index.php/AAAI/article/view/34689'
        },
        {
          type: 'paragraph',
          text: t(
            '漏洞检测作为软件安全的核心环节，具有显著的经济效益，但传统检测方法的效率已难以匹配现代软件的迭代提速。据 OSSRA 报告显示，84% 的受检开源代码库中存在已知漏洞，48% 包含高危风险。',
            'Vulnerability detection is a core part of software security with significant economic value, yet traditional detection methods struggle to keep pace with the accelerating iteration speed of modern software. According to the OSSRA report, 84% of audited open-source codebases contain known vulnerabilities, and 48% carry high-risk issues.'
          )
        },
        {
          type: 'heading',
          text: t('技术创新点', 'Technical innovation')
        },
        {
          type: 'paragraph',
          text: t(
            '基于实际工作中对漏洞检测任务的洞察（高度不可预测性、紧急性及形式多样性），我们发现当前基于模型二次预训练或架构重构的方法，普遍存在计算资源开销过大以及通用性较低（往往只能局限于特定子任务）的弊端。',
            'Based on hands-on insight into vulnerability detection (its unpredictability, urgency and diverse forms), we found that existing approaches based on further pretraining or architecture redesign generally suffer from excessive compute cost and limited generality, often restricted to narrow sub-tasks.'
          )
        },
        {
          type: 'paragraph',
          text: t(
            '为此，我们提出了一种轻量化的插件式方案：从结构到 Token 层面将程序代码的分布特征向自然语言对齐，以"外挂"形式增强现有基础大模型对程序语言的理解力，并着重强化漏洞相关特征的提取。',
            'To address this, we proposed a lightweight, plug-in style approach: aligning the distributional features of program code with natural language at both the structural and token level, acting as an "add-on" that strengthens an existing base LLM\'s understanding of code, with particular emphasis on extracting vulnerability-related features.'
          )
        },
        {
          type: 'list',
          items: [
            t('该方法在公开数据集上达到了 SOTA 水平', 'Achieved state-of-the-art results on public benchmarks'),
            t('在实际应用中成功检测出 38 个开源软件漏洞', 'Successfully detected 38 real-world open-source vulnerabilities in practice'),
            t('计算资源开销降低 60% 以上', 'Reduced compute overhead by more than 60%'),
            t('可快速适配不同的基础大模型', 'Quickly adaptable to different base LLMs')
          ]
        },
        {
          type: 'heading',
          text: t('核心收获与思考', 'Key takeaways and reflections')
        },
        {
          type: 'subheading',
          text: t('1. 技术架构的务实选择', '1. Pragmatic choice of technical architecture')
        },
        {
          type: 'paragraph',
          text: t(
            '针对不同的工程环节应匹配最优的模型架构。在漏洞识别任务上，优先使用双向编码架构的小模型（如 BERT），能在保证极低算力开销的同时获得较高的检测准确率；而在漏洞修复阶段，则适合引入单向解码的生成式大模型（如 GPT、Llama）以输出高质量的修复方案。',
            'Different engineering stages call for different model architectures. For vulnerability identification, small bidirectional encoder models (like BERT) achieve high accuracy at very low compute cost; for vulnerability remediation, autoregressive generative LLMs (like GPT or Llama) are better suited to producing high-quality fix suggestions.'
          )
        },
        {
          type: 'paragraph',
          text: t(
            '这一兼顾效率与性能的模式，在腾讯、字节等头部互联网企业的内部工程实践中也得到了落地印证。',
            'This balance of efficiency and performance has also been validated in internal engineering practice at leading internet companies such as Tencent and ByteDance.'
          )
        },
        {
          type: 'subheading',
          text: t('2. 技术趋势与商业价值的映射', '2. Mapping technical trends to business value')
        },
        {
          type: 'paragraph',
          text: t(
            '近期 Anthropic 推出的代码安全工具 Claude Code Security，凭借大模型的逻辑推理能力解决了传统工具仅靠规则匹配的痛点，其发布甚至引发了美股大幅波动。',
            'Anthropic\'s recently released code security tool, Claude Code Security, leverages LLM reasoning to solve the pain points of traditional rule-matching tools — its launch even triggered a notable swing in US equity markets.'
          )
        },
        {
          type: 'paragraph',
          text: t(
            '这不仅印证了"高危漏洞潜伏与安全专家产能不足"这一行业痛点背后的巨大商业价值，也侧面验证了我们在 25 年初立项的这项工作具有明确的行业前瞻性与实际意义。',
            'This confirms the significant commercial value behind the industry pain point of "latent high-risk vulnerabilities and a shortage of security expert capacity," and also validates that the work we initiated in early 2025 had clear foresight and practical relevance.'
          )
        },
        {
          type: 'quote',
          text: t(
            '真正的技术理解来自于实践。从学术研究到工程落地，从技术创新到商业价值，只有深入一线才能把握AI技术的真实护城河。',
            'Real technical understanding comes from practice. From academic research to engineering delivery, from technical innovation to business value — only by staying close to the front line can you grasp where AI technology\'s true moat lies.'
          )
        }
      ]
    },
    hackathon: {
      id: 'hackathon',
      title: 'Tokyo & Singapore: Building MVPs',
      subtitle: t(
        '全球黑客松大赛：从技术前沿到产品落地',
        'Global hackathons: from frontier technology to shipped products'
      ),
      location: 'Tokyo, Japan & Singapore',
      date: '2025-2026',
      category: 'Global Hackathon',
      image: '',
      content: [
        {
          type: 'image-dual',
          images: [
            { src: `${BASE}Tokyo.jpg`, caption: 'Tokyo Hackathon' },
            { src: `${BASE}Singapore.jpg`, caption: 'Singapore Hackathon' }
          ]
        },
        {
          type: 'intro',
          text: t(
            '出于对前沿技术落地的热情，我在业余时间参与了多场国际 AI 黑客松大赛。这类比赛通常要求 2-3 人的小团队在 48-72 小时的极限时间内，完成从产品构思、代码开发到最小可行性产品（MVP）路演的完整闭环。',
            'Driven by a passion for turning frontier technology into real products, I took part in several international AI hackathons in my spare time. These competitions typically require a small team of 2-3 people to complete the full loop — from product ideation and coding to pitching a minimum viable product (MVP) — within an extreme 48-72 hour window.'
          )
        },
        {
          type: 'heading',
          text: t('参与背景与商业探索', 'Background and business exploration')
        },
        {
          type: 'paragraph',
          text: t(
            '其中较具代表性的是 2025 年东京黑客松与 2026 年初新加坡黑客松。前者侧重于 Agent Workflow 的行业落地，探索如何用 AI 解决企业真实业务问题；后者则聚焦于 Google AI 生态的应用，探索如何最大化发挥 Gemini 3 的底层能力，构建具备商业价值的应用产品。',
            'Two of the most representative events were the 2025 Tokyo Hackathon and the early-2026 Singapore Hackathon. The former focused on landing Agent workflows in real industries, exploring how AI can solve genuine enterprise problems; the latter centered on the Google AI ecosystem, exploring how to maximize Gemini 3\'s underlying capabilities to build products with real commercial value.'
          )
        },
        {
          type: 'heading',
          text: t('产品构建：Vibero - Vibe Reading AI 阅读器', 'Building the product: Vibero - a Vibe Reading AI reader')
        },
        {
          type: 'link',
          text: t('🔗 产品官网：vibero.dev', '🔗 Product site: vibero.dev'),
          url: 'https://vibero.dev/'
        },
        {
          type: 'paragraph',
          text: t(
            '在新加坡的 Google Gemini 3 黑客松中，针对深度文献阅读中的真实痛点，我们结合当下前沿的"Vibe Coding"理念，开发了一款名为 Vibero 的 Vibe Reading 非线性阅读器。',
            'At the Google Gemini 3 Hackathon in Singapore, we targeted real pain points in deep literature reading and, borrowing from the cutting-edge "vibe coding" philosophy, built a non-linear reading product called Vibero — a "vibe reading" experience.'
          )
        },
        {
          type: 'paragraph',
          text: t(
            '该产品的核心立意在于：现代化的 AI 阅读器应当是提升效率、辅助人类聚焦注意力的工具，把更多的时间留给深度思考，而不是简单粗暴地替代人类思考。',
            'The product\'s core premise is that a modern AI reader should be a tool that boosts efficiency and helps humans focus their attention, leaving more time for deep thinking — rather than crudely replacing human thought altogether.'
          )
        },
        {
          type: 'video',
          src: `${BASE}vibero.mp4`,
          caption: t('Vibero 产品界面 - 协同阅读体验', 'Vibero product interface - collaborative reading experience')
        },
        {
          type: 'subheading',
          text: t('核心产品体验', 'Core product experience')
        },
        {
          type: 'paragraph',
          text: t('在具体实现上，我们侧重了以下产品体验：', 'In implementation, we focused on the following aspects of the experience:')
        },
        {
          type: 'subheading',
          text: t('1. 沉浸式与协同交互', '1. Immersive and collaborative interaction')
        },
        {
          type: 'paragraph',
          text: t(
            '通过智能段落切分和最小化干扰设计优化阅读体验，并创新性地实现了"代码与论文"的协同阅读。用户可以在互动中对不同段落生成重点卡片，并支持一键查找论文方法对应的底层代码。',
            'We optimized the reading experience through intelligent paragraph segmentation and minimal-distraction design, and innovatively enabled "code and paper" co-reading. Users can generate highlight cards for different paragraphs through interaction, and jump with one click from a paper\'s method section to its corresponding underlying code.'
          )
        },
        {
          type: 'subheading',
          text: t('2. 多线程的时间利用', '2. Multithreaded use of time')
        },
        {
          type: 'paragraph',
          text: t(
            '我们在系统中深度集成了 Gemini 3 的 Deep Research 功能。当用户开始阅读时，模型在后台异步运行；当用户完成阅读时，一份完整的可视化研究报告已同步生成。',
            'We deeply integrated Gemini 3\'s Deep Research feature into the system. While the user reads, the model runs asynchronously in the background; by the time the user finishes reading, a complete, visualized research report has already been generated in parallel.'
          )
        },
        {
          type: 'paragraph',
          text: t(
            '这种将"用户阅读时间"与"模型推理时间"巧妙重叠的设计，大幅提升了产品的整体效能与使用体验。',
            'This design, which cleverly overlaps "user reading time" with "model inference time," significantly improves the product\'s overall efficiency and user experience.'
          )
        },
        {
          type: 'heading',
          text: t('实践成果', 'Results')
        },
        {
          type: 'paragraph',
          text: t(
            '凭借清晰的痛点洞察与完整的产品交付，我们的项目在比赛中成功入围 Finalist 并获得 Honorable Mention。这段经历不仅锻炼了我的敏捷开发能力，也让我加深了对 AI 产品在真实场景中如何寻找 Product-Market Fit (PMF) 的理解。',
            'With a clear insight into the pain point and a complete product delivery, our project advanced to the Finalist round and received an Honorable Mention. This experience sharpened my agile development skills and deepened my understanding of how an AI product finds product-market fit (PMF) in the real world.'
          )
        },
        {
          type: 'list',
          items: [
            t('48小时内完成从0到1的产品开发', 'Built the product from zero to one within 48 hours'),
            t('成功入围新加坡 Google Gemini 3 黑客松 Finalist 并获 Honorable Mention', 'Advanced to Finalist and received an Honorable Mention at the Google Gemini 3 Hackathon in Singapore'),
            t('创新性地解决深度阅读场景的真实痛点', 'Addressed a real pain point in deep-reading scenarios with an innovative approach'),
            t('深度理解 AI 产品的 PMF 寻找过程', 'Gained deep insight into how AI products find product-market fit')
          ]
        },
        {
          type: 'image-dual',
          images: [
            { src: `${BASE}event1.jpg`, caption: t('比赛现场', 'Competition venue') },
            { src: `${BASE}event2.jpg`, caption: t('Finalists 名单', 'List of Finalists') }
          ]
        },
        {
          type: 'quote',
          text: t(
            '好的产品不是设计出来的，而是做出来的。在极限时间压力下交付MVP，是对产品思维、技术能力和团队协作的综合考验。',
            'A good product isn\'t designed — it\'s built. Delivering an MVP under extreme time pressure is a comprehensive test of product thinking, technical ability and teamwork.'
          )
        }
      ]
    },
    cyber_exchange: {
      id: 'cyber_exchange',
      title: 'International Cybersecurity Exchange Program',
      subtitle: t(
        '跨文化技术沟通、专业翻译与现场协调',
        'Cross-cultural technical communication, professional interpretation and on-site coordination'
      ),
      location: 'Wuhan, China',
      category: 'Global Collaboration',
      image: '',
      content: [
        {
          type: 'intro',
          text: t(
            '在一项面向发展中国家的国际网络安全研修项目中，我全程参与武汉行程，担任网络安全产业板块的专业翻译与解说，并负责会场翻译和现场协调。',
            'In an international cybersecurity training program for developing countries, I took part in the full Wuhan itinerary as the professional interpreter and presenter for the cybersecurity industry track, also handling on-site interpretation and coordination.'
          )
        },
        {
          type: 'image-dual',
          equalImageHeight: true,
          images: [
            {
              src: `${BASE}cyber-exchange-visit.png`,
              caption: t('网络安全产业交流活动', 'Cybersecurity industry exchange event')
            },
            {
              src: `${BASE}cyber-exchange-interpreter.png`,
              caption: t('会场翻译工作记录', 'On-site interpretation at the venue')
            }
          ]
        },
        {
          type: 'heading',
          text: t('将专业内容转化为跨文化沟通', 'Turning technical content into cross-cultural communication')
        },
        {
          type: 'paragraph',
          text: t(
            '面对来自不同文化与技术背景的参与者，我需要在准确传递网络安全、数据基础设施等专业概念的同时，根据交流对象调整解释方式，让复杂技术能够被清晰理解。',
            'Working with participants from diverse cultural and technical backgrounds, I had to accurately convey concepts in cybersecurity and data infrastructure while adapting my explanations to each audience, so that complex technical content could be clearly understood.'
          )
        },
        {
          type: 'heading',
          text: t('专业翻译之外的现场协作', 'On-site collaboration beyond interpretation')
        },
        {
          type: 'list',
          items: [
            t('承担网络安全产业内容的中英文专业翻译与讲解', 'Provided professional Chinese-English interpretation and explanation for cybersecurity industry content'),
            t('全程支持武汉行程中的会场翻译与现场协调', 'Supported venue interpretation and on-site coordination throughout the Wuhan itinerary'),
            t('协助在四个网络安全与数据基础设施基地开展研修活动', 'Helped run training activities across four cybersecurity and data infrastructure sites'),
            t('以清晰、准确的技术表达获得参与方积极反馈', 'Received positive feedback from participants for clear and accurate technical communication')
          ]
        },
        {
          type: 'heading',
          text: t('对客户现场交付工作的启示', 'Implications for customer-facing delivery')
        },
        {
          type: 'paragraph',
          text: t(
            '国际客户交流不仅要求语言流利，还要求理解对方的知识背景、关注重点与沟通节奏。Forward Deployed Engineer 需要在客户现场与技术团队、业务团队建立共同语境，把需求直接转化为可执行的工程任务，推动信息从"被翻译"走向"被理解并形成行动"。',
            'Communicating with international clients requires more than language fluency — it requires understanding their technical background, priorities and communication pace. A forward deployed engineer needs to build shared context on site between engineering teams, business teams and clients, turning needs directly into executable engineering work — moving information from being merely "translated" to being "understood and acted upon."'
          )
        },
        {
          type: 'quote',
          text: t(
            '跨文化沟通的目标不是逐字转换，而是让不同背景的参与者对问题、方案和下一步形成一致理解。',
            'The goal of cross-cultural communication is not word-for-word conversion, but ensuring that participants from different backgrounds reach a shared understanding of the problem, the solution and the next steps.'
          )
        }
      ]
    }
  };

  // 根据当前 URL 同步语言与经历详情页状态：/en/ 前缀代表英文版，去掉前缀后匹配经历路由
  const syncExperienceWithPath = () => {
    const basePath = BASE.replace(/\/$/, '');
    const pathname = window.location.pathname.replace(/\/$/, '');
    const relativePath = pathname.startsWith(basePath)
      ? pathname.slice(basePath.length).replace(/^\/|\/$/g, '')
      : '';
    const segments = relativePath.split('/').filter(Boolean);
    const isEnglish = segments[0] === 'en';
    const pathAfterLang = (isEnglish ? segments.slice(1) : segments).join('/');

    setLang(isEnglish ? 'en' : 'zh');

    const experienceId = Object.keys(EXPERIENCE_ROUTES).find(
      (id) => EXPERIENCE_ROUTES[id] === pathAfterLang
    );
    const experience = experienceId ? experiences[experienceId] : null;

    setSelectedExperienceId(experienceId || null);
    document.title = experience
      ? `${experience.title} | Leonardo Qin`
      : 'Leonardo Qin - Portfolio';
  };

  useEffect(() => {
    syncExperienceWithPath();
    window.addEventListener('popstate', syncExperienceWithPath);

    return () => window.removeEventListener('popstate', syncExperienceWithPath);
  }, []);

  // 根据当前语言给 html 标签打上对应 lang 属性，便于浏览器/SEO识别
  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
  }, [lang]);

  const openExperience = (experienceId) => {
    const route = EXPERIENCE_ROUTES[experienceId];
    const experience = experiences[experienceId];

    window.history.pushState(
      { portfolioExperience: experienceId },
      '',
      `${BASE}${langPrefix}${route}/`
    );
    setSelectedExperienceId(experienceId);
    document.title = `${experience.title} | Leonardo Qin`;
  };

  const closeExperience = () => {
    if (window.history.state?.portfolioExperience) {
      window.history.back();
      return;
    }

    window.history.replaceState({}, '', `${BASE}${langPrefix}`);
    setSelectedExperienceId(null);
    document.title = 'Leonardo Qin - Portfolio';
  };

  const selectedExperience = selectedExperienceId ? experiences[selectedExperienceId] : null;

  // Medium风格的详情页面组件
  const ExperienceDetail = ({ experience }) => {
    if (!experience) return null;

    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
          <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="font-serif text-lg font-semibold text-gray-900">
              Leonardo Qin
            </div>
            <button
              onClick={closeExperience}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-6 py-12">
          {/* Category Badge */}
          <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mb-6">
            {experience.category === 'Technical Research' && <BookOpen size={16} />}
            {experience.category === 'Global Hackathon' && <Award size={16} />}
            {experience.category === 'Global Collaboration' && <Globe size={16} />}
            <span className="uppercase tracking-wide">{experience.category}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
            {experience.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-6">
            {experience.subtitle}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 pb-8 mb-8 border-b border-gray-200">
            {experience.date && (
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>{experience.date}</span>
              </div>
            )}
            {experience.location && (
              <div className="flex items-center gap-1.5">
                <MapPinIcon size={16} />
                <span>{experience.location}</span>
              </div>
            )}
          </div>

          {/* Hero Image - Horizontal Layout */}
          {experience.image && (
            <div className="mb-10 rounded-lg overflow-hidden">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-auto aspect-[21/9] object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {experience.content.map((block, index) => {
              switch (block.type) {
                case 'intro':
                  return (
                    <p key={index} className="text-lg text-gray-700 leading-relaxed mb-7 font-medium">
                      {block.text}
                    </p>
                  );
                
                case 'heading':
                  return (
                    <h2 key={index} className="font-serif text-xl font-bold text-gray-900 mt-10 mb-5">
                      {block.text}
                    </h2>
                  );
                
                case 'subheading':
                  return (
                    <h3 key={index} className="font-sans text-lg font-semibold text-gray-800 mt-8 mb-4">
                      {block.text}
                    </h3>
                  );
                
                case 'paragraph':
                  return (
                    <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6">
                      {block.text}
                    </p>
                  );
                
                case 'list':
                  return (
                    <ul key={index} className="space-y-3 mb-8">
                      {block.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-lg text-gray-700">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                
                case 'image':
                  return (
                    <figure key={index} className="my-8">
                      <img
                        src={block.src}
                        alt={block.caption}
                        className="w-full rounded-lg aspect-[21/9] object-cover"
                      />
                      {block.caption && (
                        <figcaption className="text-center text-sm text-gray-500 mt-3">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                
                case 'image-dual':
                  return (
                    <div key={index} className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {block.images.map((img, i) => (
                        <figure key={i} className="w-full">
                          <img
                            src={img.src}
                            alt={img.caption}
                            className={`w-full rounded-lg object-cover ${block.equalImageHeight ? 'aspect-[3/2]' : ''}`}
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                          />
                          {img.caption && (
                            <figcaption className="text-center text-sm text-gray-500 mt-3">
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  );
                
                case 'video':
                  return (
                    <figure key={index} className="my-8">
                      <video
                        src={block.src}
                        controls
                        className="w-full rounded-lg aspect-video"
                        style={{ maxHeight: '600px' }}
                      >
                        {t('您的浏览器不支持视频播放。', 'Your browser does not support video playback.')}
                      </video>
                      {block.caption && (
                        <figcaption className="text-center text-sm text-gray-500 mt-3">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                
                case 'link':
                  return (
                    <div key={index} className="my-6">
                      <a
                        href={block.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        <span>{block.text}</span>
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  );
                
                case 'quote':
                  return (
                    <blockquote key={index} className="border-l-4 border-blue-500 pl-6 py-3 my-7 italic text-lg text-gray-700">
                      {block.text}
                    </blockquote>
                  );
                
                default:
                  return null;
              }
            })}
          </div>

          {/* Back Button */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <button
              onClick={closeExperience}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronRight size={16} className="rotate-180" />
              <span>{t('返回主页', 'Back to Home')}</span>
            </button>
          </div>
        </article>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200">
      
      {/* Navigation - Minimalist */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="font-serif text-xl font-bold tracking-tight text-gray-900">
            Leonardo Qin
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#experience" className="hover:text-gray-900 transition-colors">Experience</a>
            <a href="#insights" className="hover:text-gray-900 transition-colors">Insights</a>
            <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
            {/* 右上角一键中英文切换按钮 */}
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Languages size={14} />
              <span>{lang === 'zh' ? 'EN' : '中文'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean & Academic */}
      <section id="about" className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Open to FDE Roles
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-gray-900 leading-tight">
              AI-Native <br/>
              Forward Deployed Engineer.
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {t(
                <>连接<span className="font-semibold text-gray-900 border-b-2 border-gray-200">AI技术前沿</span>与<span className="font-semibold text-gray-900 border-b-2 border-gray-200">云上产业落地</span>。</>,
                <>Connecting the <span className="font-semibold text-gray-900 border-b-2 border-gray-200">AI frontier</span> with <span className="font-semibold text-gray-900 border-b-2 border-gray-200">real cloud deployments</span>.</>
              )}
            </p>
            
            <p className="text-gray-500 leading-relaxed max-w-2xl">
              {t(
                '以大模型应用与云原生实践为技术底座，在海外科研、国际技术交流与 AI 产品构建经历中，反复打磨"从真实需求到可运行系统"的交付能力。习惯深入客户现场，快速定位问题、亲手构建可用系统，并把原型持续推进到生产环境。',
                'Grounded in large-model applications and cloud-native practice, I have repeatedly sharpened the ability to go from a real customer need to a running system through overseas research, international technical exchange and hands-on AI product building. I work close to the customer, quickly pin down the problem, build working systems myself, and carry prototypes all the way into production.'
              )}
            </p>

            <div className="flex gap-3 pt-4">
              <a href="https://github.com/edwardqin-creator" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"><Github size={20} /></a>
              <a href="https://www.linkedin.com/in/zeqing-qin-7373b226a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"><Linkedin size={20} /></a>
              <a href="mailto:zeqingqin@foxmail.com" aria-label="Email" className="p-2.5 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          {/* Right Profile Photo - Circular */}
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 flex-shrink-0 mx-auto lg:mx-0">
            <div className="w-full h-full rounded-full border-2 border-gray-200/60 overflow-hidden shadow-md relative group hover:shadow-lg hover:border-gray-300/80 transition-all duration-300">
              <img 
                src={`${BASE}1680092832276.jpeg`} 
                alt="Leonardo Qin" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Experience & Selected Work */}
      <section id="experience" className="py-20 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-3xl text-gray-900 mb-3">Global Experience & Selected Work</h2>
              <p className="text-gray-500">
                {t(
                  '跨文化技术沟通 · AI 前沿研究 · 快速 POC 交付',
                  'Cross-cultural technical communication · Frontier AI research · Rapid POC delivery'
                )}
              </p>
            </div>
          </div>

          <div className="space-y-16">

            {/* Item 1: AAAI Research */}
            <div 
              onClick={() => openExperience('aaai')}
              className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                    <BookOpen size={16} /> Technical Research
                  </div>
                  <h3 className="font-serif text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">
                    AAAI 2025: From Theory to Practice
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(
                      '不仅跟踪AI前沿，更进行探索。这段经历我聚焦于大模型与代码安全领域，将行业判断落地为可验证与交流的研究工作。',
                      'Not just tracking the AI frontier, but exploring it. In this work I focused on large models and code security, turning industry judgment into verifiable, peer-reviewed research.'
                    )}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                      {t('AAAI 2025 第一作者，在美国费城完成论文汇报', 'First author at AAAI 2025, presented the paper in Philadelphia, USA')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                      {t('CLNX-CodeBERT 达到 SOTA，识别 38 个真实开源漏洞', 'CLNX-CodeBERT reached SOTA, identifying 38 real open-source vulnerabilities')}
                    </li>
                  </ul>
                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm pt-2">
                    <span>{t('阅读详情', 'Read More')}</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
                <div className="md:w-1/2 aspect-video rounded-lg overflow-hidden bg-gray-100 relative">
                  <img 
                    src={`${BASE}philly.jpg`}
                    alt="AAAI Conference" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-medium text-gray-900">
                    Philadelphia, USA
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2: International AI Hackathons */}
            <div 
              onClick={() => openExperience('hackathon')}
              className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex flex-col md:flex-row-reverse gap-8">
                <div className="md:w-1/2 space-y-4">
                  <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                    <Award size={16} /> Global Hackathon
                  </div>
                  <h3 className="font-serif text-2xl text-gray-900 group-hover:text-green-600 transition-colors">
                    Tokyo & Singapore: Building MVPs
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('在48小时极限压力下交付具备商业价值的 MVP。', 'Shipping commercially viable MVPs under 48-hour, high-pressure constraints.')}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-semibold text-gray-900">48h</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">POC Delivery</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-semibold text-gray-900">Finalist</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">Honorable Mention</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 font-medium text-sm pt-2">
                    <span>{t('阅读详情', 'Read More')}</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
                <div className="md:w-1/2 aspect-video rounded-lg overflow-hidden bg-gray-100 relative">
                  <img 
                    src={`${BASE}gemini3.jpg`}
                    alt="Google Gemini 3 Hackathon in Singapore" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                   <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-medium text-gray-900">
                    Google, Singapore
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3: International Cybersecurity Exchange */}
            <div
              onClick={() => openExperience('cyber_exchange')}
              className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex flex-col md:flex-row-reverse gap-8">
                <div className="md:w-1/2 space-y-4">
                  <div className="flex items-center gap-2 text-purple-600 font-medium text-sm">
                    <Globe size={16} /> Global Collaboration
                  </div>
                  <h3 className="font-serif text-2xl text-gray-900 group-hover:text-purple-600 transition-colors">
                    International Cybersecurity Exchange Program
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(
                      '在面向发展中国家的国际网络安全研修项目中，承担专业翻译、技术讲解与现场协调。',
                      'Served as professional interpreter, technical presenter and on-site coordinator for an international cybersecurity training program for developing countries.'
                    )}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                      {t('网络安全产业板块中英文专业翻译与解说', 'Professional Chinese-English interpretation for the cybersecurity industry track')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                      {t('武汉行程中的会场支持与多方协调', 'On-site venue support and multi-party coordination throughout the Wuhan itinerary')}
                    </li>
                  </ul>
                  <div className="flex items-center gap-2 text-purple-600 font-medium text-sm pt-2">
                    <span>{t('阅读详情', 'Read More')}</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
                <div className="md:w-1/2 aspect-video rounded-lg overflow-hidden bg-gray-100 relative">
                  <img
                    src={`${BASE}cyber-exchange-visit.png`}
                    alt="International cybersecurity exchange program"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-medium text-gray-900">
                    Wuhan, China
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AI Infrastructure Insight */}
      <section id="insights" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="font-serif text-3xl text-gray-900 mb-3">AI Infrastructure Insight</h2>
          <p className="text-gray-500">
            {t(
              '从行业前沿观察云端算力、推理架构与企业 Agent 的演进',
              'Tracking the evolution of cloud compute, inference architecture and enterprise Agents from the industry frontier'
            )}
          </p>
        </div>
        
        <div className="max-w-4xl">
          <div 
            onClick={() => openExperience('nvidia_gtc')}
            className="group cursor-pointer grid md:grid-cols-2 gap-6 items-start"
          >
             <div className="aspect-[2/1] md:aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
                <img 
                  src={`${BASE}GDC2026.png`} 
                  alt="NVIDIA GTC 2026" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
             </div>
             <div className="pt-1">
               <div className="flex items-center gap-2 text-xs font-medium text-blue-600 mb-3">
                <span className="uppercase tracking-wider">AI Native</span>
               </div>
               <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                 NVIDIA GTC 2026: From AI Factories to Enterprise Agents
               </h3>
               <p className="text-gray-500 text-sm leading-relaxed mb-4">
                 {t(
                   '从 Token 产出、异构推理和 Agent 治理出发，理解云端算力如何转化为可衡量的业务体验。',
                   'Starting from token output, heterogeneous inference and Agent governance, understanding how cloud compute translates into a measurable business experience.'
                 )}
               </p>
               <div className="flex items-center text-sm font-medium text-gray-900 group-hover:gap-2 transition-all">
                Read Analysis <ChevronRight size={14} className="ml-1" />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer id="contact" className="py-12 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <div>
            &copy; 2026 Leonardo Qin. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="mailto:zeqingqin@foxmail.com" className="hover:text-gray-900 transition-colors">Email</a>
            <a href="https://github.com/edwardqin-creator" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/zeqing-qin-7373b226a/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Experience Detail Modal */}
      {selectedExperience && <ExperienceDetail experience={selectedExperience} />}

    </div>
  );
};

export default PortfolioLight;
