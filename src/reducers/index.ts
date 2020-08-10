import { combineReducers } from 'redux';
import { books, bookDetail } from './books';
import { orders, cart, addToCart, address } from './orders'

export default combineReducers({
    books,
    bookDetail,
    orders,
    cart,
    addToCart,
    address
})