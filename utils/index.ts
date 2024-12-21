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

export function formattedDate(date: string) {
  if (!date) return ''
  const dateObject = parseISO(date)
  const formattedResult = format(dateObject, 'yyyy/MM/dd')
  return formattedResult
}

export function insertYearToPosts(posts: any) {
  let currentYear = -1
  return posts.reduce(
    (posts: any, post: any) => {
      const year = new Date(post.date).getFullYear()
      if (year !== currentYear && !isNaN(year)) {
        posts.push({
          isMarked: true,
          year,
        })
        currentYear = year
      }
      posts.push(post)
      return posts
    },
    [],
  )
}

// 根据文件名获取markdown文件内容
export async function getIncludedYearPosts(dirName: string) {
  const result = await queryContent(dirName).sort({ date: -1 }).find()
  return insertYearToPosts(result)
}