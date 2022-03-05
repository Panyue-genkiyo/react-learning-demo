import React, { useMemo, useContext } from "react";
import { useLocation } from "react-router-dom";
import Sorting from "../components/Sorting";

//全局context api避免props一层一层的传递下去
//全局组件树
export const Store = React.createContext();

//自定义hook去读取上下文
export const useMyContext = () => useContext(Store);

export const ContextProvider = ({ children }) => {

    const { search } = useLocation();

    const { page, sort } = useMemo(() => {
        const page =  new URLSearchParams(search).get('page') || 1;
        const sort = new URLSearchParams(search).get('sort') || '-createdAt'; //默认按照创建时间倒序
        return {
            page: +page,
            sort
        }
    }, [search]);

    // Store.displayName = 'MY_CONTEXT';

    const value = {page , sort}

    return (
        <Store.Provider value={value}>
            <Store.Consumer>
                { value => console.log(value) }
            </Store.Consumer>
            {children}
        </Store.Provider>
    );
}
