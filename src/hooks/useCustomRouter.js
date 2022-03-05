import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const useCustomRouter = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const pushQuery = (query) => {
        // console.log(query);
        const newQuery = new URLSearchParams(query).toString();
        // console.log({ newQuery });
        // console.log({pathname})
        navigate(`${pathname}?${newQuery}`);
    }

    return { pushQuery }
};

export default useCustomRouter;
