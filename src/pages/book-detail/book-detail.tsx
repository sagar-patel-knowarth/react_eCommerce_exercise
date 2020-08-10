import React from "react";
import { connect } from "react-redux";
import AppBreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { toast } from 'react-toastify';
import { toastyOptions } from "../../constants/constants";

class BookDetail extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
        this.buyProduct = this.buyProduct.bind(this);
    }

    componentDidMount() {
        this.props.getBookById();
    }

    addToCart(book: any) {
        this.props.addItemToCart(book);
        toast.success('Item successfully added into the cart', toastyOptions);
    }

    buyProduct() {
        this.props.orderPlaced(this.props.book, false);
        this.props.history.push("/thankyou");
        toast.success('Order has been placed successfully', toastyOptions);
    }

    render() {
        const {book} = this.props;
        return(
            book[0] ?
            (<section className="content-area">
                <div className="container">
                    <AppBreadCrumb label="Book"></AppBreadCrumb>
                    <div className="row">
                        <div className="col-3 col-md-4">
                            <div className="book-detail-image mg-bottom-sp-6">
                                <div className="image">
                                    <img src={book[0].imageUrl} alt="Book Cover" className="img"/>
                                </div>
                                {
                                    book[0].isOnSale && (
                                        <div className="ribbon sale">
                                            <div className="theribbon">SALE</div>
                                        </div>
                                    )
                                }
                                {
                                    book[0].isNew && (
                                        <div className="ribbon new">
                                            <div className="theribbon">NEW</div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="book-detail-buttons">
                                <div className="row">
                                    <div className="col-6">
                                        <button className="button button-block button-secondary" onClick={(e) => this.addToCart(book[0])}><i
                                                className="fa fa-shopping-cart pd-right-sp-3"></i>Add to cart</button>
                                    </div>
                                    <div className="col-6">
                                        <button className="button button-block" onClick={this.buyProduct}>Buy
                                            Now</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-9 col-md-8">
                            <div className="book-detail-content">
                                <h1>{book[0].bookTitle}</h1>
                                <p className="fs-36 fw-500 mg-bottom-sp-4 price">
                                    {book[0].bookPrice} <del className="cl-tc-3">{book[0].bookOldPrice}</del>
                                </p>
                                <div className="star mg-bottom-sp-6">
                                    <div className="star-wrap">
                                        <span className="stars" style={{width:"88%"}}>
                                            <i className="fa fa-star checked" aria-hidden="true"></i>
                                            <i className="fa fa-star checked" aria-hidden="true"></i>
                                            <i className="fa fa-star checked" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="row fs-14 mg-bottom-sp-4">
                                    <div className="col-2 cl-tc-3">
                                        Author
                                    </div>
                                    <div className="col-10">
                                        <p>{book[0].bookAuthor}</p>
                                    </div>
                                </div>
                                <div className="row fs-14 mg-bottom-sp-4">
                                    <div className="col-2 cl-tc-3">
                                        Highlights
                                    </div>
                                    <div className="col-10">
                                        <ul className="listing">
                                            <li>Language: English</li>
                                            <li>Publisher: Scholastic US</li>
                                            <li>Edition: 1, 2020</li>
                                            <li>Pages: {book[0].pageCount}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row fs-14 mg-bottom-sp-4">
                                    <div className="col-2 cl-tc-3">
                                        Description
                                    </div>
                                    <div className="col-10">
                                        {book[0].bookDescription}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>) : <div></div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
       book: state.bookDetail,
       items: state.items
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        getBookById: () => dispatch({type: 'FETCH_BOOK_DETAIL', id: ownProps.match.params.id}),
        addItemToCart: (book: any) => dispatch({type: 'ADD_REMOVE_TO_CART', book: book}),
        orderPlaced: (books: any, addToCartReset) => dispatch({type: 'ORDER_PLACED', orders: books, addToCartReset: addToCartReset})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);