import React from "react";
import { NavLink } from "react-router-dom";

interface breadCrumbProps {
    label: string
}

class AppBreadCrumb extends React.Component<breadCrumbProps> {
    render() {
        return(
            <div className="row">
                <div className="col-12">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                            <li aria-current="page" className="breadcrumb-item active">{this.props.label}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        )
    }
}

export default AppBreadCrumb;