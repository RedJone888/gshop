import {
    reqAddress,
    reqFoodCategorys,
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopGoods,
    reqShopRatings,
    reqShopInfo,
    reqSearchShops
} from '../api'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_SHOP_GOODS,
    RECEIVE_SHOP_RATINGS,
    RECEIVE_SHOP_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'

export default {
    async getAddress({ commit, state }) {
        const geohash = `${state.latitude},${state.longitude}`
        const result = await reqAddress(geohash)
        if (result.code === 0) {
            commit(RECEIVE_ADDRESS, { address: result.data })
        }
    },
    async getCategorys({ commit }) {
        const result = await reqFoodCategorys()
        if (result.code === 0) {
            commit(RECEIVE_CATEGORYS, { categorys: result.data })
        }
    },
    async getShops({ commit, state }) {
        const { latitude, longitude } = state
        const result = await reqShops(latitude, longitude)
        if (result.code == 0) {
            commit(RECEIVE_SHOPS, { shops: result.data })
        }
    },
    recordUser({ commit }, userInfo) {
        commit(RECEIVE_USER_INFO, { userInfo })
    },
    async getUserInfo({ commit }) {
        const result = await reqUserInfo()
        if (result.code === 0) {
            commit(RECEIVE_USER_INFO, { userInfo: result.data })
        }
    },
    async logout({ commit }) {
        const result = await reqLogout()
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },
    async getShopGoods({ commit }, cb) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            commit(RECEIVE_SHOP_GOODS, { goods: result.data })
            cb && cb()
        }
    },
    async getShopRatings({ commit },cb) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            commit(RECEIVE_SHOP_RATINGS, { ratings: result.data })
            cb&&cb()
        }
    },
    async getShopInfo({ commit }) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            commit(RECEIVE_SHOP_INFO, { info: result.data })
        }
    },
    updateFoodCount({commit},{isAdd,food}){
        if(isAdd){
            commit(INCREMENT_FOOD_COUNT,{food})
        }else{
            commit(DECREMENT_FOOD_COUNT,{food})
        }
    },
    clearCart({commit}){
        commit(CLEAR_CART)
    },
    async getSearchShops({commit,state},keyword){
        const geohash=`${state.latitude},${state.longitude}`
        const result=await reqSearchShops(geohash, keyword)
        if(result.code===0){
            commit(RECEIVE_SEARCH_SHOPS,{searchShops:result.data})
        }
    }
}