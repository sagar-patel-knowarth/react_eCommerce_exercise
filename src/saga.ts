import { books, MockBookDetail } from "./__mock__/books";
import { put, takeLatest, all } from 'redux-saga/effects'
import { orders } from "./__mock__/orders";


function* fetchBooks() {
    try {
        const allBooks = books;
        yield put({type: "FETCH_BOOKS_SUCCEEDED", books: allBooks});
    } catch (e) {
        yield put({type: "FETCH_BOOKS_FAILED", message: e.message});
    }
}

function* fetchBookDetail(action) {
    try {
        const book = MockBookDetail(action.id);
        yield put({type: "FETCH_BOOK_DETAIL_SUCCEEDED", book: book});
    } catch (e) {
        yield put({type: "FETCH_BOOK_DETAIL_FAILED", message: e.message});
    }
}

function* fetchOrders() {
    try {
        const allOrders = orders;
        yield put({type: "FETCH_ORDERS_SUCCEEDED", orders: allOrders});
    } catch (e) {
        yield put({type: "FETCH_ORDERS_FAILED", message: e.message});
    }
}

function* addRemoveToCart(action) {
    try {
        action.book ?
        yield put({ type: "ADD_TO_CART_SUCCEEDED", value: 1, order: action.book }) :
        yield put({ type: "REMOVE_FROM_CART_SUCCEEDED", value: 1, order: action.book });
    } catch (e) {
        yield put({type: "ADD_TO_CART_FAILED", message: e.message})
    }
}

function* orderPlaced(action) {
    try {
        action.orders.forEach(order => orders.push(order))
        if(action.addToCartReset) {
            yield put({ type: "ADD_TO_CART_RESET"});
        }
        yield put({ type: "ORDER_PLACED_SUCCEEDED", orders: orders });
    } catch (e) {
        yield put({type: "ORDER_PLACED_FAILED", message: e.message})
    }
}

function* addressSaved(action) {
    try {
        !action.address.id ?
            yield put({ type: "ADDRESS_SAVED_SUCCEEDED", address: action.address }) :
            yield put({ type: "ADDRESS_UPDATED_SUCCEEDED", address: action.address });
    } catch (e) {
        yield put({type: "ADDRESS_SAVED_FAILED", message: e.message})
    }
}

function* addressRemoved(action) {
    try {
        yield put({ type: "ADDRESS_REMOVED_SUCCEEDED", address: action.address });
    } catch (e) {
        yield put({type: "ADDRESS_REMOVED_FAILED", message: e.message})
    }
}

function* addToCartSaga() {
    yield takeLatest("ADD_REMOVE_TO_CART", addRemoveToCart);
}

function* fetchBookSaga() {
    yield takeLatest("FETCH_BOOKS", fetchBooks);
}

function* fetchBookDetailSaga() {
    yield takeLatest("FETCH_BOOK_DETAIL", fetchBookDetail);
}

function* fetchOrderSaga() {
    yield takeLatest("FETCH_ORDERS", fetchOrders);
}

function* orderPlacedSaga() {
    yield takeLatest("ORDER_PLACED", orderPlaced);
}

function* addressSavedSaga() {
    yield takeLatest("ADDRESS_SAVED", addressSaved)
}

function* addressRemovedSaga() {
    yield takeLatest("ADDRESS_REMOVED", addressRemoved)
}

export default function* rootSaga() {
    yield all([
        fetchBookSaga(),
        fetchOrderSaga(),
        fetchBookDetailSaga(),
        addToCartSaga(),
        orderPlacedSaga(),
        addressSavedSaga(),
        addressRemovedSaga()
    ])
}