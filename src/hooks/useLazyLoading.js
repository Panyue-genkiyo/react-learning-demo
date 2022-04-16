import React, { useEffect } from 'react';
import useInView from "./useInView";

//lazy loading image(图片懒加载hook)
const useLazyLoading = () => {
    const { ref: imgRef, isView } = useInView();

    useEffect(() => {
        const img = imgRef.current
        if(isView && img){
            img.setAttribute('src', img.alt);
            img.classList.add('active');
        }
    }, [isView])

    return { imgRef }
};

export default useLazyLoading;
