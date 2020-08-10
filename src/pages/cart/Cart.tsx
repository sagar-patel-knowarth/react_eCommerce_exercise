import React from "react";
import { connect } from "react-redux";
import AppBreadCrumb from "../../components/breadcrumb/BreadCrumb";
import { toast } from "react-toastify";
import { toastyOptions } from "../../constants/constants";

class Cart extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            addressFields: {
                name: '',
                gender: 'male',
                email: '',
                phone: '',
                pincode: '',
                locality: '',
                address: '',
                city: '',
                state: '',
                landMark: '',
                altPhone: ''
            },
            isEdit: false
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.checkout = this.checkout.bind(this);
        this.cancelOrder = this.cancelOrder.bind(this);
        this.editAddress = this.editAddress.bind(this)
    }

    calculateTotalPrice() {
        const { orders } = this.props;
        let totalPrice = 0;
        orders.forEach(order => {
            const price = order.bookPrice.split('$')[1];
            totalPrice += Number(price);
        })
        return totalPrice;
    }

    removeFromCart(id: number) {
        const { orders } = this.props;
        const index = orders.findIndex(order => order.id === id);
        orders.splice(index, 1);
        this.props.addItemToCart(orders[index]);
        this.setState({ orders: orders });
        toast.warn('Item successfully removed from the cart', toastyOptions);
    }

    handleOnChange($event) {
        const { value, name } = $event.target
        const addressFields = { ...this.state.addressFields }
        addressFields[name] = value;
        this.setState({ addressFields });
    }

    resetForm() {
        this.setState({
            addressFields: {
                name: '',
                gender: 'male',
                email: '',
                phone: '',
                pincode: '',
                locality: '',
                address: '',
                city: '',
                state: '',
                landMark: '',
                altPhone: ''
            },
            isEdit: false
        })
    }

    submitForm(event) {
        this.props.addressSaved(this.state.addressFields);
        event.preventDefault();
        this.resetForm();
    }

    checkout() {
        this.props.orderPlaced(this.props.orders, true);
        this.props.history.push("/thankyou");
        toast.success('Order has been placed successfully', toastyOptions);
    }

    cancelOrder() {
        this.props.history.push("/");
    }

    removeAddress(id: number) {
        const selectedAddress = this.props.address.address.find(add => add.id === id);
        this.props.addressRemoved(selectedAddress);
        toast.warn('Address has been removed successfully', toastyOptions);
    }

    editAddress(id: number) {
        const selectedAddress = this.props.address.address.find(add => add.id === id);
        this.setState({
            addressFields: selectedAddress,
            isEdit: true
        });
    }

    render() {
        const { orders, items, address } = this.props;
        return (
            <section className="content-area">
                <div className="container">
                    <AppBreadCrumb label="Cart"></AppBreadCrumb>
                    <div className="row">
                        <div className="col-8 col-md-7">

                            <div className="address-form-wrapper">

                                <h3 className="fs-18 mg-bottom-sp-6">Shipping Address</h3>

                                <form className="address-form" onSubmit={this.submitForm}>

                                    <div className="address-form-fields">
                                        <div className="row">

                                            <div className="col-6">
                                                <div className="form-group required">
                                                    <label htmlFor="Name">Reciver's Name</label>
                                                    <input type="text" required className="form-control" name="name" value={this.state.addressFields.name} onChange={(e) => this.handleOnChange(e)}
                                                        placeholder="Enter Name here" />
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group required">
                                                    <label htmlFor="Name">Gender</label>

                                                    <div className="input-group">
                                                        <label htmlFor="male">
                                                            <input type="radio" required name="gender" id="male" value="male"
                                                                checked={this.state.addressFields.gender === "male"}
                                                                onChange={this.handleOnChange} />
                                                            <span>Male</span>
                                                        </label>
                                                    </div>

                                                    <div className="input-group">
                                                        <label htmlFor="female">
                                                            <input type="radio" required name="gender" id="female" value="female"
                                                                checked={this.state.addressFields.gender === "female"}
                                                                onChange={this.handleOnChange} />
                                                            <span>Female</span>
                                                        </label>
                                                    </div>

                                                    <div className="clearfix"></div>

                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group required">
                                                    <label htmlFor="email">Enter e-mail</label>
                                                    <input type="email" required className="form-control" name="email" value={this.state.addressFields.email} onChange={this.handleOnChange}
                                                        placeholder="abc123@domain.com" />
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group required">
                                                    <label htmlFor="phone">Phone / Mobile</label>
                                                    <input type="tel" required className="form-control" name="phone" value={this.state.addressFields.phone} onChange={this.handleOnChange}
                                                        placeholder="+00 99 99 999 999" />
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group required">
                                                    <label htmlFor="pincode">Pincode</label>
                                                    <input type="number" required className="form-control" name="pincode" value={this.state.addressFields.pincode} onChange={this.handleOnChange}
                                                        placeholder="Pincode" />
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="locality">Locality</label>
                                                    <input type="text" className="form-control" name="locality"
                                                        placeholder="Your Locality" value={this.state.addressFields.locality} onChange={this.handleOnChange} />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-group required">
                                                    <label htmlFor="address">Address</label>
                                                    <textarea name="address" required className="form-control"
                                                        id="address" value={this.state.addressFields.address} onChange={this.handleOnChange}></textarea>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group required">
                                                    <label htmlFor="city">City</label>
                                                    <input type="text" required className="form-control" name="city" value={this.state.addressFields.city} onChange={this.handleOnChange} placeholder="City / Dist / Town" />
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group required">
                                                    <label htmlFor="city">State</label>
                                                    <select required className="form-control" name="state" value={this.state.addressFields.state} onChange={this.handleOnChange}>
                                                        <option value="">Select State</option>
                                                        <option value="gujarat">Gujarat</option>
                                                        <option value="maharastra">Maharastra</option>
                                                        <option value="rajsthan">Rajsthan</option>
                                                        <option value="delhi">Delhi</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group required">
                                                    <label htmlFor="landMark">landMark</label>
                                                    <input type="text" className="form-control" name="landMark" value={this.state.addressFields.landMark} onChange={this.handleOnChange} placeholder="Nr. / opp." />
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="alterPhone">Alternate Contact (Optional)</label>
                                                    <input type="number" className="form-control" name="altPhone" value={this.state.addressFields.altPhone} onChange={this.handleOnChange} placeholder="Enter alternate nunber" />
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    {
                                        !this.state.isEdit ? (
                                            <button className="button button-lg" type="submit">Save Address</button>
                                        ) : (<button className="button-secondary button button-lg" type="button" onClick={this.submitForm}>Update Address</button>)
                                    }
                                </form>
                            </div>

                            {
                                address && address.address[0] ? (
                                    <div className="address-list-wrapper">

                                        <h4 className="fs-18 mg-bottom-sp-5">Manage Address</h4>
                                        {
                                            (address.address.map((add: any) => (
                                                <div className="address card" key={add.id}>

                                                    <div className="reciver-info">

                                                        <p className="mg-bottom-sp-1"><b>{add.name}</b></p>
                                                        <p className="flex"><span className="fs-14">{add.email}</span> <span
                                                            className="fs-14">{add.phone}</span></p>

                                                    </div>

                                                    <div className="full-address">
                                                        <p>{add.address}</p>
                                                        <p>{add.city}-{add.pincode}</p>
                                                    </div>

                                                    <div className="manage-address text-right">
                                                        <button className="button" onClick={(e) => this.editAddress(add.id)}><i className="fa fa-pencil"></i> Edit</button>
                                                        <button className="button-secondary button" onClick={(e) => this.removeAddress(add.id)}><i className="fa fa-remove"></i> Remove</button>
                                                    </div>

                                                </div>
                                            )))
                                        }
                                    </div>
                                ) : <div></div>
                            }

                        </div>
                        <div className="col-4 col-md-5">
                            <div className="cart-list">
                                <div className="cart-header">
                                    <i className="fa fa-shopping-cart pd-right-sp-3" aria-hidden="true"></i> Cart Summary
                        </div>
                                <div className="cart-item-list">
                                    {
                                        orders[0] ?
                                            (orders.map((order: any, index) => (
                                                <div className="cart-item flex" key={index}>
                                                    <div className="cart-detail-image">
                                                        <div className="image">
                                                            <img src={order.imageUrl} alt="" className="img" />
                                                        </div>
                                                    </div>

                                                    <div className="cart-detail-text">
                                                        <div className="row mg-bottom-sp-3">
                                                            <div className="col-10 col-xs-9">
                                                                <h4>{order.bookTitle}</h4>
                                                            </div>
                                                            <div className="col-2 col-xs-3 text-right">
                                                                <button className="button button-secondary button-sm" onClick={(e) => this.removeFromCart(order.id)}><i
                                                                    className="fa fa-trash" aria-hidden="true"></i></button>
                                                            </div>
                                                        </div>


                                                        <div className="row">
                                                            <div className="flex">
                                                                <label className="label-price"><b>Price</b></label>
                                                                <span className="order-price">{order.bookPrice}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))) : <div></div>
                                    }
                                </div>
                                <div className="cart-payment-info">
                                    <div className="row">
                                        <div className="cart-price">
                                            <span>Price ({items} items)</span>
                                            <span>${this.calculateTotalPrice()}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="delivery-charge">
                                            <span>Delivery Fee</span>
                                            <span>{items ? "$10" : "$0"}</span>
                                        </div>
                                    </div>
                                    <div className="row total">
                                        <div className="total-cost fs-18">
                                            <span>Total</span>
                                            <span className="cl-pc-3">${this.calculateTotalPrice() + (items ? 10 : 0)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-buttons mg-top-sp-6">
                                <div className="row">
                                    <div className="col-6">
                                        <button onClick={this.checkout} className="button button-block button-lg button-checkout" type="submit"><i className="fa fa-shopping-cart pd-right-sp-3" aria-hidden="true"></i> Checkout</button>
                                    </div>
                                    <div className="col-6">
                                        <button onClick={this.cancelOrder} className="button-secondary button-block button button-lg button-checkout" type="button">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        items: state.cart.items,
        orders: state.cart.orders,
        address: state.address
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        orderPlaced: (orders, addToCartReset) => dispatch({ type: 'ORDER_PLACED', orders: orders, addToCartReset: addToCartReset }),
        addressSaved: (address) => dispatch({ type: 'ADDRESS_SAVED', address: address }),
        addressRemoved: (address) => dispatch({ type: 'ADDRESS_REMOVED', address: address }),
        addItemToCart: () => dispatch({ type: 'ADD_REMOVE_TO_CART' }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);