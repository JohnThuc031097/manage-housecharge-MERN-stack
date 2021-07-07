import React, { useContext, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
// Contexts
import { MenuItemContext } from "../contexts";

export default function MenuItemProvider({ children }) {
    const [menuList, setMenuList] = useState(useContext(MenuItemContext));
    const [menuItemSelected, setMenuItemSelected] = useState(null);

    const updateMenuItemSelected = useCallback(
        (itemNew) => {
            return setMenuItemSelected(itemNew);
        },
        []
    );

    const getItemsExpanded = useCallback(() => {
        return menuList?.reduce((result, menuItem) => {
            return menuItem.isExpanded ? [...result, menuItem.key] : result
        }, []);
    }, []);


    return (
        <MenuItemContext.Provider value={{
            menuList,
            itemsExpanded: () => getItemsExpanded(),
            menuItemSelected,
            updateMenuItemSelected
        }}>
            {children}
        </MenuItemContext.Provider>
    );
}
MenuItemProvider.propTypes = {
    children: PropTypes.any,
}