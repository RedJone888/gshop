import Vue from 'vue'
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
    [RECEIVE_ADDRESS](state, { address }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state,) {
        state.userInfo = {}
    },
    [RECEIVE_SHOP_GOODS](state, { goods }) {
        state.goods = goods
    },
    [RECEIVE_SHOP_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },
    [RECEIVE_SHOP_INFO](state, { info }) {
        state.info = info
    },
    [INCREMENT_FOOD_COUNT](state,{food}){
        if(food.count){
            food.count++
        }else{
            Vue.set(food,'count',1)
            state.cartFoods.push(food)
        }
    },
    [DECREMENT_FOOD_COUNT](state,{food}){
        if(food.count){
            food.count--
            if(food.count===0){
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
        }
    },
    [CLEAR_CART](state){
        state.cartFoods.forEach(food => {
            Vue.delete(food,'count')
        });
        state.cartFoods=[]
    },
    [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
        state.searchShops=searchShops
    }
}