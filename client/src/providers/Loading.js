import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

// Context
import { LoadingContext } from "../contexts";

export default function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);
    return (
        <LoadingContext.Provider value={[loading, setLoading]}>
            {children}
        </LoadingContext.Provider>
    )
}

LoadingProvider.propTypes = {
    children: PropTypes.any,
}