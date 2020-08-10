import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MyOrders from '../pages/my-orders/MyOrders';
import Home from '../pages/home/Home';
import Cart from '../pages/cart/Cart';
import bookDetail from '../pages/book-detail/book-detail';
import ThankYou from '../pages/thankyou/thankyou';

export default function Routes() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/my-orders" exact component={MyOrders} />
        <Route path="/my-cart" exact component={Cart} />
        <Route path="/book/book-detail/:id" exact component={bookDetail} />
        <Route path="/thankyou" exact component={ThankYou} />
      </Switch>
    );
  }