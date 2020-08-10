import React from "react";
import AppBreadCrumb from "../../components/breadcrumb/BreadCrumb";

class ThankYou extends React.Component {
    render() {
        return (
            <section className="content-area">

                <div className="container">
                    <AppBreadCrumb label="Thank you"></AppBreadCrumb>
                    <div className="row">
                        <div className="col-12">
                            <div className="mg-bottom-sp-6 flex">
                                <div className="message-icon">
                                    <i className="fa fa-shopping-cart fs-36 cl-pc-4" aria-hidden="true"></i>
                                </div>
                                <div className="message-text">
                                    <h3 className="fs-18 cl-pc-3">Thank you for your order !</h3>
                                    <p>Your Order Number: 5445587787788</p>
                                </div>
                            </div>

                            <div className="delivery-desc-box">
                                <div className="row">
                                    <div className="col-12">
                                        <h3>Your order will be sent to:</h3>
                                        <div className="reciver-info">

                                            <p className="mg-bottom-sp-1 cl-pc-3"><b>Smith David</b></p>
                                            <p className="flex"><span className="fs-14">smith.david@gmail.com</span> <span
                                                className="fs-14">+1 895-242-452</span></p>

                                        </div>
                                        <div className="full-address">
                                            <p>32, Lambton street, Near Wallmart,</p>
                                            <p>Canada-786243</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default ThankYou;