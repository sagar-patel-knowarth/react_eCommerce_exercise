export const books = (state = [], action: any) => {
    switch (action.type) {
        case 'FETCH_BOOKS_SUCCEEDED':
            return [
                ...state,
                {
                    orders: action.books
                }
            ]
        default:
            return state
    }
}

export const bookDetail = (state: any = [], action:any) => {
    switch (action.type) {
        case 'FETCH_BOOK_DETAIL_SUCCEEDED':
            state = [];
            state.push(action.book);
            break;
        default:
            break;
    }
    return state;
}