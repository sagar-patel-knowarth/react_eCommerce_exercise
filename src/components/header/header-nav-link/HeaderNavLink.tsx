import React from "react";
import { NavLink  } from "react-router-dom";

// define a Navigation Link type for our links
export type NavigationLink = {
  label: string;
  route: string;
};

function HeaderNavLink(props: any) {
    return(
        <li className="nav-item"><NavLink className={`nav-link`} exact to={props.route}>{props.label}</NavLink></li>
    )
}

export default HeaderNavLink;