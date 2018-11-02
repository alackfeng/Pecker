import I18n from 'react-native-i18n';
I18n.fallbacks = true;

I18n.translations = {
  en: {
    Home: 'Home',
    Peck: 'Peck',
    Infos: 'Info',
    'Settings': 'Settings',
  },

  zh: {
    Home: '首页',
    Peck: '发现',
    Infos: '资讯',
    'Settings': '设置',
  },
};

const translate = (text)=> I18n.t(text);

export default translate;
