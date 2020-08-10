import { toast } from "react-toastify";
import { toastyOptions } from "../constants/constants";
import { getMonthName } from "../utility/utility";

export const orders = (state: any = [], action: any) => {
    switch (action.type) {
        case 'FETCH_ORDERS_SUCCEEDED':
            state = [];
            state = [...state, ...action.orders];
            state.reverse();
            break;
        default:
            break;
    }
    return state;
}

export const addToCart = (state: any = [], action: any) => {
    switch (action.type) {
        case 'ORDER_PLACED_SUCCEEDED':
            action.orders.forEach((element, index) => {
                if (!element.orderDate && !element.deliveryDate && !element.orderNumber) {
                    element["orderNumber"] = Date.now() + (index * 114);
                    const orderDate = new Date(Date.now());
                    element["orderDate"] = `${orderDate.getDate()} 
                    ${getMonthName(orderDate.getMonth()+1)} ${orderDate.getFullYear()}`;
                    const deliveryDate = new Date(orderDate.getTime()+5*24*60*60*1000);
                    element["deliveryDate"] = `${deliveryDate.getDate()} 
                    ${getMonthName(deliveryDate.getMonth()+1)} ${deliveryDate.getFullYear()}`;
                }
            });
            state.push(action.orders);
            break;
        default:
            break;
    }
    return state;
}

const initialAddToCartState = {
    items: 0,
    orders: []
}

export const cart = (state = initialAddToCartState, action: any) => {
    const newState: any = state;
    switch (action.type) {
        case 'ADD_TO_CART_SUCCEEDED':
            newState.items += action.value;
            newState.orders.push(action.order);
            break;
        case 'REMOVE_FROM_CART_SUCCEEDED':
            newState.items -= action.value;
            break;
        case 'ADD_TO_CART_RESET':
            newState.items = 0;
            newState.orders = [];
            break;
        default:
            break;
    }
    return newState;
}

const initialAddressState = {
    address: []
}

export const address = (state = initialAddressState, action: any) => {
    const newState: any = {...state};
    switch (action.type) {
        case 'ADDRESS_SAVED_SUCCEEDED':
            newState.address.push(action.address);
            newState.address.forEach((add: any, i) => {
                add.id = i + 1;
            })
            toast.success('Address has been saved successfully', toastyOptions);
            break;

        case 'ADDRESS_UPDATED_SUCCEEDED':
            const index = newState.address.findIndex(add => add.id === action.address.id);
            newState.address[index] = action.address;
            toast.success('Address has been updated successfully', toastyOptions);
            break;
        case 'ADDRESS_REMOVED_SUCCEEDED':
            const addressIndex = newState.address.findIndex(add => add.id === action.address.id);
            newState.address.splice(addressIndex, 1);
            break;
        default:
            break;
    }
    return newState;
}