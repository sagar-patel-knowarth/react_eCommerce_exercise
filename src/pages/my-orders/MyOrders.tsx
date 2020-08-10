import React from "react";
import { connect } from "react-redux";
import AppBreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { NavLink } from "react-router-dom";

class MyOrders extends React.Component<any, any> {
  componentDidMount() {
    this.props.fetchOrders();
  }
  render() {
    const {orders} = this.props;
    return (
      <section className="content-area">
            <div className="container">
                <AppBreadCrumb label="My Orders"></AppBreadCrumb>
                <div className="order-list">
                    {           
                            orders[0] ?
                            (orders.map((order:any, index: number) => (
                              <div className="order-item" key={index}>
                                  <div className="order-header">
                                      <div className="row">
                                          <div className="col-2 col-md-3 order-date">
                                              <i className="fa fa-shopping-cart pd-right-sp-3" aria-hidden="true"></i> Order Placed <br/><span className="cl-pc-3">{order.orderDate}</span>
                                          </div>
                                          <div className="col-6 col-md-4 order-number">
                                              Order #<br/><span className="cl-pc-3">{order.orderNumber}</span> 
                                          </div>
                                          <div className="col-2 order-price">
                                              Total Price <br/><span className="cl-pc-3">{order.bookPrice}</span>
                                          </div>
                                          <div className="col-2 col-md-3 deliver-date">
                                              <i className="fa fa-truck pd-right-sp-3" aria-hidden="true"></i> Delivered <br/><span className="cl-pc-3">{order.deliveryDate}</span> 
                                          </div>
                                      </div>
                                  </div>
                                  <div className="order-detail">
                                      <div className="row">
                                          <div className="col-2">
                                              <div className="order-detail-image">
                                                  <div className="image">
                                                      <img src={order.imageUrl} alt="Book Cover" className="img"/>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="col-10 order-detail-text">
                                              <h3><NavLink to={`book/book-detail/${order.id}`}>{order.bookTitle}</NavLink></h3>
                                              <p className="text fs-12 mg-bottom-sp-2 cl-tc-3">
                                                  {order.bookAuthor}
                                              </p>
                                              <div className="star mg-bottom-sp-4">
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
                                              <div className="mg-bottom-sp-2 cl-tc-3">
                                                  Author <p>{order.bookAuthor}</p>
                                              </div>
                                              <ul className="listing">
                                                  <li>Language: English</li>
                                                  <li>Publisher: Scholastic US</li>
                                                  <li>Edition: 1, 2020</li>
                                                  <li>Pages: {order.pageCount}</li>
                                              </ul>
                                          </div>
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
     orders: state.orders
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
      fetchOrders: () => dispatch({type: 'FETCH_ORDERS'})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);