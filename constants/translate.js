import I18n from 'react-native-i18n';
I18n.fallbacks = true;

I18n.translations = {
  en: {
    Home: 'Home',
    Peck: 'Peck',
    Infos: 'Info',
    'Settings': 'Settings',
    Account: 'Account',
    account_name: 'account_name', 
    privileged: 'privileged', 
    created: 'created', 
    last_code_update: 'last_code_update', 
    creator: 'creator',
    Asset: 'Asset',
    core_liquid_balance: 'core_liquid_balance', 
    net_weight: 'net_weight', 
    cpu_weight: 'cpu_weight',
    staked: 'staked', 
    unstaking: 'unstaking',
  },

  zh: {
    Home: '首页',
    Peck: '发现',
    Infos: '资讯',
    'Settings': '设置',
    Account: '账号',
    account_name: '账户名', 
    privileged: '特权', 
    created: '创建时间', 
    last_code_update: '最近代码更新', 
    creator: '创建者',
    Asset: '资产',
    core_liquid_balance: '可用余额',
    net_weight: 'Net 抵押', 
    cpu_weight: 'CPU 抵押',
    staked: '抵押给他人', 
    unstaking: '正在赎回',
  },
};

const translate = (text)=> I18n.t(text);

export default translate;
