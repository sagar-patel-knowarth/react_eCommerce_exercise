import React from "react";

import HeaderNavLink, { NavigationLink } from "./header-nav-link/HeaderNavLink";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class AppHeader extends React.Component<any, any> {
    render() {
        const {links, items} = this.props;
        return (
            <header>
                <nav className="navbar">
                    <div className="container">
                        <div className="row middle center-xs flex flex-none-xs">
                            <div className="col-3 logo-section col-xs-12">
                                <NavLink to="/" className="logo">
                                    <span>eCommerce</span>
                                </NavLink>
                            </div>
                            <div className="col-9 link-section">
                                <div className="row middle center-xs flex flex-none-xs">
                                    <div className="col-6 col-xs-12">
                                        <ul className="navbar-nav center-xs">
                                            {links && links.map((link: NavigationLink) => (
                                                    <HeaderNavLink
                                                        label={link.label}
                                                        route={link.route}
                                                        key={link.label}
                                                    />
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-6 end center-xs col-xs-12">
                                        <NavLink to="/my-cart" className="cart-btn">
                                            <i className="fa fa-shopping-cart pd-right-sp-3"></i>
                                            <span>{items} items in cart</span>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--/.nav-collapse --> */}
                    </div>
                </nav>
            </header>
        );
    }
 }

const mapStateToProps = (state: any) => {
    return {
       books: state.books,
       items: state.cart.items
    };
};

export default connect(mapStateToProps)(AppHeader);