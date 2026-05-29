import { getRequestConfig } from 'next-intl/server';

const messages = {
  en: () => import('./messages/en.json').then(module => module.default),
  hi: () => import('./messages/hi.json').then(module => module.default),
  te: () => import('./messages/te.json').then(module => module.default),
  ta: () => import('./messages/ta.json').then(module => module.default),
  ml: () => import('./messages/ml.json').then(module => module.default),
  kn: () => import('./messages/kn.json').then(module => module.default),
  mr: () => import('./messages/mr.json').then(module => module.default),
  gu: () => import('./messages/gu.json').then(module => module.default),
  bn: () => import('./messages/bn.json').then(module => module.default),
  or: () => import('./messages/or.json').then(module => module.default),
  pa: () => import('./messages/pa.json').then(module => module.default),
};

export default getRequestConfig(async ({ locale }) => ({
  messages: await messages[locale as keyof typeof messages]?.() || messages.en(),
}));
