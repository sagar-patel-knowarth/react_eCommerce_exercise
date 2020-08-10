import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Home extends React.Component<any, any> {

    componentDidMount() {
        this.props.fetchBooks();
    }

    redirectToDetail(id: number) {
        this.props.history.push(`/book/book-detail/${id}`);
    }

    render() {
        const {books} = this.props;
        return (
            <section className="content-area">
                <div className="container">
                    <div className="row middle">
                        {
                            books[0] ?
                            (books[0].orders.map((book:any) => (
                                <div className="col-3" key={book.id}>
                                    <div className="book-gallery" title={book.bookTitle}>
                                        <div className="image">
                                            <p><img src={book.imageUrl} alt="" className="img"/></p>
                                        </div>
                                        <div className="discription">
                                            <h3 className="ellipsis">{book.bookTitle}</h3>
                                            <p className="text fs-12 mg-bottom-sp-2 cl-tc-3">
                                                {book.bookAuthor}
                                            </p>
                                            <p className="price fs-14 mg-bottom-sp-4">
                                                <del className="cl-tc-3">{book.bookOldPrice}</del>{book.bookPrice}
                                            </p>
                                            <p className="buttons">
                                                <NavLink to={`/book/book-detail/${book.id}`} className="button"><i className="fa fa-shopping-cart pd-right-sp-3"></i>Buy
                                                    Now</NavLink>
                                            </p>
                                            {
                                                book.isOnSale && (
                                                    <div className="ribbon sale">
                                                        <div className="theribbon">SALE</div>
                                                    </div>
                                                )
                                            }
                                            {
                                                book.isNew && (
                                                    <div className="ribbon new">
                                                        <div className="theribbon">NEW</div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))) : <div></div>
                        }
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
       books: state.books
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchBooks: () => dispatch({type: 'FETCH_BOOKS'})
    }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);;