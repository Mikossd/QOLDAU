/**
 * ==============================================================================
 * Qoldau Food — Food Product Barcode Scanner for Kazakhstan (MVP)
 *
 * Tech Stack: HTML5, CSS3, Vanilla JavaScript (ES6+)
 * Data Source: Open Food Facts API + Local Kazakhstan Mock/User Database
 * ==============================================================================
 */

'use strict';

/* ==============================================================================
   1. LOCALIZATION & TRANSLATIONS (I18N)
   Supported languages: Russian (ru), Kazakh (kk), English (en)
   ============================================================================== */
const I18N = {
  currentLang: 'ru', // Default language

  translations: {
    ru: {
      tagline_short: 'Здоровый выбор',
      hero_badge: '✨ Проверьте состав за 2 секунды',
      hero_title: 'Знайте, что вы едите.',
      hero_subtitle: 'Наведите камеру на штрихкод или введите его вручную, чтобы узнать правду о сахаре, аллергенах и пищевой ценности продуктов в Казахстане.',
      btn_scan_product: 'Сканировать продукт (Видео)',
      btn_take_photo: '📸 Сфотографировать камерой',
      manual_search_title: 'Поиск по штрихкоду',
      manual_search_heading: 'Поиск по штрихкоду',
      input_barcode_placeholder: 'Введите штрихкод (напр. 3017620422003)...',
      btn_search: 'Найти',
      quick_samples_label: 'Попробуйте примеры:',
      test_not_found: 'Тест: нет в базе',
      recent_scans_title: 'Недавно сканированные',
      btn_clear_history: 'Очистить',
      history_empty: 'История сканирований пуста. Отсканируйте первый продукт!',
      feature_off_title: 'Open Food Facts',
      feature_off_desc: 'Глобальная база из более 3 млн проверенных продуктов питания.',
      feature_simple_title: 'Простыми словами',
      feature_simple_desc: 'Мгновенный анализ сахара, соли и аллергенов без сложных терминов.',
      feature_kz_title: 'Казахстанский фокус',
      feature_kz_desc: 'Поддержка местных товаров, цен в KZT (₸) и трех языков.',
      btn_back: 'Назад к поиску',
      btn_back_home: 'На главную',
      verified_badge: '✓ Open Food Facts',
      user_badge: '👤 Пользовательские данные',
      no_image_available: 'Фото отсутствует',
      indicator_title: 'Оценка питательного профиля:',
      rating_disclaimer: '⚠️ Информационная оценка по стандартам ВОЗ. Не является медицинским диагнозом или врачебной рекомендацией.',
      easy_understand_title: 'Простыми словами',
      easy_understand_sub: 'Понятный разбор состава на основе доступных данных',
      nutrition_title: 'Пищевая ценность',
      nutrition_sub: 'На 100 г продукта',
      ingredients_title: 'Состав',
      ingredients_empty: 'Информация о составе не указана на упаковке.',
      allergens_title: 'Аллергены',
      allergens_none: 'Аллергены не обнаружены в базе',
      allergens_warning_prefix: 'Содержит аллергены: ',
      manufacturer_title: 'Производство и происхождение',
      country_label: 'Страна:',
      manufacturer_label: 'Производитель:',
      barcode_label: 'Штрихкод:',
      btn_scan_another: 'Сканировать другой продукт',
      not_found_title: 'Продукт не найден',
      not_found_desc_1: 'Штрихкод',
      not_found_desc_2: 'пока отсутствует в глобальной базе Open Food Facts.',
      kz_add_callout_title: 'Помогите жителям Казахстана!',
      kz_add_callout_desc: 'Вы можете сохранить этот продукт в Qoldau Food. Ваши данные сразу станут доступны на вашем устройстве.',
      btn_add_product: 'Добавить этот продукт',
      btn_cancel: 'Отмена',
      add_form_title: 'Добавление продукта',
      add_notice_text: 'Продукт будет сохранен в вашей локальной базе со статусом «Пользовательские данные (без верификации)».',
      field_barcode: 'Штрихкод *',
      field_name: 'Название продукта *',
      field_brand: 'Бренд / Производитель',
      field_country: 'Страна',
      field_photo: 'Фотография продукта',
      btn_choose_photo: 'Выбрать фото',
      field_ingredients: 'Состав',
      field_allergens: 'Аллергены (через запятую)',
      fieldset_nutrition_100g: 'Пищевая ценность (на 100 г)',
      nutr_calories: 'Калории (ккал)',
      nutr_protein: 'Белки (г)',
      nutr_fat: 'Жиры (г)',
      nutr_satfat: 'Насыщ. жиры (г)',
      nutr_carbs: 'Углеводы (г)',
      nutr_sugar: 'Сахар (г)',
      nutr_salt: 'Соль (г)',
      btn_save_product: 'Сохранить продукт',
      scanner_title: 'Сканирование штрихкода',
      scanner_hint: 'Наведите камеру на штрихкод (EAN-13, EAN-8, UPC). Фокусировка произойдет автоматически.',
      btn_flip_cam: 'Сменить камеру',
      btn_scan_file: 'Из фото',
      loading_search: 'Поиск информации в Open Food Facts...',
      footer_kz_tag: 'Разработано для потребителей Казахстана.',
      footer_off_attr: 'Данные предоставлены проектом',
      toast_barcode_invalid: 'Пожалуйста, введите корректный штрихкод (от 7 до 14 цифр)',
      toast_product_saved: 'Продукт успешно сохранен в вашей базе!',
      toast_network_error: 'Ошибка подключения к Open Food Facts. Проверьте интернет.',
      toast_camera_error: 'Не удалось получить доступ к камере. Проверьте разрешения браузера или загрузите фото штрихкода.',
      // Evaluator strings
      sugar_high_title: 'Высокое количество сахара',
      sugar_high_desc: 'Содержит более 22.5 г сахара на 100 г. Рекомендуется ограничить потребление.',
      sugar_mod_title: 'Умеренное количество сахара',
      sugar_mod_desc: 'Содержание сахара находится в пределах умеренной нормы (5–22.5 г на 100 г).',
      sugar_low_title: 'Низкое количество сахара',
      sugar_low_desc: 'Содержит менее 5 г сахара на 100 г — отличный выбор.',
      salt_high_title: 'Высокое количество соли',
      salt_high_desc: 'Более 1.5 г соли на 100 г. Людям с давлением стоит быть внимательнее.',
      salt_low_title: 'Низкое количество соли',
      salt_low_desc: 'Менее 0.3 г соли на 100 г продукта.',
      satfat_high_title: 'Высокое содержание насыщенных жиров',
      satfat_high_desc: 'Более 5 г на 100 г. Чрезмерное количество может повышать холестерин.',
      protein_high_title: 'Высокое содержание белка',
      protein_high_desc: 'Более 10 г белка на 100 г — способствует насыщению и росту мышц.',
      allergens_alert_title: 'Содержит аллергены',
      rating_low: 'Низкий уровень риска',
      rating_moderate: 'Умеренный',
      rating_high: 'Повышенный',
      rating_nodata: 'Недостаточно данных',
      health_score_title: 'Индекс пользы продукта',
      score_scale_label: '100-балльная шкала пользы',
      score_grade_excellent: 'Отличный выбор',
      score_grade_good: 'Хороший состав',
      score_grade_moderate: 'Умеренное качество',
      score_grade_poor: 'Низкая польза',
      score_grade_bad: 'Не рекомендуется',
      score_grade_nodata: 'Мало данных',
      score_factors_title: 'Ключевые факторы оценки',
      rating_disclaimer: '⚠️ Оценка питательного профиля по стандартам ВОЗ на 100 г продукта. Чем выше балл (до 100), тем полезнее и чище состав продукта.',
      scale_unhealthy: '0 • Вредно',
      scale_moderate: '50 • Средне',
      scale_healthy: '100 • Полезно',
      score_headline_excellent: 'Отличный, здоровый выбор',
      score_summary_excellent: 'Сбалансированный питательный состав, превосходно для ежедневного питания.',
      score_headline_good: 'Хороший качественный продукт',
      score_summary_good: 'Умеренное содержание сахара и соли, подходит для сбалансированного рациона.',
      score_headline_moderate: 'Умеренное качество',
      score_summary_moderate: 'Содержит сахар или насыщенные жиры. Рекомендуется умеренное потребление.',
      score_headline_poor: 'Низкая польза (лакомство)',
      score_summary_poor: 'Повышенное содержание сахара, калорий или жиров. Лучше ограничить как редкое угощение.',
      score_headline_bad: 'Не рекомендуется для частого употребления',
      score_summary_bad: 'Критический избыток сахара, соли или добавок. Избегайте регулярного питания.',
      score_headline_nodata: 'Недостаточно данных для индекса',
      score_summary_nodata: 'Данные о сахаре, жирах или соли не указаны на упаковке.',
      score_positives_title: 'Плюсы состава',
      score_negatives_title: 'Минусы состава',
      // New features
      tab_search_barcode: 'По штрихкоду',
      tab_search_name: 'По названию',
      input_name_placeholder: 'Введите название (напр. Coca-Cola, Snickers, чай)...',
      quick_samples_name_label: 'Популярные запросы:',
      search_results_title: 'Результаты поиска',
      btn_close_results: '✕ Закрыть',
      loading_search_products: 'Поиск продуктов в Open Food Facts...',
      search_no_results: 'Продукт не найден. Попробуйте другое название или отсканируйте штрихкод.',
      search_error: 'Произошла ошибка при поиске. Пожалуйста, попробуйте снова.',
      btn_search_manually_name: 'Искать по названию',
      alternatives_badge: 'Рекомендации Qoldau',
      alternatives_title: 'Более полезные альтернативы',
      alternatives_sub: 'Товары той же категории с более высоким индексом пользы',
      loading_alternatives: 'Поиск лучших альтернатив...',
      alternatives_empty_text: 'Подходящих более полезных альтернатив в этой категории не найдено.',
      alternatives_disclaimer: 'ℹ️ Сравнение основано на доступных данных о составе и пищевой ценности. Не является врачебным назначением.',
      alt_reason_lower_sugar: 'Меньше сахара',
      alt_reason_lower_salt: 'Меньше соли',
      alt_reason_lower_satfat: 'Меньше насыщ. жиров',
      alt_reason_higher_protein: 'Больше белка',
      alt_reason_better_score: 'Выше индекс пользы',
      badge_official_registry: 'Официальный реестр',
      official_info_title: 'Официальная информация о продукции',
      official_info_sub: 'Регулирование, знаки соответствия и сертификация',
      official_cert_empty: 'Официальная информация о сертификации для этого продукта отсутствует в базе.',
      official_cert_label_type: 'Тип сертификата / знак:',
      official_cert_label_issuer: 'Орган / реестр:',
      official_cert_label_num: 'Номер документа:',
      official_cert_view_doc: 'Перейти к источнику документа ↗',
      transparency_title: 'Источник данных и прозрачность',
      transparency_sub: 'Происхождение информации и статус верификации',
      source_origin_label: 'Источник данных:',
      source_status_label: 'Статус данных:',
      source_updated_label: 'Последнее обновление:',
      status_community: 'Сообщество (Open Food Facts)',
      status_user_local: 'Пользовательские данные (без верификации)',
      status_local_verified: 'Локальная база Qoldau (верифицировано)',
      transparency_full_disclaimer: '⚠️ Индекс пользы Qoldau является информационной оценкой на основе доступных данных о составе и пищевой ценности. Он не является медицинским диагнозом или официальным сертификатом качества.'
    },

    kk: {
      tagline_short: 'Дұрыс таңдау',
      hero_badge: '✨ Құрамын 2 секундта тексеріңіз',
      hero_title: 'Біліп жеңіз.',
      hero_subtitle: 'Қазақстандағы тағамдардың қант, тұз және аллергендер мөлшерін білу үшін камераны штрихкодқа бағыттаңыз немесе қолмен енгізіңіз.',
      btn_scan_product: 'Өнімді сканерлеу (Видео)',
      btn_take_photo: '📸 Камерамен суретке түсіру',
      manual_search_title: 'Штрихкод бойынша іздеу',
      manual_search_heading: 'Штрихкод бойынша іздеу',
      input_barcode_placeholder: 'Штрихкодты енгізіңіз (мыс. 3017620422003)...',
      btn_search: 'Іздеу',
      quick_samples_label: 'Мысалдарды көріңіз:',
      test_not_found: 'Тест: базада жоқ',
      recent_scans_title: 'Жақында сканерленген',
      btn_clear_history: 'Тазарту',
      history_empty: 'Сканерлеу тарихы бос. Алғашқы өнімді сканерлеңіз!',
      feature_off_title: 'Open Food Facts',
      feature_off_desc: '3 миллионнан астам тексерілген азық-түлік өнімдерінің жаһандық базасы.',
      feature_simple_title: 'Қарапайым тілмен',
      feature_simple_desc: 'Қант, тұз және аллергендерді күрделі терминдерсіз бірден түсіндіру.',
      feature_kz_title: 'Қазақстанға бейімделген',
      feature_kz_desc: 'Отандық өнімдерді қолдау, KZT (₸) бағалары және үш тілді интерфейс.',
      btn_back: 'Іздеуге қайту',
      btn_back_home: 'Басты бетке',
      verified_badge: '✓ Open Food Facts',
      user_badge: '👤 Пайдаланушы енгізген',
      no_image_available: 'Сурет жоқ',
      indicator_title: 'Қоректік профильді бағалау:',
      rating_disclaimer: '⚠️ ДДҰ (ВОЗ) стандарттары бойынша ақпараттық баға. Дәрігерлік диагноз немесе емдік нұсқаулық болып табылмайды.',
      easy_understand_title: 'Қарапайым тілмен',
      easy_understand_sub: 'Қолжетімді деректер негізінде құрамды түсінікті талдау',
      nutrition_title: 'Тағамдық құндылығы',
      nutrition_sub: 'Өнімнің 100 грамына',
      ingredients_title: 'Құрамы',
      ingredients_empty: 'Қаптамада құрамы туралы ақпарат көрсетілмеген.',
      allergens_title: 'Аллергендер',
      allergens_none: 'Базада аллергендер табылмады',
      allergens_warning_prefix: 'Құрамында аллергендер бар: ',
      manufacturer_title: 'Өндіріс және шыққан елі',
      country_label: 'Елі:',
      manufacturer_label: 'Өндіруші:',
      barcode_label: 'Штрихкод:',
      btn_scan_another: 'Басқа өнімді сканерлеу',
      not_found_title: 'Өнім табылмады',
      not_found_desc_1: 'Бұл штрихкод',
      not_found_desc_2: 'әзірге Open Food Facts жаһандық базасында жоқ.',
      kz_add_callout_title: 'Қазақстандықтарға көмектесіңіз!',
      kz_add_callout_desc: 'Бұл өнімді Qoldau Food жүйесіне қоса аласыз. Деректер бірден құрылғыңызда сақталады.',
      btn_add_product: 'Бұл өнімді қосу',
      btn_cancel: 'Бас тарту',
      add_form_title: 'Өнімді қосу',
      add_notice_text: 'Өнім «Пайдаланушы деректері (тексерілмеген)» мәртебесімен жергілікті базаға сақталады.',
      field_barcode: 'Штрихкод *',
      field_name: 'Өнім атауы *',
      field_brand: 'Бренд / Өндіруші',
      field_country: 'Елі',
      field_photo: 'Өнімнің фотосуреті',
      btn_choose_photo: 'Суретті таңдау',
      field_ingredients: 'Құрамы',
      field_allergens: 'Аллергендер (үтір арқылы)',
      fieldset_nutrition_100g: 'Тағамдық құндылығы (100 г үшін)',
      nutr_calories: 'Калория (ккал)',
      nutr_protein: 'Ақуыз (г)',
      nutr_fat: 'Майлар (г)',
      nutr_satfat: 'Қаныққан май (г)',
      nutr_carbs: 'Көмірсулар (г)',
      nutr_sugar: 'Қант (г)',
      nutr_salt: 'Тұз (г)',
      btn_save_product: 'Өнімді сақтау',
      scanner_title: 'Штрихкодты сканерлеу',
      scanner_hint: 'Камераны штрихкодқа (EAN-13, EAN-8, UPC) бағыттаңыз. Фокус автоматты түрде қойылады.',
      btn_flip_cam: 'Камераны ауыстыру',
      btn_scan_file: 'Фотодан табу',
      loading_search: 'Open Food Facts дерекқорынан ізделуде...',
      footer_kz_tag: 'Қазақстан тұтынушылары үшін жасалған.',
      footer_off_attr: 'Деректерді ұсынған',
      toast_barcode_invalid: 'Дұрыс штрихкодты енгізіңіз (7-ден 14 цифрға дейін)',
      toast_product_saved: 'Өнім жергілікті базаңызға сәтті сақталды!',
      toast_network_error: 'Open Food Facts жүйесіне қосылу қатесі. Интернетті тексеріңіз.',
      toast_camera_error: 'Камераға қол жеткізу мүмкін болмады. Рұқсатты тексеріңіз немесе фото жүктеңіз.',
      sugar_high_title: 'Қант мөлшері өте жоғары',
      sugar_high_desc: '100 грамда 22.5 г-нан артық қант бар. Тұтынуды шектеу ұсынылады.',
      sugar_mod_title: 'Қант мөлшері қалыпты',
      sugar_mod_desc: 'Қант мөлшері қалыпты деңгейде (100 г үшін 5–22.5 г аралығында).',
      sugar_low_title: 'Қант мөлшері төмен',
      sugar_low_desc: '100 г өнімде 5 г-нан аз қант бар — тамаша таңдау.',
      salt_high_title: 'Тұз мөлшері жоғары',
      salt_high_desc: '100 г үшін 1.5 г-нан артық тұз. Қан қысымы бар адамдарға абай болу қажет.',
      salt_low_title: 'Тұз мөлшері аз',
      salt_low_desc: '100 г өнімде 0.3 г-нан аз тұз бар.',
      satfat_high_title: 'Қаныққан майлар мөлшері жоғары',
      satfat_high_desc: '100 г үшін 5 г-нан астам. Артық мөлшер холестеринді жоғарылатуы мүмкін.',
      protein_high_title: 'Ақуызға бай өнім',
      protein_high_desc: '100 грамда 10 г-нан астам ақуыз бар — бұлшықет пен қуат үшін пайдалы.',
      allergens_alert_title: 'Аллергендер бар',
      rating_low: 'Қауіп деңгейі төмен',
      rating_moderate: 'Орташа',
      rating_high: 'Жоғары',
      rating_nodata: 'Деректер жеткіліксіз',
      health_score_title: 'Өнімнің пайдалылық индексі',
      score_scale_label: '100 балдық пайдалылық шкаласы',
      score_grade_excellent: 'Өте пайдалы',
      score_grade_good: 'Жақсы өнім',
      score_grade_moderate: 'Орташа сапа',
      score_grade_poor: 'Пайдасы төмен',
      score_grade_bad: 'Ұсынылмайды',
      score_grade_nodata: 'Мәлімет аз',
      score_factors_title: 'Бағалаудың негізгі факторлары',
      rating_disclaimer: '⚠️ ДДҰ стандарттары бойынша 100 г өнімге арналған тағамдық бағалау. Балл неғұрлым жоғары болса (100-ге дейін), өнім денсаулыққа соғұрлым пайдалы.',
      scale_unhealthy: '0 • Зиян',
      scale_moderate: '50 • Орташа',
      scale_healthy: '100 • Пайдалы',
      score_headline_excellent: 'Өте пайдалы, дұрыс таңдау',
      score_summary_excellent: 'Теңгерімді тағамдық құрам, күнделікті тұтынуға өте қолайлы.',
      score_headline_good: 'Сапалы жақсы өнім',
      score_summary_good: 'Қант пен тұз мөлшері қалыпты, теңгерімді рационға жарайды.',
      score_headline_moderate: 'Орташа сапа',
      score_summary_moderate: 'Қант немесе қаныққан майлар бар. Өлшеммен тұтыну ұсынылады.',
      score_headline_poor: 'Пайдасы төмен (тәтті тағам)',
      score_summary_poor: 'Қант, калория немесе май мөлшері жоғары. Сирек тұтынған жөн.',
      score_headline_bad: 'Жиі тұтынуға ұсынылмайды',
      score_summary_bad: 'Қанттың, тұздың немесе қоспалардың шектен тыс көптігі.',
      score_headline_nodata: 'Индекс үшін дерек жеткіліксіз',
      score_summary_nodata: 'Қаптамада қант, май немесе тұз туралы ақпарат көрсетілмеген.',
      score_positives_title: 'Құрамның артықшылықтары',
      score_negatives_title: 'Құрамның кемшіліктері',
      // New features
      tab_search_barcode: 'Штрихкод бойынша',
      tab_search_name: 'Атауы бойынша',
      input_name_placeholder: 'Өнім атауын енгізіңіз (мыс. Coca-Cola, Snickers, шай)...',
      quick_samples_name_label: 'Танымал сұраныстар:',
      search_results_title: 'Іздеу нәтижелері',
      btn_close_results: '✕ Жабу',
      loading_search_products: 'Өнімдер Open Food Facts базасынан ізделуде...',
      search_no_results: 'Өнім табылмады. Басқа атауды енгізіп көріңіз немесе штрихкодты сканерлеңіз.',
      search_error: 'Іздеу кезінде қате орын алды. Қайталап көріңіз.',
      btn_search_manually_name: 'Атауы бойынша іздеу',
      alternatives_badge: 'Qoldau ұсыныстары',
      alternatives_title: 'Пайдалырақ баламалар',
      alternatives_sub: 'Пайдалылық балы жоғары осы санаттағы өнімдер',
      loading_alternatives: 'Үздік баламаларды іздеу...',
      alternatives_empty_text: 'Бұл санатта сәйкес келетін пайдалырақ баламалар табылмады.',
      alternatives_disclaimer: 'ℹ️ Салыстыру тағамдық құрамы мен құндылығы бойынша қолжетімді деректерге негізделген. Дәрігерлік нұсқаулық емес.',
      alt_reason_lower_sugar: 'Қанты аз',
      alt_reason_lower_salt: 'Тұзы аз',
      alt_reason_lower_satfat: 'Қаныққан майы аз',
      alt_reason_higher_protein: 'Ақуызы көп',
      alt_reason_better_score: 'Пайдалылық балы жоғары',
      badge_official_registry: 'Ресми тізілім',
      official_info_title: 'Өнім туралы ресми ақпарат',
      official_info_sub: 'Реттеу, сәйкестік белгілері және сертификаттау',
      official_cert_empty: 'Бұл өнім бойынша ресми сертификаттау туралы ақпарат базада жоқ.',
      official_cert_label_type: 'Сертификат түрі / белгі:',
      official_cert_label_issuer: 'Орган / тізілім:',
      official_cert_label_num: 'Құжат нөмірі:',
      official_cert_view_doc: 'Құжат көзіне өту ↗',
      transparency_title: 'Деректер көзі және ашықтық',
      transparency_sub: 'Ақпараттың шығу тегі мен тексерілу күйі',
      source_origin_label: 'Дереккөз:',
      source_status_label: 'Деректер күйі:',
      source_updated_label: 'Соңғы жаңартылуы:',
      status_community: 'Қоғамдастық (Open Food Facts)',
      status_user_local: 'Пайдаланушы деректері (тексерілмеген)',
      status_local_verified: 'Qoldau жергілікті базасы (тексерілген)',
      transparency_full_disclaimer: '⚠️ Qoldau пайдалылық индексі — тағамдық құрамы мен құндылығы туралы қолжетімді деректерге негізделген ақпараттық бағалау. Ол медициналық диагноз немесе ресми сапа сертификаты болып табылмайды.'
    },

    en: {
      tagline_short: 'Healthy Choice',
      hero_badge: '✨ Check ingredients in 2 seconds',
      hero_title: 'Know what you eat.',
      hero_subtitle: 'Point your camera at a food barcode or type it manually to uncover sugar, allergens, and nutritional facts in Kazakhstan.',
      btn_scan_product: 'Scan Product (Video)',
      btn_take_photo: '📸 Take Barcode Photo',
      manual_search_title: 'Barcode Search',
      manual_search_heading: 'Barcode Search',
      input_barcode_placeholder: 'Enter barcode (e.g. 3017620422003)...',
      btn_search: 'Search',
      quick_samples_label: 'Try sample barcodes:',
      test_not_found: 'Test: Not found',
      recent_scans_title: 'Recently Scanned',
      btn_clear_history: 'Clear',
      history_empty: 'No scan history yet. Scan your first product!',
      feature_off_title: 'Open Food Facts',
      feature_off_desc: 'Global open database of over 3 million verified food products.',
      feature_simple_title: 'Easy to Understand',
      feature_simple_desc: 'Instant plain-language breakdown of sugar, salt, and allergens.',
      feature_kz_title: 'Kazakhstan Focus',
      feature_kz_desc: 'Local product support, KZT (₸) price readiness, and 3 languages.',
      btn_back: 'Back to Search',
      btn_back_home: 'Back to Home',
      verified_badge: '✓ Open Food Facts',
      user_badge: '👤 User-Submitted',
      no_image_available: 'No image available',
      indicator_title: 'Nutritional Profile Rating:',
      rating_disclaimer: '⚠️ Informational estimate based on WHO dietary standards. Not a medical diagnosis or healthcare advice.',
      easy_understand_title: 'Easy to understand',
      easy_understand_sub: 'Plain-language analysis based on available nutritional data',
      nutrition_title: 'Nutrition Facts',
      nutrition_sub: 'Per 100g of product',
      ingredients_title: 'Ingredients',
      ingredients_empty: 'Ingredients information is not listed on packaging.',
      allergens_title: 'Allergens',
      allergens_none: 'No allergens detected in database',
      allergens_warning_prefix: 'Contains allergens: ',
      manufacturer_title: 'Origin & Manufacturing',
      country_label: 'Country:',
      manufacturer_label: 'Manufacturer:',
      barcode_label: 'Barcode:',
      btn_scan_another: 'Scan another product',
      not_found_title: 'Product not found',
      not_found_desc_1: 'Barcode',
      not_found_desc_2: 'is not yet in the Open Food Facts database.',
      kz_add_callout_title: 'Help consumers in Kazakhstan!',
      kz_add_callout_desc: 'You can add this product to Qoldau Food. It will be saved locally and available immediately.',
      btn_add_product: 'Add this product',
      btn_cancel: 'Cancel',
      add_form_title: 'Add Product',
      add_notice_text: 'Product will be stored in your local database with "User-Submitted (Unverified)" status.',
      field_barcode: 'Barcode *',
      field_name: 'Product Name *',
      field_brand: 'Brand / Manufacturer',
      field_country: 'Country',
      field_photo: 'Product Photo',
      btn_choose_photo: 'Choose photo',
      field_ingredients: 'Ingredients',
      field_allergens: 'Allergens (comma separated)',
      fieldset_nutrition_100g: 'Nutrition per 100g',
      nutr_calories: 'Calories (kcal)',
      nutr_protein: 'Protein (g)',
      nutr_fat: 'Fat (g)',
      nutr_satfat: 'Saturated Fat (g)',
      nutr_carbs: 'Carbohydrates (g)',
      nutr_sugar: 'Sugar (g)',
      nutr_salt: 'Salt (g)',
      btn_save_product: 'Save Product',
      scanner_title: 'Barcode Scanner',
      scanner_hint: 'Point your camera at the barcode (EAN-13, EAN-8, UPC). The scanner will focus automatically.',
      btn_flip_cam: 'Flip Camera',
      btn_scan_file: 'From Photo',
      loading_search: 'Searching Open Food Facts...',
      footer_kz_tag: 'Designed for consumers in Kazakhstan.',
      footer_off_attr: 'Data provided by',
      toast_barcode_invalid: 'Please enter a valid barcode (7 to 14 digits)',
      toast_product_saved: 'Product successfully saved to your local database!',
      toast_network_error: 'Unable to connect to Open Food Facts. Please check your internet connection.',
      toast_camera_error: 'Unable to access camera. Please check browser permissions or upload a barcode image.',
      sugar_high_title: 'Contains a high amount of sugar',
      sugar_high_desc: 'Contains over 22.5g of sugar per 100g. Consumption should be limited.',
      sugar_mod_title: 'Moderate amount of sugar',
      sugar_mod_desc: 'Sugar content is within moderate levels (5g to 22.5g per 100g).',
      sugar_low_title: 'Low sugar content',
      sugar_low_desc: 'Contains less than 5g of sugar per 100g — excellent choice.',
      salt_high_title: 'Contains a high amount of salt',
      salt_high_desc: 'Over 1.5g of salt per 100g. People monitoring blood pressure should take note.',
      salt_low_title: 'Low salt content',
      salt_low_desc: 'Less than 0.3g of salt per 100g.',
      satfat_high_title: 'High saturated fat content',
      satfat_high_desc: 'Over 5g per 100g. Excess intake may increase blood cholesterol levels.',
      protein_high_title: 'High protein content',
      protein_high_desc: 'Over 10g of protein per 100g — great for muscle repair and satiety.',
      allergens_alert_title: 'Contains allergens',
      rating_low: 'Low Risk',
      rating_moderate: 'Moderate',
      rating_high: 'High',
      rating_nodata: 'Not enough data',
      health_score_title: 'Product Health Score',
      score_scale_label: '100-point health index',
      score_grade_excellent: 'Excellent Choice',
      score_grade_good: 'Good Choice',
      score_grade_moderate: 'Moderate Quality',
      score_grade_poor: 'Poor Nutritional Value',
      score_grade_bad: 'Not Recommended',
      score_grade_nodata: 'Insufficient Data',
      score_factors_title: 'Key Rating Factors',
      rating_disclaimer: '⚠️ WHO-based nutritional density score per 100g. The higher the score (up to 100), the healthier and cleaner the product.',
      scale_unhealthy: '0 • Unhealthy',
      scale_moderate: '50 • Moderate',
      scale_healthy: '100 • Healthy',
      score_headline_excellent: 'Excellent, Healthy Choice',
      score_summary_excellent: 'Nutrient-rich and balanced profile, ideal for regular consumption.',
      score_headline_good: 'Good Quality Choice',
      score_summary_good: 'Moderate levels of sugar and salt, suitable for a balanced diet.',
      score_headline_moderate: 'Moderate Quality',
      score_summary_moderate: 'Contains notable sugar or saturated fat. Consume in moderation.',
      score_headline_poor: 'Low Nutritional Value (Treat)',
      score_summary_poor: 'High in sugar, saturated fat, or calories. Best enjoyed occasionally.',
      score_headline_bad: 'Not Recommended for Regular Intake',
      score_summary_bad: 'Critical excess of sugar, salt, or artificial additives.',
      score_headline_nodata: 'Insufficient Data for Health Score',
      score_summary_nodata: 'Nutritional facts for sugar, fat, or salt are not available.',
      score_positives_title: 'Composition Highlights',
      score_negatives_title: 'Areas of Concern',
      // New features
      tab_search_barcode: 'By Barcode',
      tab_search_name: 'By Name',
      input_name_placeholder: 'Enter product name (e.g. Coca-Cola, Snickers, tea)...',
      quick_samples_name_label: 'Popular queries:',
      search_results_title: 'Search Results',
      btn_close_results: '✕ Close',
      loading_search_products: 'Searching for products in Open Food Facts...',
      search_no_results: 'Product not found. Try another name or scan the barcode.',
      search_error: 'Something went wrong while searching. Please try again.',
      btn_search_manually_name: 'Search by name',
      alternatives_badge: 'Qoldau Recommendations',
      alternatives_title: 'Healthier Alternatives',
      alternatives_sub: 'Products in the same category with a higher health score',
      loading_alternatives: 'Searching for better alternatives...',
      alternatives_empty_text: 'No suitable healthier alternatives found in this category.',
      alternatives_disclaimer: 'ℹ️ Comparison is based on available nutrition and ingredient data. It is not a medical recommendation.',
      alt_reason_lower_sugar: 'Lower sugar',
      alt_reason_lower_salt: 'Lower salt',
      alt_reason_lower_satfat: 'Lower sat. fat',
      alt_reason_higher_protein: 'Higher protein',
      alt_reason_better_score: 'Better health score',
      badge_official_registry: 'Official Registry',
      official_info_title: 'Official Product Information',
      official_info_sub: 'Regulation, compliance marks, and certification',
      official_cert_empty: 'Official certification information is not available for this product.',
      official_cert_label_type: 'Certificate type / mark:',
      official_cert_label_issuer: 'Issuer / registry:',
      official_cert_label_num: 'Document number:',
      official_cert_view_doc: 'View source document ↗',
      transparency_title: 'Data Source & Transparency',
      transparency_sub: 'Information provenance and verification status',
      source_origin_label: 'Data source:',
      source_status_label: 'Data status:',
      source_updated_label: 'Last updated:',
      status_community: 'Community-sourced (Open Food Facts)',
      status_user_local: 'User-Submitted (Unverified)',
      status_local_verified: 'Qoldau Local DB (Verified)',
      transparency_full_disclaimer: '⚠️ Qoldau Health Score is an informational score based on available nutrition and ingredient data. It is not a medical diagnosis or official certification.'
    }
  },

  /**
   * Get localized string by key
   */
  t(key, fallback = '') {
    const langObj = this.translations[this.currentLang] || this.translations['ru'];
    return langObj[key] || this.translations['ru'][key] || fallback || key;
  },

  /**
   * Switch active language and update DOM
   */
  setLanguage(lang) {
    if (!this.translations[lang]) lang = 'ru';
    this.currentLang = lang;
    localStorage.setItem('qoldau_lang', lang);

    document.documentElement.lang = lang;
    const select = document.getElementById('lang-select');
    if (select) select.value = lang;

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (text) el.textContent = text;
    });

    // Update placeholders with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = this.t(key);
      if (text) el.setAttribute('placeholder', text);
    });

    // Re-render current product if one is currently viewed
    if (AppState.currentProduct && AppState.currentView === 'view-product') {
      UIController.renderProduct(AppState.currentProduct);
    }
  },

  init() {
    const saved = localStorage.getItem('qoldau_lang');
    if (saved && this.translations[saved]) {
      this.setLanguage(saved);
    } else {
      // Auto-detect browser language
      const navLang = (navigator.language || 'ru').toLowerCase();
      if (navLang.startsWith('kk')) {
        this.setLanguage('kk');
      } else if (navLang.startsWith('en')) {
        this.setLanguage('en');
      } else {
        this.setLanguage('ru');
      }
    }
  }
};


/* ==============================================================================
   2. GS1 COUNTRY IDENTIFIER
   Helps users in Kazakhstan identify where a product was registered
   ============================================================================== */
const GS1 = {
  detectCountry(barcode) {
    if (!barcode || barcode.length < 3) return null;
    const prefix3 = parseInt(barcode.slice(0, 3), 10);
    const prefix2 = parseInt(barcode.slice(0, 2), 10);

    if (prefix3 === 487) {
      return { code: 'KZ', flag: '🇰🇿', name: 'Казахстан / Қазақстан (GS1 KZ)' };
    }
    if (prefix3 >= 460 && prefix3 <= 469) {
      return { code: 'RU', flag: '🇷🇺', name: 'Россия' };
    }
    if (prefix3 === 481) {
      return { code: 'BY', flag: '🇧🇾', name: 'Беларусь' };
    }
    if (prefix3 === 482) {
      return { code: 'UA', flag: '🇺🇦', name: 'Украина' };
    }
    if (prefix3 === 478) {
      return { code: 'UZ', flag: '🇺🇿', name: 'Узбекистан' };
    }
    if (prefix3 === 470) {
      return { code: 'KG', flag: '🇰🇬', name: 'Кыргызстан' };
    }
    if (prefix3 >= 300 && prefix3 <= 379) {
      return { code: 'FR', flag: '🇫🇷', name: 'Франция' };
    }
    if (prefix3 >= 400 && prefix3 <= 440) {
      return { code: 'DE', flag: '🇩🇪', name: 'Германия' };
    }
    if (prefix3 >= 500 && prefix3 <= 509) {
      return { code: 'GB', flag: '🇬🇧', name: 'Великобритания' };
    }
    if (prefix3 >= 540 && prefix3 <= 549) {
      return { code: 'BE', flag: '🇧🇪', name: 'Бельгия / Люксембург' };
    }
    if (prefix3 >= 760 && prefix3 <= 769) {
      return { code: 'CH', flag: '🇨🇭', name: 'Швейцария' };
    }
    if (prefix3 >= 800 && prefix3 <= 839) {
      return { code: 'IT', flag: '🇮🇹', name: 'Италия' };
    }
    if (prefix3 >= 840 && prefix3 <= 849) {
      return { code: 'ES', flag: '🇪🇸', name: 'Испания' };
    }
    if (prefix2 >= 0 && prefix2 <= 13) {
      return { code: 'US', flag: '🇺🇸', name: 'США / Канада' };
    }
    return null;
  }
};


/* ==============================================================================
   3. KAZAKHSTAN LOCAL & MOCK DATABASE (LOCAL_DB)
   Pre-seeded authentic Kazakhstan products and user-submitted products
   ============================================================================== */
const LOCAL_DB = {
  // Pre-seeded staple Kazakhstan items
  seedProducts: {
    // Kazakhstan staple: Rahat chocolate (supports both checksum variations)
    '4870001010140': {
      barcode: '4870001010140',
      name: 'Шоколад «Казахстанский» 100г',
      brand: 'Рахат (Алматы)',
      image: 'https://images.openfoodfacts.org/images/products/487/000/101/0143/front_ru.6.400.jpg',
      ingredients: 'Сахар, какао тертое, какао масло, сыворотка молочная сухая, молоко сухое цельное, эмульгатор (лецитин соевый), экстракт натуральной ванили.',
      calories: 532,
      protein: 6.3,
      fat: 33.4,
      saturated_fat: 20.1,
      carbohydrates: 52.7,
      sugar: 48.0,
      salt: 0.15,
      allergens: ['молоко', 'соя'],
      country: 'Казахстан',
      manufacturer: 'АО «Рахат», г. Алматы',
      verified: true
    },
    '4870001010143': {
      barcode: '4870001010143',
      name: 'Шоколад «Казахстанский» 100г',
      brand: 'Рахат (Алматы)',
      image: 'https://images.openfoodfacts.org/images/products/487/000/101/0143/front_ru.6.400.jpg',
      ingredients: 'Сахар, какао тертое, какао масло, сыворотка молочная сухая, молоко сухое цельное, эмульгатор (лецитин соевый), экстракт натуральной ванили.',
      calories: 532,
      protein: 6.3,
      fat: 33.4,
      saturated_fat: 20.1,
      carbohydrates: 52.7,
      sugar: 48.0,
      salt: 0.15,
      allergens: ['молоко', 'соя'],
      country: 'Казахстан',
      manufacturer: 'АО «Рахат», г. Алматы',
      verified: true
    },
    '4870144000305': {
      barcode: '4870144000305',
      name: 'Чай «Пиала Gold» Кения гранулированный',
      brand: 'RG Brands',
      image: '',
      ingredients: '100% натуральный отборный кенийский черный чай гранулированный (СТС).',
      calories: 1,
      protein: 0.1,
      fat: 0,
      saturated_fat: 0,
      carbohydrates: 0.2,
      sugar: 0,
      salt: 0.01,
      allergens: [],
      country: 'Казахстан',
      manufacturer: 'ТОО «RG Brands Kazakhstan», г. Алматы',
      verified: true
    },
    '4870144000308': {
      barcode: '4870144000308',
      name: 'Чай «Пиала Gold» Кения гранулированный',
      brand: 'RG Brands',
      image: '',
      ingredients: '100% натуральный отборный кенийский черный чай гранулированный (СТС).',
      calories: 1,
      protein: 0.1,
      fat: 0,
      saturated_fat: 0,
      carbohydrates: 0.2,
      sugar: 0,
      salt: 0.01,
      allergens: [],
      country: 'Казахстан',
      manufacturer: 'ТОО «RG Brands Kazakhstan», г. Алматы',
      verified: true
    },
    '4870206330013': {
      barcode: '4870206330013',
      name: 'Қымыз / Кумыс натуральный',
      brand: 'Qazaq Organic Farm',
      image: '',
      ingredients: 'Бие сүтінен жасалған табиғи қымыз (Натуральное кобылье молоко, закваска).',
      calories: 48,
      protein: 2.1,
      fat: 1.9,
      saturated_fat: 1.1,
      carbohydrates: 4.8,
      sugar: 4.8,
      salt: 0.05,
      allergens: ['бие сүті / кобылье молоко'],
      country: 'Казахстан',
      manufacturer: 'Қазақстан фермерлік шаруашылығы',
      verified: true
    },
    '4870206330015': {
      barcode: '4870206330015',
      name: 'Қымыз / Кумыс натуральный',
      brand: 'Qazaq Organic Farm',
      image: '',
      ingredients: 'Бие сүтінен жасалған табиғи қымыз (Натуральное кобылье молоко, закваска).',
      calories: 48,
      protein: 2.1,
      fat: 1.9,
      saturated_fat: 1.1,
      carbohydrates: 4.8,
      sugar: 4.8,
      salt: 0.05,
      allergens: ['бие сүті / кобылье молоко'],
      country: 'Казахстан',
      manufacturer: 'Қазақстан фермерлік шаруашылығы',
      verified: true
    },
    // Common popular store barcodes for instant test verification
    '4008400404127': {
      barcode: '4008400404127',
      name: 'Шоколад Kinder Chocolate с молочной начинкой 100г',
      brand: 'Ferrero / Kinder',
      image: '',
      ingredients: 'Сахар, сухое цельное молоко, масло какао, тертое какао, эмульгатор (соевый лецитин), ароматизатор (ванилин). Молочная начинка: сахар, сухое обезжиренное молоко, растительный жир.',
      calories: 566,
      protein: 8.7,
      fat: 35.0,
      saturated_fat: 22.6,
      carbohydrates: 53.5,
      sugar: 53.3,
      salt: 0.31,
      allergens: ['молоко', 'соя'],
      country: 'Германия / Италия',
      manufacturer: 'Ferrero',
      verified: true
    },
    '5449000000996': {
      barcode: '5449000000996',
      name: 'Напиток безалкогольный газированный Coca-Cola Classic 0.5л',
      brand: 'The Coca-Cola Company',
      image: '',
      ingredients: 'Очищенная вода, сахар, краситель сахарный колер IV (E150d), регулятор кислотности ортофосфорная кислота, натуральные ароматизаторы, кофеин.',
      calories: 42,
      protein: 0,
      fat: 0,
      saturated_fat: 0,
      carbohydrates: 10.6,
      sugar: 10.6,
      salt: 0.02,
      allergens: [],
      country: 'Казахстан',
      manufacturer: 'СП Кока-Кола Алматы Боттлерс',
      verified: true
    },
    '5000159461122': {
      barcode: '5000159461122',
      name: 'Батончик Snickers с жареным арахисом и карамелью 80г',
      brand: 'Mars',
      image: '',
      ingredients: 'Молочный шоколад (сахар, какао масло, какао тертое, сухое цельное молоко, лактоза, сухая молочная сыворотка, молочный жир, эмульгатор соевый лецитин, ароматизатор), арахис, глюкозный сироп, сахар, масло пальмовое рафинированное.',
      calories: 498,
      protein: 8.6,
      fat: 28.1,
      saturated_fat: 9.6,
      carbohydrates: 55.7,
      sugar: 45.9,
      salt: 0.63,
      allergens: ['арахис', 'молоко', 'соя'],
      country: 'Россия / Казахстан',
      manufacturer: 'ООО Марс',
      verified: true
    }
  },

  getUserProducts() {
    try {
      const stored = localStorage.getItem('qoldau_user_products');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.warn('Failed to parse user products from localStorage', e);
      return {};
    }
  },

  saveUserProduct(product) {
    const products = this.getUserProducts();
    product.verified = false; // User-submitted flag
    product.submittedAt = new Date().toISOString();
    products[product.barcode] = product;
    localStorage.setItem('qoldau_user_products', JSON.stringify(products));
    return product;
  },

  get(barcode) {
    const cleanBarcode = String(barcode).trim();
    const userProducts = this.getUserProducts();
    if (userProducts[cleanBarcode]) {
      return userProducts[cleanBarcode];
    }
    if (this.seedProducts[cleanBarcode]) {
      return this.seedProducts[cleanBarcode];
    }
    return null;
  }
};


/* ==============================================================================
   4. OPEN FOOD FACTS API INTEGRATION
   Requirement: Separate getProductByBarcode(barcode) function
   ============================================================================== */

/**
 * Validates a barcode string.
 * Supports EAN-8, UPC-A, EAN-13, and code lengths 7 to 14 digits.
 * @param {string} barcode 
 * @returns {boolean}
 */
function isValidBarcode(barcode) {
  if (!barcode || typeof barcode !== 'string') return false;
  const cleaned = barcode.trim().replace(/[\s-]/g, '');
  return /^\d{7,14}$/.test(cleaned);
}

/**
 * Fetches product information by barcode from Open Food Facts API v2.
 *
 * 1. Validates barcode.
 * 2. Checks local Kazakhstan DB.
 * 3. Sends request to Open Food Facts v2 API.
 * 4. Checks whether product exists (status 1 vs status 0 / 404).
 * 5. Extracts and normalizes required fields into a clean JS object.
 * 6. Handles missing data, 404, and network errors.
 *
 * @param {string} barcode
 * @returns {Promise<{ found: boolean, product?: object, error?: string }>}
 */
async function getProductByBarcode(barcode) {
  // 1. Barcode validation
  if (!barcode) {
    throw new Error('Barcode is required');
  }

  const cleanBarcode = String(barcode).trim().replace(/[\s-]/g, '');
  if (!isValidBarcode(cleanBarcode)) {
    throw new Error('Invalid barcode format. Expected 7-14 numeric digits.');
  }

  // Check local database first (Kazakhstan mock & user-added products)
  const localMatch = LOCAL_DB.get(cleanBarcode);
  if (localMatch) {
    return {
      found: true,
      product: localMatch,
      source: localMatch.verified ? 'local_verified' : 'user_local'
    };
  }

  // 2. Request to Open Food Facts API v2
  const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(cleanBarcode)}.json`;

  let response;
  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // Good citizenship: OFF asks for a descriptive User-Agent
        'User-Agent': 'QoldauFood-KZ-MVP/1.0 (https://qoldau.kz; contact@qoldau.kz)'
      }
    });
  } catch (netErr) {
    console.error('Network error contacting Open Food Facts:', netErr);
    return {
      found: false,
      error: 'network_error',
      barcode: cleanBarcode
    };
  }

  // Handle 404: Product not found in Open Food Facts
  if (response.status === 404) {
    return {
      found: false,
      barcode: cleanBarcode
    };
  }

  if (!response.ok) {
    return {
      found: false,
      error: `API returned status ${response.status}`,
      barcode: cleanBarcode
    };
  }

  let data;
  try {
    data = await response.json();
  } catch (jsonErr) {
    return {
      found: false,
      error: 'Invalid JSON response from server',
      barcode: cleanBarcode
    };
  }

  // 3. Check whether product exists in API response
  if (data.status !== 1 || !data.product) {
    return {
      found: false,
      barcode: cleanBarcode
    };
  }

  const cleanProduct = normalizeProductFromOFF(data.product, data.code || cleanBarcode);

  return {
    found: true,
    product: cleanProduct,
    source: 'open_food_facts'
  };
}

/**
 * Normalizes raw Open Food Facts product objects into clean application model.
 * Extracts categories, certification labels, and last modified timestamps.
 * 
 * @param {object} p Raw product from OFF
 * @param {string} fallbackBarcode
 * @returns {object|null}
 */
function normalizeProductFromOFF(p, fallbackBarcode = '') {
  if (!p) return null;
  const n = p.nutriments || {};

  const getNum = (val) => {
    if (val === undefined || val === null || val === '') return null;
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : Math.round(parsed * 100) / 100;
  };

  // Calories: try energy-kcal_100g, energy-kcal, or convert from energy_100g (kJ)
  let calories = getNum(n['energy-kcal_100g']);
  if (calories === null) {
    calories = getNum(n['energy-kcal']);
  }
  if (calories === null && n['energy_100g']) {
    const kj = getNum(n['energy_100g']);
    if (kj !== null) calories = Math.round(kj / 4.184);
  }

  // Clean Allergens
  let allergens = [];
  if (Array.isArray(p.allergens_tags) && p.allergens_tags.length > 0) {
    allergens = p.allergens_tags.map(tag => tag.replace(/^[a-z]{2}:/, '').replace(/-/g, ' '));
  } else if (typeof p.allergens === 'string' && p.allergens.trim()) {
    allergens = p.allergens.split(',').map(s => s.trim()).filter(Boolean);
  }

  // Clean Name with multi-language fallback
  const name = p.product_name_ru || 
               p.product_name || 
               p.product_name_en || 
               p.generic_name || 
               'Без названия';

  // Brands can be an array or string in different search endpoints
  let brandStr = '';
  if (Array.isArray(p.brands)) {
    brandStr = p.brands.join(', ');
  } else if (typeof p.brands === 'string') {
    brandStr = p.brands;
  }

  // Extract official labels & certifications if present (Requirement 3: Official Data)
  const labelsTags = Array.isArray(p.labels_tags) ? p.labels_tags : [];
  const embCodesTags = Array.isArray(p.emb_codes_tags) ? p.emb_codes_tags : [];
  const officialCerts = [];

  labelsTags.forEach(tag => {
    const cleanTag = tag.replace(/^[a-z]{2}:/, '').toLowerCase();
    if (cleanTag.includes('halal') || cleanTag.includes('халал')) {
      officialCerts.push({
        type: 'Халал / Halal',
        name: tag.replace(/^[a-z]{2}:/, ''),
        issuer: 'Сертификационный центр Халал'
      });
    } else if (cleanTag.includes('eac') || cleanTag.includes('гост') || cleanTag.includes('gost') || cleanTag.includes('tr-ts') || cleanTag.includes('тр-тс')) {
      officialCerts.push({
        type: 'EAC / ГОСТ / ТР ТС',
        name: tag.replace(/^[a-z]{2}:/, ''),
        issuer: 'Евразийский экономический союз (ЕАЭС)'
      });
    } else if (cleanTag.includes('organic') || cleanTag.includes('bio') || cleanTag.includes('эко') || cleanTag.includes('органик')) {
      officialCerts.push({
        type: 'Organic / Bio / Эко',
        name: tag.replace(/^[a-z]{2}:/, ''),
        issuer: 'Органы экологической сертификации'
      });
    } else if (cleanTag.includes('iso')) {
      officialCerts.push({
        type: 'ISO',
        name: tag.replace(/^[a-z]{2}:/, ''),
        issuer: 'Международная организация по стандартизации (ISO)'
      });
    }
  });

  return {
    barcode: p.code || fallbackBarcode || '',
    name: name,
    brand: brandStr,
    image: p.image_front_url || p.image_url || p.image_small_url || '',
    ingredients: p.ingredients_text_ru || p.ingredients_text || p.ingredients_text_en || '',
    calories: calories,
    protein: getNum(n['proteins_100g']),
    fat: getNum(n['fat_100g']),
    saturated_fat: getNum(n['saturated-fat_100g']),
    carbohydrates: getNum(n['carbohydrates_100g']),
    sugar: getNum(n['sugars_100g']),
    salt: getNum(n['salt_100g'] !== undefined ? n['salt_100g'] : (n['sodium_100g'] ? n['sodium_100g'] * 2.5 : null)),
    allergens: allergens,
    country: p.countries || '',
    manufacturer: p.manufacturing_places || brandStr || '',
    categories: p.categories || '',
    categories_tags: Array.isArray(p.categories_tags) ? p.categories_tags : [],
    last_modified_t: p.last_modified_t || null,
    labels_tags: labelsTags,
    emb_codes_tags: embCodesTags,
    official_certs: officialCerts,
    verified: true,
    source: 'open_food_facts'
  };
}

/**
 * Requirement 2: Manual Product Search by Name
 * Searches both local Kazakhstan database and Open Food Facts API.
 * 
 * @param {string} query 
 * @returns {Promise<{ success: boolean, count: number, products: Array<object>, error?: string }>}
 */
async function searchProductsByName(query) {
  if (!query || typeof query !== 'string') {
    return { success: false, count: 0, products: [] };
  }

  const cleanQuery = query.trim().toLowerCase();
  if (cleanQuery.length < 2) {
    return { success: true, count: 0, products: [] };
  }

  const matches = [];
  const seenBarcodes = new Set();

  // 1. Search local DB first (Instant response for local KZ goods)
  const allLocal = [
    ...Object.values(LOCAL_DB.seedProducts),
    ...Object.values(LOCAL_DB.getUserProducts())
  ];

  for (const item of allLocal) {
    const name = (item.name || '').toLowerCase();
    const brand = (item.brand || '').toLowerCase();
    const barcode = String(item.barcode || '');
    if (name.includes(cleanQuery) || brand.includes(cleanQuery)) {
      if (!seenBarcodes.has(barcode)) {
        seenBarcodes.add(barcode);
        matches.push(item);
      }
    }
  }

  // 2. Query Open Food Facts modern search engine
  let networkFailed = false;
  try {
    const searchUrl = `https://search.openfoodfacts.org/search?q=${encodeURIComponent(cleanQuery)}&page_size=15`;
    const resp = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'QoldauFood-KZ-MVP/1.0 (https://qoldau.kz; contact@qoldau.kz)'
      }
    });

    if (resp.ok) {
      const data = await resp.json();
      const hits = data.hits || data.products || [];
      for (const h of hits) {
        const barcode = String(h.code || '');
        if (barcode && !seenBarcodes.has(barcode)) {
          seenBarcodes.add(barcode);
          const norm = normalizeProductFromOFF(h, barcode);
          if (norm && norm.name && norm.name !== 'Без названия') {
            matches.push(norm);
          }
        }
      }
    } else {
      networkFailed = true;
    }
  } catch (err) {
    console.warn('search.openfoodfacts.org failed, trying fallback:', err);
    networkFailed = true;
  }

  // 3. Fallback to country search endpoint if modern search had network failure
  if (networkFailed) {
    try {
      const fallbackUrl = `https://ru.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(cleanQuery)}&search_simple=1&action=process&json=1&page_size=12`;
      const fbResp = await fetch(fallbackUrl, {
        headers: { 'User-Agent': 'QoldauFood-KZ-MVP/1.0' }
      });
      if (fbResp.ok) {
        const fbData = await fbResp.json();
        const prods = fbData.products || [];
        for (const p of prods) {
          const barcode = String(p.code || '');
          if (barcode && !seenBarcodes.has(barcode)) {
            seenBarcodes.add(barcode);
            const norm = normalizeProductFromOFF(p, barcode);
            if (norm && norm.name && norm.name !== 'Без названия') {
              matches.push(norm);
            }
          }
        }
      }
    } catch (fbErr) {
      console.warn('Fallback search also failed:', fbErr);
    }
  }

  return {
    success: true,
    count: matches.length,
    products: matches
  };
}

/**
 * Requirement 1: Healthier Alternatives Finder
 * Identifies 1-3 products from the same or similar category with a higher Health Score.
 * Computes comparative delta reasons (lower sugar, lower salt, higher score).
 * 
 * @param {object} product Current product
 * @returns {Promise<Array<object>>} Top 1-3 healthier alternatives
 */
async function findHealthierAlternatives(product) {
  if (!product) return [];

  const currentScoreObj = EVALUATOR.calculateHealthScore(product);
  const currentScore = currentScoreObj.score !== null ? currentScoreObj.score : 0;
  const currentBarcode = String(product.barcode || '');

  const candidates = [];
  const seenBarcodes = new Set([currentBarcode]);

  // 1. Identify category traits
  const nameLower = (product.name || '').toLowerCase();
  const isBeverage = (/\b(напиток|кола|чай|сок|вода|сусын|drink|cola|tea|juice|soda)\b/i.test(nameLower) ||
                      nameLower.includes('coca-cola') || nameLower.includes('pepsi') ||
                      (Number(product.protein) === 0 && Number(product.fat) === 0 && Number(product.sugar) > 0)) &&
                     !nameLower.includes('шоколад') && !nameLower.includes('chocolate');
  const isSweetSnack = nameLower.includes('шоколад') || nameLower.includes('chocolate') ||
                       nameLower.includes('батончик') || nameLower.includes('candy') ||
                       nameLower.includes('вафли') || nameLower.includes('печенье') ||
                       nameLower.includes('конфет') || nameLower.includes('snickers');
  const isDairy = nameLower.includes('молоко') || nameLower.includes('сүт') ||
                  nameLower.includes('айран') || nameLower.includes('кумыс') ||
                  nameLower.includes('қымыз') || nameLower.includes('кефир') ||
                  nameLower.includes('йогурт');

  // Check Local DB first for matches in same general category
  const allLocal = [
    ...Object.values(LOCAL_DB.seedProducts),
    ...Object.values(LOCAL_DB.getUserProducts())
  ];

  for (const item of allLocal) {
    if (seenBarcodes.has(String(item.barcode))) continue;
    const iName = (item.name || '').toLowerCase();
    let isMatch = false;

    if (isBeverage && (iName.includes('чай') || iName.includes('қымыз') || iName.includes('кумыс') || iName.includes('сусын') || iName.includes('вода'))) {
      isMatch = true;
    } else if (isSweetSnack && (iName.includes('шоколад') || iName.includes('рахат') || iName.includes('батончик'))) {
      isMatch = true;
    } else if (isDairy && (iName.includes('қымыз') || iName.includes('молоко') || iName.includes('сүт') || iName.includes('айран'))) {
      isMatch = true;
    }

    if (isMatch) {
      seenBarcodes.add(String(item.barcode));
      candidates.push(item);
    }
  }

  // 2. Fetch candidates from Open Food Facts category or related search
  let searchTag = '';
  if (Array.isArray(product.categories_tags) && product.categories_tags.length > 0) {
    const cleanTags = product.categories_tags
      .map(t => t.replace(/^[a-z]{2}:/, '').replace(/-/g, ' '))
      .filter(t => !['plant based foods and beverages', 'foods', 'groceries'].includes(t.toLowerCase()));
    if (cleanTags.length > 0) {
      searchTag = cleanTags[cleanTags.length - 1];
    }
  }

  if (!searchTag) {
    if (isBeverage) searchTag = 'tea';
    else if (isSweetSnack) searchTag = 'dark chocolate';
    else if (isDairy) searchTag = 'kefir';
  }

  if (searchTag) {
    try {
      const url = `https://search.openfoodfacts.org/search?q=${encodeURIComponent(searchTag)}&page_size=12`;
      const resp = await fetch(url, {
        headers: { 'User-Agent': 'QoldauFood-KZ-MVP/1.0' }
      });
      if (resp.ok) {
        const d = await resp.json();
        const hits = d.hits || d.products || [];
        for (const h of hits) {
          const b = String(h.code || '');
          if (b && !seenBarcodes.has(b)) {
            seenBarcodes.add(b);
            const norm = normalizeProductFromOFF(h, b);
            if (norm && norm.name && norm.name !== 'Без названия') {
              candidates.push(norm);
            }
          }
        }
      }
    } catch (e) {
      console.warn('Failed to fetch OFF category candidates:', e);
    }
  }

  // 3. Score candidates and compute delta comparison reasons
  const scoredAlts = [];

  for (const cand of candidates) {
    const candScoreObj = EVALUATOR.calculateHealthScore(cand);
    const candScore = candScoreObj.score;
    // Prefer products with a strictly higher Qoldau Health Score
    if (candScore === null || candScore <= currentScore) {
      continue;
    }

    const reasons = [];

    // Reason: Lower Sugar
    if (product.sugar !== null && product.sugar !== undefined &&
        cand.sugar !== null && cand.sugar !== undefined &&
        (Number(product.sugar) - Number(cand.sugar)) >= 2.0) {
      const diff = Math.round((Number(product.sugar) - Number(cand.sugar)) * 10) / 10;
      reasons.push({
        type: 'sugar',
        icon: '🍬',
        text: `${I18N.t('alt_reason_lower_sugar')} (-${diff}г)`
      });
    }

    // Reason: Lower Salt
    if (product.salt !== null && product.salt !== undefined &&
        cand.salt !== null && cand.salt !== undefined &&
        (Number(product.salt) - Number(cand.salt)) >= 0.15) {
      reasons.push({
        type: 'salt',
        icon: '🧂',
        text: I18N.t('alt_reason_lower_salt')
      });
    }

    // Reason: Lower Saturated Fat
    if (product.saturated_fat !== null && product.saturated_fat !== undefined &&
        cand.saturated_fat !== null && cand.saturated_fat !== undefined &&
        (Number(product.saturated_fat) - Number(cand.saturated_fat)) >= 1.5) {
      reasons.push({
        type: 'satfat',
        icon: '🧈',
        text: I18N.t('alt_reason_lower_satfat')
      });
    }

    // Reason: Higher Protein
    if (cand.protein !== null && cand.protein !== undefined &&
        (Number(cand.protein) - Number(product.protein || 0)) >= 3.0) {
      reasons.push({
        type: 'protein',
        icon: '💪',
        text: I18N.t('alt_reason_higher_protein')
      });
    }

    // Reason: Score advantage
    const scoreDiff = candScore - currentScore;
    reasons.push({
      type: 'better-score',
      icon: '📈',
      text: `${I18N.t('alt_reason_better_score')} (+${scoreDiff})`
    });

    cand.reasons = reasons;
    cand.computedScore = candScore;
    scoredAlts.push(cand);
  }

  // 4. Sort descending by score
  scoredAlts.sort((a, b) => b.computedScore - a.computedScore);

  // 5. Return top 1 to 3 items
  return scoredAlts.slice(0, 3);
}


/* ==============================================================================
   5. NUTRITIONAL EVALUATION & "EASY TO UNDERSTAND" INSIGHTS (EVALUATOR)
   WHO / UK FSA nutritional traffic-light benchmarks per 100g:
   - Sugar: >22.5g (High), <=5g (Low)
   - Salt: >1.5g (High), <=0.3g (Low)
   - Saturated Fat: >5g (High), <=1.5g (Low)
   - Protein: >=10g (High protein)
   ============================================================================== */
const EVALUATOR = {
  /**
   * Generates simple, plain-language insights based STRICTLY on available data.
   * Does not invent data when fields are missing.
   * @param {object} product
   * @returns {Array<{ level: string, icon: string, title: string, desc: string }>}
   */
  generateInsights(product) {
    const insights = [];

    // 1. Sugar assessment
    if (product.sugar !== null && product.sugar !== undefined) {
      if (product.sugar > 22.5) {
        insights.push({
          level: 'high',
          icon: '🍬',
          title: I18N.t('sugar_high_title'),
          desc: `${I18N.t('sugar_high_desc')} (${product.sugar} г / 100 г)`
        });
      } else if (product.sugar <= 5.0) {
        insights.push({
          level: 'low',
          icon: '✨',
          title: I18N.t('sugar_low_title'),
          desc: `${I18N.t('sugar_low_desc')} (${product.sugar} г / 100 г)`
        });
      } else {
        insights.push({
          level: 'moderate',
          icon: '⚖️',
          title: I18N.t('sugar_mod_title'),
          desc: `${I18N.t('sugar_mod_desc')} (${product.sugar} г / 100 г)`
        });
      }
    }

    // 2. Salt assessment
    if (product.salt !== null && product.salt !== undefined) {
      if (product.salt > 1.5) {
        insights.push({
          level: 'high',
          icon: '🧂',
          title: I18N.t('salt_high_title'),
          desc: `${I18N.t('salt_high_desc')} (${product.salt} г / 100 г)`
        });
      } else if (product.salt <= 0.3) {
        insights.push({
          level: 'low',
          icon: '💧',
          title: I18N.t('salt_low_title'),
          desc: `${I18N.t('salt_low_desc')} (${product.salt} г / 100 г)`
        });
      }
    }

    // 3. Saturated fat assessment
    if (product.saturated_fat !== null && product.saturated_fat !== undefined) {
      if (product.saturated_fat > 5.0) {
        insights.push({
          level: 'high',
          icon: '🧈',
          title: I18N.t('satfat_high_title'),
          desc: `${I18N.t('satfat_high_desc')} (${product.saturated_fat} г / 100 г)`
        });
      }
    }

    // 4. Protein assessment
    if (product.protein !== null && product.protein !== undefined && product.protein >= 10.0) {
      insights.push({
        level: 'low', // Green/positive
        icon: '💪',
        title: I18N.t('protein_high_title'),
        desc: `${I18N.t('protein_high_desc')} (${product.protein} г / 100 г)`
      });
    }

    // 5. Allergens statement
    if (Array.isArray(product.allergens) && product.allergens.length > 0) {
      insights.push({
        level: 'allergen',
        icon: '⚠️',
        title: I18N.t('allergens_alert_title'),
        desc: `${I18N.t('allergens_warning_prefix')}${product.allergens.join(', ')}.`
      });
    }

    // Fallback if no specific nutrient statements could be determined
    if (insights.length === 0) {
      insights.push({
        level: 'info',
        icon: 'ℹ️',
        title: I18N.t('rating_nodata'),
        desc: I18N.currentLang === 'ru' 
          ? 'Недостаточно полных данных о сахаре или соли для однозначной оценки.'
          : (I18N.currentLang === 'kk' 
              ? 'Қант немесе тұз туралы толық мәліметтер жеткіліксіз.' 
              : 'Nutritional details are insufficient to provide a complete breakdown.')
      });
    }

    return insights;
  },

  /**
   * 100-Point Scientific Health Scoring Algorithm (Qoldau Health Score)
   * Evaluates product healthiness on a scale from 0 to 100:
   * Higher score = Higher nutritional quality & cleaner ingredients!
   * 
   * @param {object} product
   * @returns {{
   *   score: number | null,
   *   grade: 'excellent' | 'good' | 'moderate' | 'poor' | 'bad' | 'nodata',
   *   color: string,
   *   labelKey: string,
   *   headline: string,
   *   summary: string,
   *   positives: Array<{ icon: string, text: string }>,
   *   negatives: Array<{ icon: string, text: string }>
   * }}
   */
  calculateHealthScore(product) {
    if (!product) {
      return {
        score: null,
        grade: 'nodata',
        color: '#94a3b8',
        labelKey: 'score_grade_nodata',
        headline: I18N.t('score_grade_nodata'),
        summary: I18N.t('rating_nodata'),
        positives: [],
        negatives: []
      };
    }

    let score = 100;
    const positives = [];
    const negatives = [];
    let hasData = false;

    const nameLower = (product.name || '').toLowerCase();
    const isBeverage = (/\b(напиток|кола|чай|сок|вода|сусын|drink|cola|tea|juice|soda)\b/i.test(nameLower) ||
                        nameLower.includes('coca-cola') || nameLower.includes('pepsi') ||
                        (Number(product.protein) === 0 && Number(product.fat) === 0 && Number(product.sugar) > 0)) &&
                       !nameLower.includes('шоколад') && !nameLower.includes('chocolate');

    const isFermentedDairy = nameLower.includes('қымыз') || nameLower.includes('кумыс') ||
                             nameLower.includes('айран') || nameLower.includes('шұбат') ||
                             nameLower.includes('шубат') || nameLower.includes('йогурт') ||
                             nameLower.includes('кефир') || nameLower.includes('творог');

    // 1. SUGAR (Max penalty: up to -42 pts for sugary drinks, -35 for food)
    if (product.sugar !== null && product.sugar !== undefined) {
      hasData = true;
      const sugar = Number(product.sugar);
      if (isBeverage) {
        if (sugar > 9.0) {
          score -= 42;
          negatives.push({ icon: '🍬', text: `Критически много сахара в напитке (${sugar} г / 100 мл)` });
        } else if (sugar > 5.0) {
          score -= 25;
          negatives.push({ icon: '🍬', text: `Много жидкого сахара (${sugar} г / 100 мл)` });
        } else if (sugar > 1.5) {
          score -= 12;
          negatives.push({ icon: '⚖️', text: `Умеренный сахар (${sugar} г / 100 мл)` });
        } else {
          score += 4;
          positives.push({ icon: '✨', text: `Минимум сахара (${sugar} г)` });
        }
      } else {
        if (sugar > 35.0) {
          score -= 35;
          negatives.push({ icon: '🍬', text: `Очень много сахара (${sugar} г / 100 г)` });
        } else if (sugar > 22.5) {
          score -= 26;
          negatives.push({ icon: '🍬', text: `Высокий сахар (${sugar} г / 100 г)` });
        } else if (sugar > 12.5) {
          score -= 15;
          negatives.push({ icon: '⚖️', text: `Умеренный сахар (${sugar} г / 100 г)` });
        } else if (sugar > 5.0) {
          score -= 6;
        } else {
          score += 5;
          positives.push({ icon: '✨', text: `Низкий сахар (${sugar} г / 100 г)` });
        }
      }
    }

    // 2. SATURATED FAT (Max penalty: -20 pts)
    if (product.saturated_fat !== null && product.saturated_fat !== undefined) {
      hasData = true;
      const satFat = Number(product.saturated_fat);
      if (satFat > 10.0) {
        score -= 20;
        negatives.push({ icon: '🧈', text: `Высокие насыщенные жиры (${satFat} г / 100 г)` });
      } else if (satFat > 5.0) {
        score -= 14;
        negatives.push({ icon: '🧈', text: `Повышенные насыщенные жиры (${satFat} г)` });
      } else if (satFat > 2.5) {
        score -= 7;
      } else if (satFat <= 1.0 && product.fat > 0) {
        positives.push({ icon: '🥑', text: `Мало насыщенных жиров (${satFat} г)` });
      }
    }

    // 3. SALT / SODIUM (Max penalty: -25 pts)
    if (product.salt !== null && product.salt !== undefined) {
      hasData = true;
      const salt = Number(product.salt);
      if (salt > 1.5) {
        score -= 25;
        negatives.push({ icon: '🧂', text: `Избыток соли (${salt} г / 100 г)` });
      } else if (salt > 0.8) {
        score -= 12;
        negatives.push({ icon: '🧂', text: `Повышенное содержание соли (${salt} г)` });
      } else if (salt <= 0.25) {
        score += 5;
        positives.push({ icon: '💧', text: `Мало соли / натрия (${salt} г)` });
      }
    }

    // 4. CALORIES (Max penalty: -15 pts)
    if (product.calories !== null && product.calories !== undefined) {
      hasData = true;
      const cal = Number(product.calories);
      if (cal > 500) {
        score -= 15;
        negatives.push({ icon: '🔥', text: `Высокая калорийность (${cal} ккал / 100 г)` });
      } else if (cal > 380) {
        score -= 8;
        negatives.push({ icon: '🔥', text: `Повышенные калории (${cal} ккал)` });
      } else if (cal < 80 && (!isBeverage || (product.sugar || 0) <= 2.0)) {
        positives.push({ icon: '🍃', text: `Низкая калорийность (${cal} ккал)` });
      }
    }

    // 5. PROTEIN (Bonus: up to +12 pts)
    if (product.protein !== null && product.protein !== undefined) {
      hasData = true;
      const prot = Number(product.protein);
      if (prot >= 12.0) {
        score += 12;
        positives.push({ icon: '💪', text: `Богат белком (${prot} г / 100 г)` });
      } else if (prot >= 6.0) {
        score += 6;
        positives.push({ icon: '💪', text: `Хороший источник белка (${prot} г)` });
      }
    }

    // 6. Natural Fermented Dairy / Kazakh Staples Bonus
    if (isFermentedDairy) {
      score += 10;
      positives.push({ icon: '🥛', text: 'Полезный кисломолочный продукт (пробиотики)' });
    }

    // 7. Additives / Ultra-processed penalty
    const ingrLower = (product.ingredients || '').toLowerCase();
    if (ingrLower.includes('e150d') || ingrLower.includes('сахарный колер') ||
        ingrLower.includes('ортофосфорная') || ingrLower.includes('аспартам') ||
        ingrLower.includes('пальмовое') || ingrLower.includes('пальмоядровое')) {
      const penalty = isBeverage ? 25 : 15;
      score -= penalty;
      negatives.push({ icon: '⚠️', text: 'Содержит вредные добавки или пальмовое масло' });
    }

    // 8. Empty calories penalty for sugary soft drinks
    if (isBeverage && (product.sugar || 0) > 8.0 && (product.protein || 0) === 0) {
      score -= 15;
      negatives.push({ icon: '📉', text: '«Пустые калории»: чистый жидкий сахар без белка и клетчатки' });
    }

    // 9. 100% natural pure tea
    if (nameLower.includes('чай') && (product.calories || 0) < 5 && (product.sugar || 0) === 0) {
      score = 100;
      positives.push({ icon: '🌱', text: '100% натуральный чай без сахара и калорий' });
    }

    if (!hasData) {
      return {
        score: null,
        grade: 'nodata',
        color: '#94a3b8',
        labelKey: 'score_grade_nodata',
        headline: I18N.t('score_headline_nodata'),
        summary: I18N.t('score_summary_nodata'),
        positives: [],
        negatives: []
      };
    }

    const finalScore = Math.max(1, Math.min(100, Math.round(score)));

    let grade = 'excellent';
    let color = '#10b981';
    let labelKey = 'score_grade_excellent';
    let headline = 'Отличный, полезный выбор';
    let summary = 'Сбалансированный питательный профиль, отлично подходит для регулярного питания.';

    if (finalScore >= 80) {
      grade = 'excellent';
      color = '#10b981'; // Green
      labelKey = 'score_grade_excellent';
      headline = I18N.t('score_headline_excellent');
      summary = I18N.t('score_summary_excellent');
    } else if (finalScore >= 60) {
      grade = 'good';
      color = '#84cc16'; // Lime
      labelKey = 'score_grade_good';
      headline = I18N.t('score_headline_good');
      summary = I18N.t('score_summary_good');
    } else if (finalScore >= 40) {
      grade = 'moderate';
      color = '#f59e0b'; // Amber
      labelKey = 'score_grade_moderate';
      headline = I18N.t('score_headline_moderate');
      summary = I18N.t('score_summary_moderate');
    } else if (finalScore >= 20) {
      grade = 'poor';
      color = '#f97316'; // Orange
      labelKey = 'score_grade_poor';
      headline = I18N.t('score_headline_poor');
      summary = I18N.t('score_summary_poor');
    } else {
      grade = 'bad';
      color = '#ef4444'; // Red
      labelKey = 'score_grade_bad';
      headline = I18N.t('score_headline_bad');
      summary = I18N.t('score_summary_bad');
    }

    return {
      score: finalScore,
      grade,
      color,
      labelKey,
      headline,
      summary,
      positives,
      negatives
    };
  },

  /**
   * Neutral informational indicator (legacy compatibility)
   * Returns: { labelKey: string, classname: string }
   */
  calculateRating(product) {
    const health = this.calculateHealthScore(product);
    if (!health.score) {
      return { labelKey: 'rating_nodata', classname: 'rating-nodata' };
    }
    if (health.score >= 60) {
      return { labelKey: 'rating_low', classname: 'rating-low' };
    }
    if (health.score >= 35) {
      return { labelKey: 'rating_moderate', classname: 'rating-moderate' };
    }
    return { labelKey: 'rating_high', classname: 'rating-high' };
  }
};


/* ==============================================================================
   6. SCAN HISTORY / RECENT SCANS
   Persists previously viewed products in localStorage
   ============================================================================== */
const HistoryManager = {
  getHistory() {
    try {
      const data = localStorage.getItem('qoldau_history');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  add(product) {
    if (!product || !product.barcode) return;
    const health = EVALUATOR.calculateHealthScore(product);
    let history = this.getHistory();
    // Remove duplicate if already present
    history = history.filter(item => item.barcode !== product.barcode);
    // Prepend latest product
    history.unshift({
      barcode: product.barcode,
      name: product.name || 'Без названия',
      brand: product.brand || '',
      image: product.image || '',
      calories: product.calories,
      healthScore: health.score,
      healthColor: health.color,
      healthGrade: health.grade,
      scannedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    // Keep up to 12 items
    if (history.length > 12) history.pop();
    localStorage.setItem('qoldau_history', JSON.stringify(history));
    this.render();
  },

  clear() {
    localStorage.removeItem('qoldau_history');
    this.render();
  },

  render() {
    const container = document.getElementById('recent-scans-list');
    const clearBtn = document.getElementById('btn-clear-history');
    if (!container) return;

    const history = this.getHistory();
    if (history.length === 0) {
      container.innerHTML = `<div class="history-empty">${I18N.t('history_empty')}</div>`;
      if (clearBtn) clearBtn.style.display = 'none';
      return;
    }

    if (clearBtn) clearBtn.style.display = 'inline-block';

    container.innerHTML = history.map(item => `
      <div class="history-item" data-barcode="${escapeHtml(item.barcode)}">
        ${item.image 
          ? `<img src="${escapeHtml(item.image)}" alt="" class="history-thumb" loading="lazy" onerror="this.outerHTML='<div class=\\'history-thumb\\'>🥗</div>'">`
          : `<div class="history-thumb">🥗</div>`
        }
        <div class="history-info">
          <div class="history-name">${escapeHtml(item.name)}</div>
          <div class="history-sub">
            <span>${item.brand ? escapeHtml(item.brand) : item.barcode}</span>
            ${item.calories !== null && item.calories !== undefined ? `<span>• ${item.calories} ккал</span>` : ''}
          </div>
        </div>
        <div class="history-chips-col">
          ${item.healthScore !== null && item.healthScore !== undefined
            ? `<span class="history-score-chip" style="background-color: ${item.healthColor || '#10b981'}">${item.healthScore} / 100</span>`
            : ''
          }
          <span class="barcode-chip">${escapeHtml(item.barcode)}</span>
        </div>
      </div>
    `).join('');

    // Attach click listeners to history items
    container.querySelectorAll('.history-item').forEach(el => {
      el.addEventListener('click', () => {
        const barcode = el.getAttribute('data-barcode');
        if (barcode) App.searchBarcode(barcode);
      });
    });
  }
};


/* ==============================================================================
   7. BARCODE CAMERA SCANNER CONTROLLER
   Multi-Engine Architecture:
   - Engine 1: Direct High-Res Center Crop + ZXing (Hybrid & GlobalHistogram Binarizers)
   - Engine 2: Hardware-Accelerated Native BarcodeDetector (Chrome Android / Play Services)
   - Engine 3: Computer Vision Quagga2 Fallback (for 1D printed barcodes)
   - Continuous Autofocus, Tap-to-Focus, Hardware/Digital Zoom & Web Audio Beep
   ============================================================================== */
const ScannerController = {
  html5QrCode: null,
  isScanning: false,
  currentFacingMode: 'environment', // 'environment' (back) or 'user' (front)
  videoTrack: null,
  isTorchOn: false,
  currentZoom: 1,
  hardwareZoomSupported: false,
  scanLoopTimeout: null,
  detectorInstance: null,
  zxingReader: null,
  scanCanvas: null,
  scanCtx: null,
  auxCanvas: null,
  auxCtx: null,
  quaggaBusy: false,
  lastQuaggaScanTime: 0,

  initZXingReader() {
    if (this.zxingReader) return;
    const zx = window.ZXing || (window.__Html5QrcodeLibrary__ && window.__Html5QrcodeLibrary__.ZXing);
    if (zx) {
      try {
        const hints = new Map();
        const formats = [
          zx.BarcodeFormat.EAN_13,
          zx.BarcodeFormat.EAN_8,
          zx.BarcodeFormat.UPC_A,
          zx.BarcodeFormat.UPC_E,
          zx.BarcodeFormat.CODE_128,
          zx.BarcodeFormat.CODE_39,
          zx.BarcodeFormat.ITF,
          zx.BarcodeFormat.QR_CODE
        ].filter(Boolean);

        hints.set(zx.DecodeHintType.POSSIBLE_FORMATS, formats);
        hints.set(zx.DecodeHintType.TRY_HARDER, true);
        this.zxingReader = new zx.MultiFormatReader();
        this.zxingReader.setHints(hints);
      } catch (e) {
        console.warn('Could not initialize ZXing reader:', e);
      }
    }
  },

  decodeCanvasWithZXing(canvas) {
    const zx = window.ZXing || (window.__Html5QrcodeLibrary__ && window.__Html5QrcodeLibrary__.ZXing);
    if (!zx || !this.zxingReader) {
      this.initZXingReader();
    }
    if (!this.zxingReader || !zx) return null;

    try {
      const lum = new zx.HTMLCanvasElementLuminanceSource(canvas);
      // 1. Try HybridBinarizer (standard lighting)
      try {
        const bitmap = new zx.BinaryBitmap(new zx.HybridBinarizer(lum));
        const res = this.zxingReader.decode(bitmap);
        if (res && res.getText()) return res.getText();
      } catch (e) {}

      // 2. Try GlobalHistogramBinarizer (uneven lighting, glossy wrapper glare)
      try {
        const bitmap2 = new zx.BinaryBitmap(new zx.GlobalHistogramBinarizer(lum));
        const res2 = this.zxingReader.decode(bitmap2);
        if (res2 && res2.getText()) return res2.getText();
      } catch (e) {}
    } catch (e) {}
    return null;
  },

  async canUseNativeBarcodeDetector() {
    if (!('BarcodeDetector' in window)) return false;
    if (typeof BarcodeDetector.getSupportedFormats !== 'function') return false;
    try {
      const supported = await BarcodeDetector.getSupportedFormats();
      return supported.includes('ean_13') || supported.includes('ean-13') || supported.includes('ean_8');
    } catch (e) {
      return false;
    }
  },

  getSupportedBarcodeFormats() {
    if (typeof Html5QrcodeSupportedFormats === 'undefined') return undefined;
    const names = [
      'EAN_13', 'EAN_8', 'UPC_A', 'UPC_E',
      'CODE_128', 'CODE_39', 'ITF', 'QR_CODE'
    ];
    return names
      .map(n => Html5QrcodeSupportedFormats[n])
      .filter(v => v !== undefined);
  },

  async openScanner() {
    // If WebRTC camera is blocked by browser (e.g. unencrypted HTTP on mobile):
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('WebRTC camera not supported in this context. Triggering native camera.');
      const homeNative = document.getElementById('home-native-camera-input');
      if (homeNative) {
        homeNative.click();
        return;
      }
    }

    const modal = document.getElementById('modal-scanner');
    const errorEl = document.getElementById('scanner-error-msg');
    if (errorEl) errorEl.style.display = 'none';
    if (modal) modal.style.display = 'flex';

    if (typeof Html5Qrcode === 'undefined') {
      this.showError('Модуль сканера загружается, пожалуйста подождите 2-3 секунды...');
      return;
    }

    try {
      if (this.html5QrCode && this.isScanning) {
        try { await this.html5QrCode.stop(); } catch (e) {}
      }

      this.initZXingReader();
      const useNativeDetector = await this.canUseNativeBarcodeDetector();
      const formats = this.getSupportedBarcodeFormats();

      this.html5QrCode = new Html5Qrcode('scanner-viewport', {
        verbose: false,
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: useNativeDetector
        },
        formatsToSupport: formats
      });

      const cameraChoice = { facingMode: this.currentFacingMode };

      const qrConfig = {
        fps: 24,
        videoConstraints: {
          facingMode: this.currentFacingMode,
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 },
          advanced: [{ focusMode: 'continuous' }]
        },
        disableFlip: false
      };

      await this.html5QrCode.start(
        cameraChoice,
        qrConfig,
        (decodedText) => {
          this.onScanSuccess(decodedText);
        },
        () => {}
      );

      this.isScanning = true;
      this.currentZoom = 1;

      // Start the multi-engine parallel scanner loop
      this.startActiveScanningLoop();

      setTimeout(() => this.initTrackCapabilities(), 400);
    } catch (err) {
      console.warn('Camera failed:', err);
      let msg = 'Не удалось запустить видеокамеру.';
      if (err && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
        msg = '⚠️ Доступ к камере запрещен в браузере. Разрешите доступ в настройках страницы или нажмите синюю кнопку «📸 Сделать четкое фото (штатная камера)» ниже.';
      } else {
        msg = '⚠️ Браузер не смог открыть видеопоток. Нажмите синюю кнопку «📸 Сделать четкое фото (штатная камера)» ниже — она гарантированно работает на любом смартфоне!';
      }
      this.showError(msg);
    }
  },

  startActiveScanningLoop() {
    this.stopActiveScanningLoop();

    // Check hardware native BarcodeDetector support safely
    if ('BarcodeDetector' in window && typeof BarcodeDetector.getSupportedFormats === 'function') {
      BarcodeDetector.getSupportedFormats().then(supported => {
        const wanted = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'qr_code'];
        const safeFormats = wanted.filter(f => supported.includes(f));
        if (safeFormats.length > 0) {
          try {
            this.detectorInstance = new BarcodeDetector({ formats: safeFormats });
          } catch (e) {
            this.detectorInstance = null;
          }
        }
      }).catch(() => {
        this.detectorInstance = null;
      });
    }

    const runLoop = async () => {
      if (!this.isScanning) return;
      const video = document.querySelector('#scanner-viewport video');

      if (video && video.readyState >= 2 && !video.paused && !video.ended) {
        const vw = video.videoWidth;
        const vh = video.videoHeight;

        // ENGINE 1: Hardware-Accelerated BarcodeDetector (Android Chrome)
        if (this.detectorInstance) {
          try {
            const barcodes = await this.detectorInstance.detect(video);
            if (barcodes && barcodes.length > 0) {
              for (const b of barcodes) {
                if (b.rawValue && isValidBarcode(b.rawValue)) {
                  this.onScanSuccess(b.rawValue);
                  return;
                }
              }
            }
          } catch (e) {}
        }

        // ENGINE 2: Direct High-Resolution Center Crop with ZXing
        // Captures crisp, un-squashed 1:1 pixel crop of the viewfinder box
        if (vw > 0 && vh > 0) {
          if (!this.scanCanvas) {
            this.scanCanvas = document.createElement('canvas');
            this.scanCtx = this.scanCanvas.getContext('2d', { willReadFrequently: true });
          }

          // Crop center 80% width x 60% height in native camera resolution
          const cropW = Math.round(vw * 0.82);
          const cropH = Math.round(vh * 0.62);
          const cropX = Math.round((vw - cropW) / 2);
          const cropY = Math.round((vh - cropH) / 2);

          this.scanCanvas.width = cropW;
          this.scanCanvas.height = cropH;
          this.scanCtx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

          const code = this.decodeCanvasWithZXing(this.scanCanvas);
          if (code && isValidBarcode(code)) {
            this.onScanSuccess(code);
            return;
          }

          // Tighter center crop for small / distant barcodes (50% size)
          const tightW = Math.round(vw * 0.52);
          const tightH = Math.round(vh * 0.45);
          const tightX = Math.round((vw - tightW) / 2);
          const tightY = Math.round((vh - tightH) / 2);
          this.scanCanvas.width = tightW;
          this.scanCanvas.height = tightH;
          this.scanCtx.drawImage(video, tightX, tightY, tightW, tightH, 0, 0, tightW, tightH);

          const tightCode = this.decodeCanvasWithZXing(this.scanCanvas);
          if (tightCode && isValidBarcode(tightCode)) {
            this.onScanSuccess(tightCode);
            return;
          }
        }

        // ENGINE 3: Specialized 1D Barcode Computer Vision (Quagga2 fallback)
        const now = Date.now();
        if (typeof Quagga !== 'undefined' && !this.quaggaBusy && (!this.lastQuaggaScanTime || now - this.lastQuaggaScanTime > 280)) {
          this.lastQuaggaScanTime = now;
          this.quaggaBusy = true;
          if (vw > 0 && vh > 0) {
            if (!this.auxCanvas) {
              this.auxCanvas = document.createElement('canvas');
              this.auxCtx = this.auxCanvas.getContext('2d', { willReadFrequently: true });
            }
            const scale = Math.min(1, 800 / Math.max(vw, vh));
            const targetW = Math.round(vw * scale);
            const targetH = Math.round(vh * scale);
            this.auxCanvas.width = targetW;
            this.auxCanvas.height = targetH;
            this.auxCtx.drawImage(video, 0, 0, targetW, targetH);

            Quagga.decodeSingle({
              src: this.auxCanvas.toDataURL('image/jpeg', 0.85),
              numOfWorkers: 0,
              decoder: {
                readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']
              },
              locate: true,
              locator: { halfSample: true, patchSize: 'medium' }
            }, (res) => {
              this.quaggaBusy = false;
              if (res && res.codeResult && res.codeResult.code) {
                const c = res.codeResult.code;
                if (isValidBarcode(c)) {
                  this.onScanSuccess(c);
                }
              }
            });
          } else {
            this.quaggaBusy = false;
          }
        }
      }

      if (this.isScanning) {
        this.scanLoopTimeout = setTimeout(runLoop, 65);
      }
    };

    this.scanLoopTimeout = setTimeout(runLoop, 250);
  },

  stopActiveScanningLoop() {
    if (this.scanLoopTimeout) {
      clearTimeout(this.scanLoopTimeout);
      this.scanLoopTimeout = null;
    }
    this.quaggaBusy = false;
  },

  async initTrackCapabilities() {
    try {
      const video = document.querySelector('#scanner-viewport video');
      if (video && video.srcObject) {
        const tracks = video.srcObject.getVideoTracks();
        if (tracks && tracks.length > 0) {
          this.videoTrack = tracks[0];
          const caps = this.videoTrack.getCapabilities ? this.videoTrack.getCapabilities() : {};

          // Apply Continuous Autofocus to video track
          if (caps.focusMode && (caps.focusMode.includes('continuous') || caps.focusMode.includes('auto'))) {
            try {
              await this.videoTrack.applyConstraints({
                advanced: [{ focusMode: 'continuous' }]
              });
            } catch (e) {}
          }

          // Check Torch support
          const torchBtn = document.getElementById('btn-toggle-torch');
          if (torchBtn) {
            torchBtn.style.display = caps.torch ? 'inline-flex' : 'none';
          }

          // Check Zoom support
          const zoomRow = document.getElementById('scanner-zoom-row');
          if (zoomRow) {
            zoomRow.style.display = 'flex';
          }
          this.hardwareZoomSupported = !!caps.zoom;

          // Reset active zoom button to 1x
          document.querySelectorAll('.btn-zoom').forEach(b => {
            b.classList.toggle('active', parseFloat(b.dataset.zoom) === 1);
          });
        }
      }
    } catch (e) {
      console.warn('Could not initialize track capabilities:', e);
    }
  },

  async triggerTapFocus(event) {
    const ring = document.getElementById('tap-focus-ring');
    const wrapper = document.getElementById('scanner-viewport-wrapper');
    if (ring && wrapper && event) {
      const rect = wrapper.getBoundingClientRect();
      const clientX = event.clientX !== undefined ? event.clientX : (event.touches && event.touches[0] ? event.touches[0].clientX : rect.width / 2);
      const clientY = event.clientY !== undefined ? event.clientY : (event.touches && event.touches[0] ? event.touches[0].clientY : rect.height / 2);
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.classList.remove('active');
      void ring.offsetWidth;
      ring.classList.add('active');
      setTimeout(() => ring.classList.remove('active'), 600);
    }

    if (this.videoTrack) {
      try {
        const caps = this.videoTrack.getCapabilities ? this.videoTrack.getCapabilities() : {};
        if (caps.focusMode) {
          if (caps.focusMode.includes('auto')) {
            await this.videoTrack.applyConstraints({
              advanced: [{ focusMode: 'auto' }]
            });
            setTimeout(async () => {
              if (caps.focusMode.includes('continuous')) {
                await this.videoTrack.applyConstraints({
                  advanced: [{ focusMode: 'continuous' }]
                }).catch(() => {});
              }
            }, 700);
          } else if (caps.focusMode.includes('continuous')) {
            await this.videoTrack.applyConstraints({
              advanced: [{ focusMode: 'continuous' }]
            });
          }
        }
      } catch (e) {
        console.warn('Tap focus error:', e);
      }
    }
  },

  async toggleTorch() {
    if (!this.videoTrack) return;
    try {
      this.isTorchOn = !this.isTorchOn;
      await this.videoTrack.applyConstraints({
        advanced: [{ torch: this.isTorchOn }]
      });
      const text = document.getElementById('torch-btn-text');
      if (text) text.textContent = this.isTorchOn ? 'Выкл' : 'Фонарик';
    } catch (e) {
      console.warn('Torch error:', e);
    }
  },

  async setZoom(level) {
    this.currentZoom = level;
    document.querySelectorAll('.btn-zoom').forEach(b => {
      b.classList.toggle('active', parseFloat(b.dataset.zoom) === level);
    });

    // 1. Hardware optical/sensor zoom if supported
    if (this.videoTrack && this.hardwareZoomSupported) {
      try {
        const caps = this.videoTrack.getCapabilities ? this.videoTrack.getCapabilities() : {};
        if (caps.zoom) {
          const minZ = caps.zoom.min || 1;
          const maxZ = caps.zoom.max || 3;
          const targetZoom = Math.min(Math.max(level, minZ), maxZ);
          await this.videoTrack.applyConstraints({
            advanced: [{ zoom: targetZoom }]
          });
          return;
        }
      } catch (e) {
        console.warn('Hardware zoom error:', e);
      }
    }

    // 2. High-quality CSS digital zoom fallback
    const video = document.querySelector('#scanner-viewport video');
    if (video) {
      video.style.transform = level > 1 ? `scale(${level})` : 'none';
      video.style.transformOrigin = 'center center';
      video.style.transition = 'transform 0.25s ease';
    }
  },

  async switchCamera() {
    if (!this.isScanning || !this.html5QrCode) return;
    try {
      this.stopActiveScanningLoop();
      await this.html5QrCode.stop();
      this.isScanning = false;
      this.currentFacingMode = this.currentFacingMode === 'environment' ? 'user' : 'environment';
      await this.openScanner();
    } catch (e) {
      console.warn('Could not switch camera:', e);
    }
  },

  playSuccessFeedback() {
    // 1. Tactile vibration
    if (navigator.vibrate) {
      try { navigator.vibrate([60, 40, 60]); } catch (e) {}
    }
    // 2. Audible cashier confirmation chime
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const actx = new AudioCtx();
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, actx.currentTime); // B5 note
        osc.frequency.setValueAtTime(1318.51, actx.currentTime + 0.08); // E6 note
        gain.gain.setValueAtTime(0.25, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.16);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + 0.16);
      }
    } catch (e) {}
    // 3. Visual frame flash
    const frame = document.querySelector('.scanner-frame');
    if (frame) {
      frame.style.borderColor = '#10b981';
      frame.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.9)';
    }
  },

  async closeScanner() {
    this.isScanning = false;
    this.stopActiveScanningLoop();

    if (this.html5QrCode) {
      try {
        if (this.isTorchOn && this.videoTrack) {
          try { await this.videoTrack.applyConstraints({ advanced: [{ torch: false }] }); } catch (e) {}
          this.isTorchOn = false;
        }
        await this.html5QrCode.stop();
      } catch (e) {
        console.warn('Scanner stop error:', e);
      }
      this.videoTrack = null;
    }

    const video = document.querySelector('#scanner-viewport video');
    if (video) video.style.transform = 'none';
    this.currentZoom = 1;

    const modal = document.getElementById('modal-scanner');
    if (modal) modal.style.display = 'none';
  },

  onScanSuccess(decodedText) {
    if (!decodedText || !this.isScanning) return;
    const clean = String(decodedText).trim();
    if (!isValidBarcode(clean)) {
      console.log('Ignored invalid barcode format:', clean);
      return;
    }
    this.isScanning = false;
    this.stopActiveScanningLoop();
    this.playSuccessFeedback();
    this.closeScanner();
    App.searchBarcode(clean);
  },

  async scanFromFile(file) {
    if (!file) return;
    try {
      UIController.showLoading(true, 'Распознавание штрихкода с фото...');

      // 1. Direct ZXing decoding from high-res image
      this.initZXingReader();
      const img = new Image();
      const fileUrl = URL.createObjectURL(file);
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = fileUrl;
      });

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = img.naturalWidth || img.width;
      tempCanvas.height = img.naturalHeight || img.height;
      const tctx = tempCanvas.getContext('2d');
      tctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(fileUrl);

      const zxingCode = this.decodeCanvasWithZXing(tempCanvas);
      if (zxingCode && isValidBarcode(zxingCode)) {
        UIController.showLoading(false);
        this.playSuccessFeedback();
        this.closeScanner();
        App.searchBarcode(zxingCode);
        return;
      }

      // 2. Try Quagga decodeSingle on canvas
      if (typeof Quagga !== 'undefined') {
        const quaggaCode = await new Promise((resolve) => {
          Quagga.decodeSingle({
            src: tempCanvas.toDataURL('image/jpeg', 0.9),
            numOfWorkers: 0,
            decoder: {
              readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']
            },
            locate: true
          }, (res) => {
            resolve(res && res.codeResult ? res.codeResult.code : null);
          });
        });

        if (quaggaCode && isValidBarcode(quaggaCode)) {
          UIController.showLoading(false);
          this.playSuccessFeedback();
          this.closeScanner();
          App.searchBarcode(quaggaCode);
          return;
        }
      }

      // 3. Try native BarcodeDetector on image if supported
      if ('BarcodeDetector' in window) {
        try {
          const detector = new BarcodeDetector({
            formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'itf', 'qr_code']
          });
          const imgBitmap = await createImageBitmap(file);
          const detected = await detector.detect(imgBitmap);
          if (detected && detected.length > 0 && detected[0].rawValue && isValidBarcode(detected[0].rawValue)) {
            UIController.showLoading(false);
            this.playSuccessFeedback();
            this.closeScanner();
            App.searchBarcode(detected[0].rawValue);
            return;
          }
        } catch (bde) {}
      }

      // 4. Fallback to Html5Qrcode ZXing file scan
      if (!this.html5QrCode) {
        this.html5QrCode = new Html5Qrcode('scanner-viewport', {
          experimentalFeatures: { useBarCodeDetectorIfSupported: false },
          formatsToSupport: this.getSupportedBarcodeFormats()
        });
      }
      const decodedResult = await this.html5QrCode.scanFileV2(file);
      UIController.showLoading(false);
      this.closeScanner();
      if (decodedResult && decodedResult.decodedText && isValidBarcode(decodedResult.decodedText)) {
        this.playSuccessFeedback();
        App.searchBarcode(decodedResult.decodedText);
      } else {
        UIController.showToast(I18N.t('toast_barcode_invalid'), 'error');
      }
    } catch (err) {
      UIController.showLoading(false);
      this.showError('Не удалось распознать штрихкод на этом фото. Попробуйте сфотографировать ровнее при хорошем освещении.');
    }
  },

  showError(msg) {
    const errEl = document.getElementById('scanner-error-msg');
    if (errEl) {
      errEl.textContent = msg;
      errEl.style.display = 'block';
    }
  }
};


/* ==============================================================================
   7b. MOBILE PAIRING CONTROLLER (Dynamic Cloudflare Tunnel & QR Code)
   ============================================================================== */
const MobilePairingController = {
  qrCodeInstance: null,
  pollTimer: null,
  currentUrl: null,
  currentRenderedUrl: null,

  async open() {
    const modal = document.getElementById('modal-qr');
    if (!modal) return;
    modal.style.display = 'flex';
    await this.fetchAndRender();
    this.startPolling();
  },

  close() {
    const modal = document.getElementById('modal-qr');
    if (modal) modal.style.display = 'none';
    this.stopPolling();
  },

  startPolling() {
    this.stopPolling();
    this.pollTimer = setInterval(() => {
      this.fetchAndRender();
    }, 2500);
  },

  stopPolling() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  },

  async fetchAndRender() {
    const statusBadge = document.getElementById('qr-status-badge');
    const statusText = document.getElementById('qr-status-text');
    const statusDot = document.getElementById('qr-status-dot');
    const linkDisplay = document.getElementById('qr-link-display');

    try {
      const resp = await fetch(`tunnel_info.json?_t=${Date.now()}`);
      if (!resp.ok) throw new Error('tunnel_info.json not ready');
      const data = await resp.json();

      let targetUrl = null;
      if (data && data.active && data.tunnel_url) {
        targetUrl = data.tunnel_url;
        if (statusBadge) {
          statusBadge.style.background = '#ecfdf5';
          statusBadge.style.borderColor = '#a7f3d0';
          statusBadge.style.color = '#065f46';
        }
        if (statusDot) statusDot.style.background = '#10b981';
        if (statusText) statusText.textContent = '🟢 Защищенный HTTPS-канал активен';
      } else if (data && data.local_ip) {
        targetUrl = data.local_ip;
        if (statusBadge) {
          statusBadge.style.background = '#fffbeb';
          statusBadge.style.borderColor = '#fde68a';
          statusBadge.style.color = '#92400e';
        }
        if (statusDot) statusDot.style.background = '#f59e0b';
        if (statusText) statusText.textContent = '🟡 Подключение по Wi-Fi (без HTTPS)';
      }

      if (targetUrl) {
        this.currentUrl = targetUrl;
        if (linkDisplay) linkDisplay.textContent = targetUrl;
        this.renderQrCode(targetUrl);
      } else {
        if (linkDisplay) linkDisplay.textContent = 'Ожидание создания туннеля...';
      }
    } catch (e) {
      if (linkDisplay && !this.currentUrl) {
        linkDisplay.textContent = 'Запустите run.bat для создания ссылки';
      }
    }
  },

  renderQrCode(url) {
    const qrTarget = document.getElementById('qr-code-target');
    if (!qrTarget) return;

    if (this.currentRenderedUrl === url) return;
    this.currentRenderedUrl = url;

    qrTarget.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
      try {
        new QRCode(qrTarget, {
          text: url,
          width: 216,
          height: 216,
          colorDark: '#0f172a',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.M
        });
        return;
      } catch (err) {
        console.warn('QRCode generation failed:', err);
      }
    }

    // Fallback image
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=216x216&data=${encodeURIComponent(url)}`;
    img.style.width = '216px';
    img.style.height = '216px';
    img.style.display = 'block';
    qrTarget.appendChild(img);
  },

  copyLink() {
    if (!this.currentUrl) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(this.currentUrl).then(() => {
        UIController.showToast('Ссылка скопирована в буфер обмена!', 'success');
      }).catch(() => {
        UIController.showToast(this.currentUrl, 'info');
      });
    } else {
      UIController.showToast(this.currentUrl, 'info');
    }
  }
};


/* ==============================================================================
   8. UI CONTROLLER & VIEW ROUTER
   ============================================================================== */
const UIController = {
  views: ['view-home', 'view-product', 'view-not-found', 'view-add-product'],

  showView(viewId) {
    AppState.currentView = viewId;
    this.views.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === viewId) {
          el.style.display = 'flex';
          el.classList.add('active');
        } else {
          el.style.display = 'none';
          el.classList.remove('active');
        }
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  showLoading(show, message) {
    const overlay = document.getElementById('loading-overlay');
    const textEl = document.getElementById('loading-text');
    if (!overlay) return;
    if (show) {
      if (textEl) textEl.textContent = message || I18N.t('loading_search');
      overlay.style.display = 'flex';
    } else {
      overlay.style.display = 'none';
    }
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3600);
  },

  /**
   * Renders the 100-Point Scientific Health Score Card
   * @param {object} health
   */
  renderHealthScore(health) {
    const card = document.getElementById('product-health-card');
    if (!card) return;

    const valEl = document.getElementById('health-score-val');
    const circleEl = document.getElementById('health-score-circle');
    const badgeEl = document.getElementById('health-grade-badge');
    const headlineEl = document.getElementById('health-score-headline');
    const summaryEl = document.getElementById('health-score-summary');
    const barFillEl = document.getElementById('health-bar-fill');
    const needleEl = document.getElementById('health-bar-needle');
    const factorsEl = document.getElementById('health-score-factors');

    if (!health || health.score === null) {
      if (valEl) {
        valEl.textContent = '—';
        valEl.style.color = '#94a3b8';
      }
      if (circleEl) {
        circleEl.style.strokeDashoffset = '251.327';
        circleEl.style.stroke = '#94a3b8';
      }
      if (badgeEl) {
        badgeEl.textContent = I18N.t('score_grade_nodata');
        badgeEl.className = 'score-grade-badge grade-nodata';
        badgeEl.style.background = '#94a3b8';
      }
      if (headlineEl) headlineEl.textContent = I18N.t('score_headline_nodata');
      if (summaryEl) summaryEl.textContent = I18N.t('score_summary_nodata');
      if (barFillEl) barFillEl.style.width = '0%';
      if (needleEl) needleEl.style.left = '0%';
      if (factorsEl) factorsEl.innerHTML = '';
      return;
    }

    // Circumference = 2 * PI * 40 = 251.327
    const circumference = 251.327;
    const progressOffset = circumference - (health.score / 100) * circumference;

    if (valEl) {
      valEl.textContent = health.score;
      valEl.style.color = health.color;
    }

    if (circleEl) {
      circleEl.style.stroke = health.color;
      circleEl.style.strokeDashoffset = `${progressOffset}`;
    }

    if (badgeEl) {
      badgeEl.textContent = I18N.t(health.labelKey);
      badgeEl.className = `score-grade-badge grade-${health.grade}`;
      badgeEl.style.background = health.color;
    }

    if (headlineEl) {
      headlineEl.textContent = health.headline || I18N.t(health.labelKey);
    }

    if (summaryEl) {
      summaryEl.textContent = health.summary || '';
    }

    if (barFillEl) {
      barFillEl.style.width = `${health.score}%`;
      barFillEl.style.backgroundColor = health.color;
    }

    if (needleEl) {
      needleEl.style.left = `${health.score}%`;
    }

    // Render positive and negative factors
    if (factorsEl) {
      const items = [];

      if (health.positives && health.positives.length > 0) {
        health.positives.forEach(item => {
          items.push(`
            <div class="score-factor-chip factor-pos">
              <span class="factor-icon">${item.icon}</span>
              <span class="factor-text">${escapeHtml(item.text)}</span>
            </div>
          `);
        });
      }

      if (health.negatives && health.negatives.length > 0) {
        health.negatives.forEach(item => {
          items.push(`
            <div class="score-factor-chip factor-neg">
              <span class="factor-icon">${item.icon}</span>
              <span class="factor-text">${escapeHtml(item.text)}</span>
            </div>
          `);
        });
      }

      factorsEl.innerHTML = items.join('');
    }
  },

  /**
   * Renders product detail view
   * Requirement #4: Do not display empty fields.
   */
  renderProduct(product) {
    // 1. Source badge (Verified Open Food Facts vs User Local)
    const sourceBadge = document.getElementById('product-source-badge');
    if (sourceBadge) {
      if (product.verified) {
        sourceBadge.textContent = I18N.t('verified_badge');
        sourceBadge.className = 'badge badge-verified';
      } else {
        sourceBadge.textContent = I18N.t('user_badge');
        sourceBadge.className = 'badge badge-unverified';
      }
    }

    // 2. Title & Brand
    const nameEl = document.getElementById('product-name');
    if (nameEl) nameEl.textContent = product.name || 'Без названия';

    const brandEl = document.getElementById('product-brand');
    if (brandEl) {
      if (product.brand) {
        brandEl.textContent = product.brand;
        brandEl.style.display = 'block';
      } else {
        brandEl.style.display = 'none';
      }
    }

    // 3. Barcode & GS1 Origin badge
    const barcodeVal = document.getElementById('product-barcode-val');
    if (barcodeVal) barcodeVal.textContent = product.barcode;

    const originBadge = document.getElementById('product-origin-badge');
    if (originBadge) {
      const gs1Info = GS1.detectCountry(product.barcode);
      if (gs1Info) {
        originBadge.textContent = `${gs1Info.flag} ${gs1Info.name}`;
        originBadge.style.display = 'inline-block';
      } else if (product.country) {
        originBadge.textContent = `📍 ${product.country}`;
        originBadge.style.display = 'inline-block';
      } else {
        originBadge.style.display = 'none';
      }
    }

    // 4. Product Image
    const imgEl = document.getElementById('product-img');
    const fallbackEl = document.getElementById('product-img-fallback');
    if (product.image) {
      imgEl.src = product.image;
      imgEl.style.display = 'block';
      fallbackEl.style.display = 'none';
      imgEl.onerror = () => {
        imgEl.style.display = 'none';
        fallbackEl.style.display = 'flex';
      };
    } else {
      imgEl.style.display = 'none';
      fallbackEl.style.display = 'flex';
    }

    // 5. 100-Point Health Score & Product Rating Indicator
    const healthData = EVALUATOR.calculateHealthScore(product);
    this.renderHealthScore(healthData);

    const ratingObj = EVALUATOR.calculateRating(product);
    const ratingBadge = document.getElementById('rating-badge');
    if (ratingBadge) {
      ratingBadge.textContent = I18N.t(ratingObj.labelKey);
      ratingBadge.className = `rating-badge ${ratingObj.classname}`;
    }

    // 6. "Easy to understand" section
    const insightsContainer = document.getElementById('easy-insights-container');
    if (insightsContainer) {
      const insights = EVALUATOR.generateInsights(product);
      insightsContainer.innerHTML = insights.map(item => `
        <div class="insight-card level-${item.level}">
          <div class="insight-icon">${item.icon}</div>
          <div>
            <div class="insight-title">${escapeHtml(item.title)}</div>
            <div class="insight-desc">${escapeHtml(item.desc)}</div>
          </div>
        </div>
      `).join('');
    }

    // 7. Nutrition Grid (DO NOT display empty fields!)
    const nutritionGrid = document.getElementById('nutrition-grid');
    if (nutritionGrid) {
      const cells = [];

      // Calories
      if (product.calories !== null && product.calories !== undefined) {
        cells.push(`
          <div class="nutr-cell cell-primary">
            <span class="nutr-label">${I18N.t('nutr_calories')}</span>
            <div class="nutr-value">${product.calories} <span class="nutr-unit">ккал</span></div>
          </div>
        `);
      }

      // Protein
      if (product.protein !== null && product.protein !== undefined) {
        cells.push(`
          <div class="nutr-cell">
            <span class="nutr-label">${I18N.t('nutr_protein')}</span>
            <div class="nutr-value">${product.protein} <span class="nutr-unit">г</span></div>
          </div>
        `);
      }

      // Fat
      if (product.fat !== null && product.fat !== undefined) {
        cells.push(`
          <div class="nutr-cell">
            <span class="nutr-label">${I18N.t('nutr_fat')}</span>
            <div class="nutr-value">${product.fat} <span class="nutr-unit">г</span></div>
          </div>
        `);
      }

      // Saturated fat
      if (product.saturated_fat !== null && product.saturated_fat !== undefined) {
        cells.push(`
          <div class="nutr-cell">
            <span class="nutr-label">${I18N.t('nutr_satfat')}</span>
            <div class="nutr-value">${product.saturated_fat} <span class="nutr-unit">г</span></div>
          </div>
        `);
      }

      // Carbohydrates
      if (product.carbohydrates !== null && product.carbohydrates !== undefined) {
        cells.push(`
          <div class="nutr-cell">
            <span class="nutr-label">${I18N.t('nutr_carbs')}</span>
            <div class="nutr-value">${product.carbohydrates} <span class="nutr-unit">г</span></div>
          </div>
        `);
      }

      // Sugar
      if (product.sugar !== null && product.sugar !== undefined) {
        cells.push(`
          <div class="nutr-cell">
            <span class="nutr-label">${I18N.t('nutr_sugar')}</span>
            <div class="nutr-value">${product.sugar} <span class="nutr-unit">г</span></div>
          </div>
        `);
      }

      // Salt
      if (product.salt !== null && product.salt !== undefined) {
        cells.push(`
          <div class="nutr-cell">
            <span class="nutr-label">${I18N.t('nutr_salt')}</span>
            <div class="nutr-value">${product.salt} <span class="nutr-unit">г</span></div>
          </div>
        `);
      }

      if (cells.length > 0) {
        nutritionGrid.innerHTML = cells.join('');
        document.querySelector('.nutrition-card').style.display = 'block';
      } else {
        document.querySelector('.nutrition-card').style.display = 'none';
      }
    }

    // 8. Ingredients
    const ingSection = document.getElementById('section-ingredients');
    const ingText = document.getElementById('product-ingredients-text');
    if (ingSection && ingText) {
      if (product.ingredients && product.ingredients.trim()) {
        ingText.textContent = product.ingredients;
        ingSection.style.display = 'block';
      } else {
        ingSection.style.display = 'none';
      }
    }

    // 9. Allergens
    const allSection = document.getElementById('section-allergens');
    const allContainer = document.getElementById('allergens-chips');
    if (allSection && allContainer) {
      if (Array.isArray(product.allergens) && product.allergens.length > 0) {
        allContainer.innerHTML = product.allergens.map(a => `
          <span class="allergen-chip">⚠️ ${escapeHtml(a)}</span>
        `).join('');
        allSection.style.display = 'block';
      } else {
        allContainer.innerHTML = `<span class="allergen-chip no-allergens">✓ ${I18N.t('allergens_none')}</span>`;
        allSection.style.display = 'block';
      }
    }

    // 10. Origin and Manufacturer details
    const detSection = document.getElementById('section-details');
    const detList = document.getElementById('product-details-list');
    if (detSection && detList) {
      const rows = [];
      if (product.country) {
        rows.push(`<div class="detail-row"><span class="detail-key">${I18N.t('country_label')}</span><span class="detail-val">${escapeHtml(product.country)}</span></div>`);
      }
      if (product.manufacturer) {
        rows.push(`<div class="detail-row"><span class="detail-key">${I18N.t('manufacturer_label')}</span><span class="detail-val">${escapeHtml(product.manufacturer)}</span></div>`);
      }
      rows.push(`<div class="detail-row"><span class="detail-key">${I18N.t('barcode_label')}</span><span class="detail-val">${escapeHtml(product.barcode)}</span></div>`);

      detList.innerHTML = rows.join('');
      detSection.style.display = 'block';
    }

    // 11. Healthier Alternatives (Requirement 1)
    this.renderAlternatives(product);

    // 12. Official Product Information (Requirement 3: Official Data)
    this.renderOfficialInfo(product);

    // 13. Information Source & Transparency (Requirement 3: Provenance & Disclaimer)
    this.renderDataSource(product);

    // Switch view
    this.showView('view-product');
  },

  /**
   * Requirement 1: Render Healthier Alternatives
   * @param {object} product 
   */
  async renderAlternatives(product) {
    const section = document.getElementById('section-alternatives');
    const loadingEl = document.getElementById('alternatives-loading');
    const emptyEl = document.getElementById('alternatives-empty');
    const listEl = document.getElementById('alternatives-list');
    if (!section || !listEl) return;

    section.style.display = 'block';
    if (loadingEl) loadingEl.style.display = 'flex';
    if (emptyEl) emptyEl.style.display = 'none';
    listEl.innerHTML = '';

    try {
      const alternatives = await findHealthierAlternatives(product);
      if (loadingEl) loadingEl.style.display = 'none';

      if (!alternatives || alternatives.length === 0) {
        if (emptyEl) emptyEl.style.display = 'flex';
        return;
      }

      listEl.innerHTML = alternatives.map(alt => {
        const scoreObj = EVALUATOR.calculateHealthScore(alt);
        const score = scoreObj.score !== null ? scoreObj.score : '--';
        const color = scoreObj.color || '#10b981';

        const reasonsHtml = (alt.reasons || []).map(r => `
          <span class="alt-reason-chip chip-${escapeHtml(r.type)}">${escapeHtml(r.icon)} ${escapeHtml(r.text)}</span>
        `).join('');

        const imgHtml = alt.image 
          ? `<img src="${escapeHtml(alt.image)}" class="alt-item-thumb" alt="${escapeHtml(alt.name)}" loading="lazy" onerror="this.outerHTML='<div class=\\'alt-item-thumb-fallback\\'>🥗</div>'">`
          : `<div class="alt-item-thumb-fallback">🥗</div>`;

        return `
          <div class="alt-item-card" data-barcode="${escapeHtml(alt.barcode)}">
            <div class="alt-item-main">
              ${imgHtml}
              <div class="alt-item-info">
                <div class="alt-item-name">${escapeHtml(alt.name)}</div>
                <div class="alt-item-brand">${escapeHtml(alt.brand || alt.country || '')}</div>
              </div>
              <div class="alt-item-score" style="background:${color}18; color:${color}; border: 1.5px solid ${color}40;">
                <span>${score}</span>
                <small>/100</small>
              </div>
            </div>
            ${reasonsHtml ? `<div class="alt-reasons-row">${reasonsHtml}</div>` : ''}
          </div>
        `;
      }).join('');

      // Add click listeners to alternative cards (clicking alternative opens its details page)
      listEl.querySelectorAll('.alt-item-card').forEach(card => {
        card.addEventListener('click', () => {
          const barcode = card.getAttribute('data-barcode');
          if (barcode) {
            App.searchBarcode(barcode);
          }
        });
      });

    } catch (err) {
      console.warn('Failed to load alternatives:', err);
      if (loadingEl) loadingEl.style.display = 'none';
      if (emptyEl) emptyEl.style.display = 'flex';
    }
  },

  /**
   * Requirement 3: Official Product Information
   * Shows official certs/EAC/Halal only if present in data, otherwise polite fallback.
   * @param {object} product 
   */
  renderOfficialInfo(product) {
    const container = document.getElementById('official-info-content');
    if (!container) return;

    const certs = product.official_certs || [];
    if (certs.length === 0) {
      container.innerHTML = `
        <div class="official-cert-empty">
          <span class="empty-cert-icon">ℹ️</span>
          <div>
            <p>${I18N.t('official_cert_empty')}</p>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = certs.map(c => `
      <div class="official-cert-item">
        <div class="official-cert-title">
          <span>📜</span>
          <span>${escapeHtml(c.type)}</span>
        </div>
        <div class="official-cert-meta">
          <div><strong>${I18N.t('official_cert_label_type')}</strong> ${escapeHtml(c.name || c.type)}</div>
          ${c.issuer ? `<div><strong>${I18N.t('official_cert_label_issuer')}</strong> ${escapeHtml(c.issuer)}</div>` : ''}
          ${c.number ? `<div><strong>${I18N.t('official_cert_label_num')}</strong> ${escapeHtml(c.number)}</div>` : ''}
        </div>
        ${c.url ? `<a href="${escapeHtml(c.url)}" target="_blank" rel="noopener" class="official-cert-link">${I18N.t('official_cert_view_doc')}</a>` : ''}
      </div>
    `).join('');
  },

  /**
   * Requirement 3: Data Source, Transparency & Disclaimer
   * @param {object} product 
   */
  renderDataSource(product) {
    const originEl = document.getElementById('source-origin-val');
    const statusEl = document.getElementById('source-status-val');
    const updatedEl = document.getElementById('source-updated-val');

    if (originEl) {
      if (product.source === 'user_local') {
        originEl.textContent = 'Qoldau Food (Пользователь / Пайдаланушы)';
      } else if (product.source === 'local_verified') {
        originEl.textContent = 'Qoldau Food (Казахстан)';
      } else {
        originEl.textContent = 'Open Food Facts (Global Database)';
      }
    }

    if (statusEl) {
      if (product.source === 'user_local') {
        statusEl.textContent = I18N.t('status_user_local');
        statusEl.style.background = '#fef3c7';
        statusEl.style.color = '#92400e';
      } else if (product.source === 'local_verified') {
        statusEl.textContent = I18N.t('status_local_verified');
        statusEl.style.background = '#d1fae5';
        statusEl.style.color = '#065f46';
      } else {
        statusEl.textContent = I18N.t('status_community');
        statusEl.style.background = '#e0f2fe';
        statusEl.style.color = '#0369a1';
      }
    }

    if (updatedEl) {
      if (product.last_modified_t) {
        const date = new Date(product.last_modified_t * 1000);
        const locale = I18N.currentLang === 'kk' ? 'kk-KZ' : (I18N.currentLang === 'ru' ? 'ru-RU' : 'en-US');
        updatedEl.textContent = date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
      } else if (product.submittedAt) {
        const date = new Date(product.submittedAt);
        const locale = I18N.currentLang === 'kk' ? 'kk-KZ' : (I18N.currentLang === 'ru' ? 'ru-RU' : 'en-US');
        updatedEl.textContent = date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
      } else {
        updatedEl.textContent = '—';
      }
    }
  },

  /**
   * Requirement 2: Render Search Results List for Name Search
   * @param {Array<object>} results 
   * @param {string} query 
   */
  renderSearchResults(results, query) {
    const section = document.getElementById('search-results-section');
    const loadingEl = document.getElementById('search-results-loading');
    const emptyEl = document.getElementById('search-results-empty');
    const errorEl = document.getElementById('search-results-error');
    const listEl = document.getElementById('search-results-list');
    const countEl = document.getElementById('search-results-count');

    if (!section || !listEl) return;
    section.style.display = 'block';

    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';

    if (!results || results.length === 0) {
      if (emptyEl) emptyEl.style.display = 'flex';
      listEl.innerHTML = '';
      if (countEl) countEl.textContent = '0';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (countEl) countEl.textContent = String(results.length);

    listEl.innerHTML = results.map(item => {
      const scoreObj = EVALUATOR.calculateHealthScore(item);
      const score = scoreObj.score !== null ? scoreObj.score : '--';
      const color = scoreObj.color || '#94a3b8';

      const imgHtml = item.image
        ? `<img src="${escapeHtml(item.image)}" class="search-result-thumb" alt="${escapeHtml(item.name)}" loading="lazy" onerror="this.outerHTML='<div class=\\'search-result-thumb-fallback\\'>🥗</div>'">`
        : `<div class="search-result-thumb-fallback">🥗</div>`;

      return `
        <div class="search-result-card" data-barcode="${escapeHtml(item.barcode)}">
          ${imgHtml}
          <div class="search-result-info">
            <div class="search-result-name">${escapeHtml(item.name)}</div>
            <div class="search-result-meta">
              <span>${escapeHtml(item.brand || item.country || '—')}</span>
              <span>•</span>
              <code>${escapeHtml(item.barcode)}</code>
            </div>
          </div>
          <div class="search-result-score-badge" style="background:${color}18; color:${color}; border: 1.5px solid ${color}40;">
            <span>${score}</span>
            <small>/100</small>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards (opens Product Details)
    listEl.querySelectorAll('.search-result-card').forEach(card => {
      card.addEventListener('click', () => {
        const barcode = card.getAttribute('data-barcode');
        if (barcode) {
          App.searchBarcode(barcode);
        }
      });
    });
  },

  showNotFound(barcode) {
    const codeDisplay = document.getElementById('not-found-barcode-display');
    if (codeDisplay) codeDisplay.textContent = barcode;
    AppState.pendingNotFoundBarcode = barcode;
    this.showView('view-not-found');
  },

  showAddForm(barcode) {
    const barcodeInput = document.getElementById('add-barcode');
    if (barcodeInput) barcodeInput.value = barcode || '';
    
    // Clear other inputs
    document.getElementById('add-name').value = '';
    document.getElementById('add-brand').value = '';
    document.getElementById('add-country').value = 'Казахстан';
    document.getElementById('add-ingredients').value = '';
    document.getElementById('add-allergens').value = '';
    document.getElementById('add-calories').value = '';
    document.getElementById('add-protein').value = '';
    document.getElementById('add-fat').value = '';
    document.getElementById('add-satfat').value = '';
    document.getElementById('add-carbs').value = '';
    document.getElementById('add-sugar').value = '';
    document.getElementById('add-salt').value = '';

    // Reset photo
    AppState.tempAddPhotoDataUrl = '';
    const previewWrap = document.getElementById('add-photo-preview-wrap');
    if (previewWrap) previewWrap.style.display = 'none';

    this.showView('view-add-product');
  }
};


/* ==============================================================================
   9. GLOBAL APPLICATION CONTROLLER (APP)
   ============================================================================== */
const AppState = {
  currentView: 'view-home',
  currentProduct: null,
  pendingNotFoundBarcode: '',
  tempAddPhotoDataUrl: ''
};

const App = {
  init() {
    I18N.init();
    HistoryManager.render();
    this.attachEventListeners();
  },

  /**
   * Primary search workflow for both camera and manual input
   * @param {string} barcode 
   */
  async searchBarcode(barcode) {
    if (!barcode) return;
    const clean = String(barcode).trim().replace(/[\s-]/g, '');

    if (!isValidBarcode(clean)) {
      UIController.showToast(I18N.t('toast_barcode_invalid'), 'error');
      return;
    }

    UIController.showLoading(true);

    try {
      const result = await getProductByBarcode(clean);
      UIController.showLoading(false);

      if (result.error === 'network_error') {
        UIController.showToast(I18N.t('toast_network_error'), 'error');
        return;
      }

      if (result.found && result.product) {
        AppState.currentProduct = result.product;
        HistoryManager.add(result.product);
        UIController.renderProduct(result.product);
      } else {
        UIController.showNotFound(clean);
      }
    } catch (err) {
      UIController.showLoading(false);
      console.error('Search error:', err);
      UIController.showToast(err.message || 'Ошибка поиска', 'error');
    }
  },

  attachEventListeners() {
    // 1. Language selector
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        I18N.setLanguage(e.target.value);
      });
    }

    // 2. Logo click -> Home
    const logo = document.getElementById('header-logo');
    if (logo) {
      logo.addEventListener('click', () => {
        UIController.showView('view-home');
      });
    }

    // 2b. Mobile QR Modal Controls (Dynamic Cloudflare Tunnel & QR code)
    const btnShowQr = document.getElementById('btn-show-qr');
    const btnCloseQr = document.getElementById('btn-close-qr');
    const backdropQr = document.getElementById('backdrop-qr');
    const btnCopyQr = document.getElementById('btn-copy-qr-link');

    if (btnShowQr) {
      btnShowQr.addEventListener('click', () => {
        MobilePairingController.open();
      });
    }
    if (btnCloseQr) {
      btnCloseQr.addEventListener('click', () => {
        MobilePairingController.close();
      });
    }
    if (backdropQr) {
      backdropQr.addEventListener('click', () => {
        MobilePairingController.close();
      });
    }
    if (btnCopyQr) {
      btnCopyQr.addEventListener('click', () => {
        MobilePairingController.copyLink();
      });
    }

    // 3. Scanner Open Button
    const btnScan = document.getElementById('btn-open-scanner');
    if (btnScan) {
      btnScan.addEventListener('click', () => {
        ScannerController.openScanner();
      });
    }

    // 4. Scanner Modal Controls
    const btnCloseScanner = document.getElementById('btn-close-scanner');
    if (btnCloseScanner) {
      btnCloseScanner.addEventListener('click', () => {
        ScannerController.closeScanner();
      });
    }

    const btnFlipCam = document.getElementById('btn-switch-camera');
    if (btnFlipCam) {
      btnFlipCam.addEventListener('click', () => {
        ScannerController.switchCamera();
      });
    }

    const scannerFileInput = document.getElementById('scanner-file-input');
    if (scannerFileInput) {
      scannerFileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) ScannerController.scanFromFile(file);
      });
    }

    // Native Camera Snap button handler (100% sharp autofocus via native camera app)
    const scannerNativeSnap = document.getElementById('scanner-native-snap');
    if (scannerNativeSnap) {
      scannerNativeSnap.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) ScannerController.scanFromFile(file);
      });
    }

    // Home screen native camera button handler
    const homeNativeCamInput = document.getElementById('home-native-camera-input');
    if (homeNativeCamInput) {
      homeNativeCamInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) ScannerController.scanFromFile(file);
      });
    }

    // Torch Toggle
    const btnTorch = document.getElementById('btn-toggle-torch');
    if (btnTorch) {
      btnTorch.addEventListener('click', () => {
        ScannerController.toggleTorch();
      });
    }

    // Zoom Buttons
    document.querySelectorAll('.btn-zoom').forEach(btn => {
      btn.addEventListener('click', () => {
        const z = parseFloat(btn.getAttribute('data-zoom'));
        if (!isNaN(z)) ScannerController.setZoom(z);
      });
    });

    // Tap-to-focus on scanner viewfinder
    const viewportWrapper = document.getElementById('scanner-viewport-wrapper');
    if (viewportWrapper) {
      viewportWrapper.addEventListener('click', (e) => {
        ScannerController.triggerTapFocus(e);
      });
    }

    // 5. Manual Barcode Search Form
    const searchForm = document.getElementById('form-manual-search');
    const barcodeInput = document.getElementById('input-barcode');
    const clearInputBtn = document.getElementById('btn-clear-input');

    if (barcodeInput && clearInputBtn) {
      barcodeInput.addEventListener('input', () => {
        clearInputBtn.style.display = barcodeInput.value.length > 0 ? 'block' : 'none';
      });
      clearInputBtn.addEventListener('click', () => {
        barcodeInput.value = '';
        clearInputBtn.style.display = 'none';
        barcodeInput.focus();
      });
    }

    if (searchForm && barcodeInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = barcodeInput.value;
        if (code) App.searchBarcode(code);
      });
    }

    // 5b. Search Mode Tabs Switcher (Barcode vs Name - Requirement 2)
    const tabBarcode = document.getElementById('tab-search-barcode');
    const tabName = document.getElementById('tab-search-name');
    const panelBarcode = document.getElementById('panel-search-barcode');
    const panelName = document.getElementById('panel-search-name');
    const nameInput = document.getElementById('input-product-name');
    const clearNameInputBtn = document.getElementById('btn-clear-name-input');
    const nameSearchForm = document.getElementById('form-name-search');
    const btnCloseResults = document.getElementById('btn-close-results');
    const searchResultsSection = document.getElementById('search-results-section');

    const switchSearchTab = (mode) => {
      if (mode === 'name') {
        if (tabName) tabName.classList.add('active');
        if (tabBarcode) tabBarcode.classList.remove('active');
        if (panelName) { panelName.style.display = 'block'; panelName.classList.add('active'); }
        if (panelBarcode) { panelBarcode.style.display = 'none'; panelBarcode.classList.remove('active'); }
        if (nameInput) nameInput.focus();
      } else {
        if (tabBarcode) tabBarcode.classList.add('active');
        if (tabName) tabName.classList.remove('active');
        if (panelBarcode) { panelBarcode.style.display = 'block'; panelBarcode.classList.add('active'); }
        if (panelName) { panelName.style.display = 'none'; panelName.classList.remove('active'); }
        if (barcodeInput) barcodeInput.focus();
      }
    };

    if (tabBarcode) {
      tabBarcode.addEventListener('click', () => switchSearchTab('barcode'));
    }
    if (tabName) {
      tabName.addEventListener('click', () => switchSearchTab('name'));
    }

    // Name search input and clear button
    if (nameInput && clearNameInputBtn) {
      nameInput.addEventListener('input', () => {
        clearNameInputBtn.style.display = nameInput.value.length > 0 ? 'block' : 'none';
      });
      clearNameInputBtn.addEventListener('click', () => {
        nameInput.value = '';
        clearNameInputBtn.style.display = 'none';
        nameInput.focus();
        if (searchResultsSection) searchResultsSection.style.display = 'none';
      });
    }

    // Name search form submission (Requirement 2)
    if (nameSearchForm && nameInput) {
      nameSearchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = nameInput.value.trim();
        if (!query) return;

        // Show loading state
        const loadingEl = document.getElementById('search-results-loading');
        const emptyEl = document.getElementById('search-results-empty');
        const errorEl = document.getElementById('search-results-error');
        const listEl = document.getElementById('search-results-list');

        if (searchResultsSection) searchResultsSection.style.display = 'block';
        if (loadingEl) loadingEl.style.display = 'flex';
        if (emptyEl) emptyEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'none';
        if (listEl) listEl.innerHTML = '';

        try {
          const res = await searchProductsByName(query);
          if (res.success) {
            UIController.renderSearchResults(res.products, query);
          } else {
            if (loadingEl) loadingEl.style.display = 'none';
            if (errorEl) errorEl.style.display = 'flex';
          }
        } catch (err) {
          console.error('Name search failed:', err);
          if (loadingEl) loadingEl.style.display = 'none';
          if (errorEl) errorEl.style.display = 'flex';
        }
      });
    }

    // Quick Name Query Chips
    document.querySelectorAll('.name-sample-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-query');
        if (q && nameInput) {
          nameInput.value = q;
          if (clearNameInputBtn) clearNameInputBtn.style.display = 'block';
          if (nameSearchForm) {
            nameSearchForm.dispatchEvent(new Event('submit'));
          }
        }
      });
    });

    // Close Search Results Button
    if (btnCloseResults && searchResultsSection) {
      btnCloseResults.addEventListener('click', () => {
        searchResultsSection.style.display = 'none';
      });
    }

    // Search manually by name from Not Found screen (Requirement 2)
    const btnNotFoundSearchName = document.getElementById('btn-not-found-search-name');
    if (btnNotFoundSearchName) {
      btnNotFoundSearchName.addEventListener('click', () => {
        UIController.showView('view-home');
        switchSearchTab('name');
      });
    }

    // 6. Quick Sample Chips
    document.querySelectorAll('.chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const barcode = btn.getAttribute('data-barcode');
        if (barcode) {
          if (barcodeInput) barcodeInput.value = barcode;
          App.searchBarcode(barcode);
        }
      });
    });

    // 7. Clear History Button
    const btnClearHistory = document.getElementById('btn-clear-history');
    if (btnClearHistory) {
      btnClearHistory.addEventListener('click', () => {
        HistoryManager.clear();
      });
    }

    // 8. Product Navigation
    const btnBackHome = document.getElementById('btn-back-home');
    if (btnBackHome) {
      btnBackHome.addEventListener('click', () => {
        UIController.showView('view-home');
      });
    }

    const btnScanAnother = document.getElementById('btn-scan-another');
    if (btnScanAnother) {
      btnScanAnother.addEventListener('click', () => {
        UIController.showView('view-home');
        ScannerController.openScanner();
      });
    }

    // 9. Product Not Found Actions
    const btnNotFoundBack = document.getElementById('btn-not-found-back');
    if (btnNotFoundBack) {
      btnNotFoundBack.addEventListener('click', () => {
        UIController.showView('view-home');
      });
    }

    const btnOpenAddProduct = document.getElementById('btn-open-add-product');
    if (btnOpenAddProduct) {
      btnOpenAddProduct.addEventListener('click', () => {
        UIController.showAddForm(AppState.pendingNotFoundBarcode);
      });
    }

    // 10. Add Product Form Actions
    const btnCancelAdd = document.getElementById('btn-cancel-add');
    if (btnCancelAdd) {
      btnCancelAdd.addEventListener('click', () => {
        UIController.showView('view-home');
      });
    }

    const btnPickPhoto = document.getElementById('btn-pick-photo');
    const photoFileInput = document.getElementById('add-photo-file');
    const photoPreviewWrap = document.getElementById('add-photo-preview-wrap');
    const photoPreview = document.getElementById('add-photo-preview');
    const btnRemovePhoto = document.getElementById('btn-remove-photo');

    if (btnPickPhoto && photoFileInput) {
      btnPickPhoto.addEventListener('click', () => photoFileInput.click());
      photoFileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (re) => {
            AppState.tempAddPhotoDataUrl = re.target.result;
            photoPreview.src = re.target.result;
            photoPreviewWrap.style.display = 'block';
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (btnRemovePhoto) {
      btnRemovePhoto.addEventListener('click', () => {
        AppState.tempAddPhotoDataUrl = '';
        photoFileInput.value = '';
        photoPreviewWrap.style.display = 'none';
      });
    }

    const formCreate = document.getElementById('form-create-product');
    if (formCreate) {
      formCreate.addEventListener('submit', (e) => {
        e.preventDefault();
        const barcode = document.getElementById('add-barcode').value.trim();
        const name = document.getElementById('add-name').value.trim();
        const brand = document.getElementById('add-brand').value.trim();
        const country = document.getElementById('add-country').value.trim() || 'Казахстан';
        const ingredients = document.getElementById('add-ingredients').value.trim();
        const allergensRaw = document.getElementById('add-allergens').value.trim();
        const allergens = allergensRaw ? allergensRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

        const numVal = (id) => {
          const val = document.getElementById(id).value;
          return val === '' ? null : parseFloat(val);
        };

        const newProduct = {
          barcode,
          name,
          brand,
          country,
          image: AppState.tempAddPhotoDataUrl || '',
          ingredients,
          allergens,
          calories: numVal('add-calories'),
          protein: numVal('add-protein'),
          fat: numVal('add-fat'),
          saturated_fat: numVal('add-satfat'),
          carbohydrates: numVal('add-carbs'),
          sugar: numVal('add-sugar'),
          salt: numVal('add-salt'),
          manufacturer: brand ? `${brand} (${country})` : country,
          verified: false
        };

        LOCAL_DB.saveUserProduct(newProduct);
        UIController.showToast(I18N.t('toast_product_saved'), 'success');
        AppState.currentProduct = newProduct;
        HistoryManager.add(newProduct);
        UIController.renderProduct(newProduct);
      });
    }
  }
};

/**
 * Basic HTML escaping utility for safe rendering
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

