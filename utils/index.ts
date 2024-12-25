import { format, parseISO } from 'date-fns'

// 获取系统主题色
export const getSystemTheme = (): string => {
  console.log("⭐ ~ 当前打印的内容 ~ :", window);
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else {
    return 'light';
  }
}

// 根据文件名获取markdown文件内容 对应content目录下的文件
export async function getPosts(dirName: string) {
  try {
    const result = await queryContent(dirName).sort({ date: -1 }).find();
    return result
  } catch (e) {
    console.error(e)
    return []
  }
}
// 查询某个具体的文件内容
export async function getPost(dirName: string) {
  try {
    const result = await queryContent(dirName).findOne();
    return result
  } catch (e) {
    console.error(e)
    return {}
  }
}