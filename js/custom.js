// 监听壁纸加载完成
document.addEventListener('DOMContentLoaded', function() {
    const bgElement = document.getElementById('web_bg');
    if (!bgElement) return;
  
    // 获取壁纸图片地址
    const bgImage = bgElement.style.backgroundImage || getComputedStyle(bgElement).backgroundImage;
    if (!bgImage || bgImage === 'none') {
      bgElement.classList.add('loaded'); // 无壁纸时直接显示背景色
      return;
    }
  
    // 提取图片 URL
    const imgUrl = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    const img = new Image();
    
    // 图片加载完成后显示
    img.onload = function() {
      bgElement.classList.add('loaded');
    };
    
    // 加载失败也显示背景色
    img.onerror = function() {
      bgElement.classList.add('loaded');
    };
    
    img.src = imgUrl;
  });

// 首页中英文切换：保留用户选择，不对技术文章正文做机器翻译。
document.addEventListener('DOMContentLoaded', function() {
  const translations = {
    en: {
      'hero.projects': 'Explore Projects',
      'hero.notes': 'Read Notes',
      'profile.kicker': 'CURRENTLY BUILDING',
      'profile.title': 'Systems for capable, reliable LLM agents.',
      'profile.body': 'I work across agent runtime engineering and post-training, with a focus on simple architectures, measurable behavior, and lessons earned from real implementations.',
      'profile.github': 'Follow the work on GitHub',
      'projects.kicker': 'SELECTED PROJECTS',
      'projects.title': 'Built to learn, tested by use.',
      'projects.all': 'View all repositories',
      'projects.view': 'View project ↗',
      'project.nanodeer': 'A reference implementation for LLM agent runtime engineering: native ReAct loop, sandbox isolation, flat-file memory, and SSE streaming.',
      'project.alignsql': 'Qwen3-8B Text2SQL post-training from supervised fine-tuning through reinforcement learning.',
      'project.pindou': 'A Codex skill that turns photos and memories into craftable fuse-bead keepsakes with adaptive grids, real palettes, and structural-growth GIFs.',
      'writing.kicker': 'SELECTED WRITING',
      'writing.title': 'Notes from the path to AGI.'
    },
    zh: {
      'hero.projects': '查看项目',
      'hero.notes': '阅读文章',
      'profile.kicker': '正在构建',
      'profile.title': '让 LLM Agent 更强大、更可靠的系统。',
      'profile.body': '我专注于 Agent 运行时工程与 Post-Training，关注简洁的架构、可测量的行为，以及从真实实现中获得的经验。',
      'profile.github': '在 GitHub 上关注进展',
      'projects.kicker': '精选项目',
      'projects.title': '以实作学习，用真实场景检验。',
      'projects.all': '查看全部仓库',
      'projects.view': '查看项目 ↗',
      'project.nanodeer': 'LLM Agent 运行时工程的参考实现，包含原生 ReAct 循环、沙箱隔离、扁平文件记忆与 SSE 流式接口。',
      'project.alignsql': '从监督微调到强化学习的 Qwen3-8B Text2SQL Post-Training 实践。',
      'project.pindou': '将照片与记忆转化为可实际制作的拼豆纪念品，支持自适应网格、真实色板与逐豆生长 GIF。',
      'writing.kicker': '精选文章',
      'writing.title': '通往 AGI 路上的笔记。'
    }
  };

  const button = document.getElementById('language-toggle');
  if (!button) return;

  const applyLanguage = function(language) {
    const dictionary = translations[language] || translations.en;
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function(element) {
      const value = dictionary[element.dataset.i18n];
      if (value) element.textContent = value;
    });

    const announcement = document.querySelector('.announcement_content');
    if (announcement) {
      announcement.textContent = language === 'zh'
        ? '构建真正可用的系统，记录经得起实践的经验。'
        : 'Building systems, writing what survives contact with reality.';
    }

    button.textContent = language === 'zh' ? 'EN' : '中';
    button.title = language === 'zh' ? 'Switch to English' : '切换到中文';
    button.setAttribute('aria-label', button.title);
    localStorage.setItem('site-language', language);
  };

  const savedLanguage = localStorage.getItem('site-language') || 'en';
  applyLanguage(savedLanguage);

  button.addEventListener('click', function() {
    applyLanguage(document.documentElement.dataset.language === 'zh' ? 'en' : 'zh');
  });
});
