import ajax from './ajax'

export const reqAddress = (geohash) => ajax(`/position/${geohash}`)
export const reqFoodTypes = () => ajax('/index_category')
export const reqShops = (latitude, longitude) => ajax('/shops', { latitude, longitude })
export const reqSearchShops = (geohash, keyword) => ajax('/search_shops', { geohash, keyword })
export const reqCaptcha = () => ajax('/captcha')
export const reqNamePwdLogin = (name, pwd, captcha) => ajax('/login_pwd', { name, pwd, captcha }, 'POST')
export const reqCode = (phone) => ajax('/sendcode', { phone })
export const reqPhoneCodeLogin = (phone, code) => ajax('/login_sms', { phone, code }, 'POST')
export const reqUserInfo = () => ajax('/userinfo')
export const reqLogout = () => ajax('/logout')