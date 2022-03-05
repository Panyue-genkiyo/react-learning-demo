import axios from 'axios'
import React, { useRef } from 'react'

const ProductForm = ({ btnTxt,setOpen }) => {
    const multiRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const children = multiRef.current.children; //子节点
        const newData = [...children].reduce((obj, child) => {
            if(!child.name) return obj;
            return {...obj, [child.name]:child.value}
        }, {})

        console.log(newData)
        axios.post(`/products`, newData).then(res => {
            console.log(res);
            setOpen(false);
        })
    }

    return (
        <div className='product_form'>
            <form ref={multiRef} onSubmit={handleSubmit}>
                <input type="text" name="title"
                       placeholder="Product title" required
                />

                <input type="text" name="description"
                       placeholder="Product description" required
                />

                <input type="text" name="price"
                       placeholder="Product price" required
                />

                <input type="text" name="category"
                       placeholder="Product category" required
                />

                <input type="text" name="image"
                       placeholder="Product image" required
                />

                <button>
                    { btnTxt }
                </button>
            </form>
        </div>
    )
}

export default ProductForm
