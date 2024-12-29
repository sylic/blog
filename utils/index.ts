import { Page } from "@/config"

// 获取系统主题色
export const getSystemTheme = (): string => {
  console.log("⭐ ~ 当前打印的内容 ~ :", window);
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else {
    return 'light';
  }
}

// 根据文件名获取markdown文件内容 对应content目录下的文件 分页参数
export async function getPosts(dirName: string, pageNo: number = 1) {
  try {
    // console.log("⭐ ~ 当前打印的内容 ~ :", dirName, pageNo);
    const result = await queryContent(dirName).skip((pageNo - 1) * Page.pageSize).limit(Page.pageSize).sort({ date: -1 }).find();
    // console.log(result);
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