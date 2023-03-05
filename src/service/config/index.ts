/* eslint-disable import/no-mutable-exports */
let BASE_URL = ''
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = 'http://152.136.185.210:4000'
} else {
  // 开发环境
  BASE_URL = 'http://152.136.185.210:5000'
}

export const TIME_OUT = 10000
export { BASE_URL }
