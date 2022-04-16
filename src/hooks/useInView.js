import React, { useState, useEffect, useRef } from 'react';

const useInView = () => {
    const [isView, setIsView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        let btn = ref.current;

        const observer = new IntersectionObserver(entries => {
            setIsView(entries[0].isIntersecting);
        });

        if(btn) observer.observe(btn);

        return () => {
            if(btn) observer.unobserve(btn);
            // setIsView(false);
        }
    }, []);


    return { ref, isView }

};

export default useInView;
