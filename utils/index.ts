// 获取系统主题色
export const getSystemTheme = (): string => {
  console.log("⭐ ~ 当前打印的内容 ~ :", window);
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else {
    return 'light';
  }
}