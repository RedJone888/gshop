import ajax from './ajax'

const BASE_URL='/api'

export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
export const reqFoodCategorys = () => ajax(`${BASE_URL}/index_category`)
export const reqShops = (latitude, longitude) => ajax(`${BASE_URL}/shops`, { latitude, longitude })
export const reqSearchShops = (geohash, keyword) => ajax(`${BASE_URL}/search_shops`, { geohash, keyword })
export const reqCaptcha = () => ajax(`${BASE_URL}/captcha`)
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(`${BASE_URL}/login_pwd`, { name, pwd, captcha }, 'POST')
export const reqSendCode = (phone) => ajax(`${BASE_URL}/sendcode`, { phone })
export const reqSmsLogin = (phone, code) => ajax(`${BASE_URL}/login_sms`, { phone, code }, 'POST')
export const reqUserInfo = () => ajax(`${BASE_URL}/userinfo`)
export const reqLogout = () => ajax(`${BASE_URL}/logout`)
export const reqShopGoods = () => ajax('/goods')
export const reqShopRatings = () => ajax('/ratings')
export const reqShopInfo = () => ajax('/info')