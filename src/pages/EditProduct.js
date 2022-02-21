import React from 'react'
import EditProductForm from '../components/EditProductForm'
import { useParams } from "react-router-dom";
function EditProduct() {
    const param = useParams();
    console.log(param.id);
    return (
        <>
            <main>
                <EditProductForm id={param.id} />
            </main>
        </>
    )
}

export default EditProduct
