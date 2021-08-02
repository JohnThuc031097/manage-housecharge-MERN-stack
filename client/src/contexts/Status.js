import React from "react";

const Loading = React.createContext({
    statusLoading: false,
    setStatusLoading: () => { },
});

export {
    Loading
}