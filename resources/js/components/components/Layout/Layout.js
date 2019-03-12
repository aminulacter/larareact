import React from "react";

import Aux from "../../Hoc/Aux1";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = props => {
    return (
        <Aux>
            <Toolbar />
            <main className="Content">{props.children}</main>
        </Aux>
    );
};

export default Layout;
