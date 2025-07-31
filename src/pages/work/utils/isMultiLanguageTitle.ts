type MultiLanguage = { ko: string; en: string };

export const isMultiLanguageTitle = (title: string | MultiLanguage): title is MultiLanguage => {
  return typeof title !== 'string' && 'ko' in title && 'en' in title;
};
