// Моковые данные задач для платформы ProДелай

export const tasks = [
  // Проект 1: Разработка платформы ProДелай (id: 1)
  {
    id: 'task-001',
    projectId: '1',
    parentId: null,
    title: 'Проработать архитектуру базы данных',
    description: 'Спроектировать схему БД для пользователей, проектов, задач и комментариев. Учесть масштабируемость и связи между сущностями.',
    status: 'done',
    priority: 'high',
    assignee: 'Пономарев А.',
    stage: 'Планирование',
    dueDate: '2026-03-15',
    createdAt: '2026-03-01',
    checklist: [
      { id: 'c1', text: 'Схема пользователей', checked: true },
      { id: 'c2', text: 'Схема проектов', checked: true },
      { id: 'c3', text: 'Схема задач', checked: true },
      { id: 'c4', text: 'Схема комментариев', checked: true }
    ],
    comments: [
      { id: 'cm1', author: 'Ставничук Я.', text: 'Отличная работа! Схема выглядит солидно.', createdAt: '2026-03-14T10:30:00' },
      { id: 'cm2', author: 'Пономарев А.', text: 'Добавил индексы для ускорения поиска.', createdAt: '2026-03-14T15:45:00' }
    ],
    attachments: [
      { id: 'a1', name: 'db_schema.png', url: '#', type: 'image' }
    ],
    tags: ['backend', 'database']
  },
  {
    id: 'task-002',
    projectId: '1',
    parentId: null,
    title: 'Реализовать авторизацию и аутентификацию',
    description: 'Создать систему входа/регистрации пользователей с использованием JWT токенов. Реализовать восстановление пароля.',
    status: 'in_progress',
    priority: 'critical',
    assignee: 'Пономарев А.',
    stage: 'Разработка',
    dueDate: '2026-04-20',
    createdAt: '2026-03-20',
    checklist: [
      { id: 'c1', text: 'Регистрация пользователя', checked: true },
      { id: 'c2', text: 'Вход по email/паролю', checked: true },
      { id: 'c3', text: 'JWT токены', checked: false },
      { id: 'c4', text: 'Восстановление пароля', checked: false },
      { id: 'c5', text: 'Тесты безопасности', checked: false }
    ],
    comments: [
      { id: 'cm1', author: 'Иванов Д.', text: 'Нужно добавить rate limiting для защиты от брутфорса.', createdAt: '2026-04-10T09:00:00' }
    ],
    attachments: [],
    tags: ['backend', 'security']
  },
  {
    id: 'task-003',
    projectId: '1',
    parentId: null,
    title: 'Сверстать главную страницу приложения',
    description: 'Создать адаптивную вёрстку главной страницы с дашбордом, метриками и последними проектами.',
    status: 'done',
    priority: 'high',
    assignee: 'Иванов Д.',
    stage: 'Frontend',
    dueDate: '2026-04-01',
    createdAt: '2026-03-25',
    checklist: [
      { id: 'c1', text: 'Шапка с градиентом', checked: true },
      { id: 'c2', text: 'Карточки метрик', checked: true },
      { id: 'c3', text: 'Таблица проектов', checked: true }
    ],
    comments: [],
    attachments: [
      { id: 'a1', name: 'mockup_main.fig', url: '#', type: 'file' }
    ],
    tags: ['frontend', 'ui']
  },
  {
    id: 'task-004',
    projectId: '1',
    parentId: null,
    title: 'Интеграция канбан-доски',
    description: 'Реализовать drag-and-drop функционал для перемещения задач между колонками статусов.',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'Иванов Д.',
    stage: 'Frontend',
    dueDate: '2026-05-10',
    createdAt: '2026-04-15',
    checklist: [
      { id: 'c1', text: 'Базовая структура колонок', checked: true },
      { id: 'c2', text: 'Drag-and-drop задачи', checked: false },
      { id: 'c3', text: 'Сохранение состояния', checked: false }
    ],
    comments: [],
    attachments: [],
    tags: ['frontend', 'kanban']
  },
  {
    id: 'task-005',
    projectId: '1',
    parentId: 'task-004',
    title: 'Настроить dnd-kit библиотеку',
    description: 'Подключить и настроить библиотеку dnd-kit для реактивного drag-and-drop.',
    status: 'todo',
    priority: 'medium',
    assignee: 'Иванов Д.',
    stage: 'Frontend',
    dueDate: '2026-05-05',
    createdAt: '2026-04-16',
    checklist: [],
    comments: [],
    attachments: [],
    tags: ['frontend', 'library']
  },
  {
    id: 'task-006',
    projectId: '1',
    parentId: null,
    title: 'Тестирование основного функционала',
    description: 'Провести комплексное тестирование ключевых функций платформы перед релизом.',
    status: 'todo',
    priority: 'high',
    assignee: null,
    stage: 'Тестирование',
    dueDate: '2026-05-25',
    createdAt: '2026-04-20',
    checklist: [],
    comments: [],
    attachments: [],
    tags: ['qa', 'testing']
  },
  
  // Проект 2: Маркетинговая кампания (id: 2)
  {
    id: 'task-010',
    projectId: '2',
    parentId: null,
    title: 'Разработать брендбук проекта',
    description: 'Создать полный гайдлайн по использованию логотипа, цветов, шрифтов и тональности коммуникации.',
    status: 'done',
    priority: 'medium',
    assignee: 'Петрова М.',
    stage: 'Дизайн',
    dueDate: '2026-04-10',
    createdAt: '2026-03-28',
    checklist: [
      { id: 'c1', text: 'Логотип и варианты', checked: true },
      { id: 'c2', text: 'Цветовая палитра', checked: true },
      { id: 'c3', text: 'Шрифты', checked: true },
      { id: 'c4', text: 'Примеры использования', checked: true }
    ],
    comments: [
      { id: 'cm1', author: 'Ставничук Я.', text: 'Брендбук получился отличным! Особенно нравится палитра.', createdAt: '2026-04-09T14:00:00' }
    ],
    attachments: [
      { id: 'a1', name: 'brandbook.pdf', url: '#', type: 'file' }
    ],
    tags: ['design', 'branding']
  },
  {
    id: 'task-011',
    projectId: '2',
    parentId: null,
    title: 'Запустить таргетированную рекламу',
    description: 'Настроить рекламные кампании в социальных сетях для привлечения первых пользователей.',
    status: 'in_progress',
    priority: 'high',
    assignee: 'Ставничук Я.',
    stage: 'Продвижение',
    dueDate: '2026-05-01',
    createdAt: '2026-04-12',
    checklist: [
      { id: 'c1', text: 'Аудитория VK', checked: true },
      { id: 'c2', text: 'Аудитория Telegram', checked: true },
      { id: 'c3', text: 'Креативы для рекламы', checked: false },
      { id: 'c4', text: 'Настройка бюджетов', checked: false }
    ],
    comments: [],
    attachments: [],
    tags: ['marketing', 'ads']
  },
  {
    id: 'task-012',
    projectId: '2',
    parentId: null,
    title: 'Подготовить презентацию для инвесторов',
    description: 'Создать питч-дек на 10-12 слайдов с описанием продукта, рынка и бизнес-модели.',
    status: 'in_progress',
    priority: 'critical',
    assignee: 'Ставничук Я.',
    stage: 'Продвижение',
    dueDate: '2026-04-28',
    createdAt: '2026-04-18',
    checklist: [
      { id: 'c1', text: 'Проблема и решение', checked: true },
      { id: 'c2', text: 'Анализ рынка', checked: true },
      { id: 'c3', text: 'Бизнес-модель', checked: false },
      { id: 'c4', text: 'Финансовые прогнозы', checked: false },
      { id: 'c5', text: 'Команда', checked: true }
    ],
    comments: [
      { id: 'cm1', author: 'Пономарев А.', text: 'Добавь слайд с дорожной картой развития.', createdAt: '2026-04-20T11:00:00' }
    ],
    attachments: [
      { id: 'a1', name: 'pitch_deck_v1.pptx', url: '#', type: 'file' }
    ],
    tags: ['presentation', 'investors']
  },
  {
    id: 'task-013',
    projectId: '2',
    parentId: null,
    title: 'Ведение соцсетей проекта',
    description: 'Регулярный постинг контента в Telegram и VK о развитии платформы.',
    status: 'in_progress',
    priority: 'low',
    assignee: null,
    stage: 'Продвижение',
    dueDate: '2026-05-30',
    createdAt: '2026-04-01',
    checklist: [],
    comments: [],
    attachments: [],
    tags: ['social', 'content']
  },
  {
    id: 'task-014',
    projectId: '2',
    parentId: 'task-011',
    title: 'Создать креативы для VK',
    description: 'Разработать 5 вариантов баннеров для рекламной кампании ВКонтакте.',
    status: 'todo',
    priority: 'medium',
    assignee: 'Петрова М.',
    stage: 'Дизайн',
    dueDate: '2026-04-25',
    createdAt: '2026-04-20',
    checklist: [],
    comments: [],
    attachments: [],
    tags: ['design', 'ads']
  },
  {
    id: 'task-015',
    projectId: '2',
    parentId: null,
    title: 'Организовать вебинар для первых пользователей',
    description: 'Провести онлайн-презентацию платформы с демонстрацией возможностей и Q&A сессией.',
    status: 'todo',
    priority: 'medium',
    assignee: 'Ставничук Я.',
    stage: 'Продвижение',
    dueDate: '2026-05-15',
    createdAt: '2026-04-22',
    checklist: [],
    comments: [],
    attachments: [],
    tags: ['event', 'webinar']
  },
  
  // Проект 3: Исследование рынка (id: 3)
  {
    id: 'task-020',
    projectId: '3',
    parentId: null,
    title: 'Анализ конкурентов',
    description: 'Изучить основные аналоги на рынке: Trello, Asana, Notion, Monday. Выявить их сильные и слабые стороны.',
    status: 'done',
    priority: 'high',
    assignee: 'Козлов А.',
    stage: 'Исследование',
    dueDate: '2026-03-20',
    createdAt: '2026-03-01',
    checklist: [
      { id: 'c1', text: 'Trello анализ', checked: true },
      { id: 'c2', text: 'Asana анализ', checked: true },
      { id: 'c3', text: 'Notion анализ', checked: true },
      { id: 'c4', text: 'Monday анализ', checked: true },
      { id: 'c5', text: 'Сводная таблица', checked: true }
    ],
    comments: [
      { id: 'cm1', author: 'Ставничук Я.', text: 'Отлично! Видно что наша ниша - гибкость + ИИ.', createdAt: '2026-03-19T16:00:00' }
    ],
    attachments: [
      { id: 'a1', name: 'competitors_analysis.xlsx', url: '#', type: 'file' }
    ],
    tags: ['research', 'analysis']
  },
  {
    id: 'task-021',
    projectId: '3',
    parentId: null,
    title: 'Опрос целевой аудитории',
    description: 'Провести глубинные интервью с 15 потенциальными пользователями для выявления потребностей.',
    status: 'done',
    priority: 'high',
    assignee: 'Ставничук Я.',
    stage: 'Исследование',
    dueDate: '2026-03-25',
    createdAt: '2026-03-10',
    checklist: [
      { id: 'c1', text: 'Составить гайд интервью', checked: true },
      { id: 'c2', text: 'Найти респондентов', checked: true },
      { id: 'c3', text: 'Провести интервью', checked: true },
      { id: 'c4', text: 'Расшифровать записи', checked: true }
    ],
    comments: [],
    attachments: [],
    tags: ['research', 'interviews']
  },
  {
    id: 'task-022',
    projectId: '3',
    parentId: null,
    title: 'Сегментация рынка',
    description: 'Разделить рынок на сегменты по размеру компаний, отраслям и географии.',
    status: 'done',
    priority: 'medium',
    assignee: 'Козлов А.',
    stage: 'Аналитика',
    dueDate: '2026-03-28',
    createdAt: '2026-03-22',
    checklist: [
      { id: 'c1', text: 'B2B сегмент', checked: true },
      { id: 'c2', text: 'B2C сегмент', checked: true },
      { id: 'c3', text: 'Образовательный сектор', checked: true }
    ],
    comments: [],
    attachments: [],
    tags: ['market', 'segmentation']
  },
  {
    id: 'task-023',
    projectId: '3',
    parentId: null,
    title: 'Подготовка итогового отчёта',
    description: 'Свести все данные исследования в единый документ с выводами и рекомендациями.',
    status: 'done',
    priority: 'high',
    assignee: 'Ставничук Я.',
    stage: 'Документация',
    dueDate: '2026-04-01',
    createdAt: '2026-03-28',
    checklist: [
      { id: 'c1', text: 'Введение', checked: true },
      { id: 'c2', text: 'Анализ конкурентов', checked: true },
      { id: 'c3', text: 'Результаты опросов', checked: true },
      { id: 'c4', text: 'Сегментация', checked: true },
      { id: 'c5', text: 'Рекомендации', checked: true }
    ],
    comments: [
      { id: 'cm1', author: 'Пономарев А.', text: 'Отчёт готов! Можно использовать для питча.', createdAt: '2026-04-01T10:00:00' }
    ],
    attachments: [
      { id: 'a1', name: 'market_research_final.pdf', url: '#', type: 'file' }
    ],
    tags: ['report', 'final']
  }
]
