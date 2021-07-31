import React, { useContext } from "react";
// Context
import { LoadingContext } from "../contexts";

export default function useLoading() {
    return useContext(LoadingContext);
}