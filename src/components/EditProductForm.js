import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Container, Row, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function EditProductForm({ id }) {
    const initProductState = {
        name: "",
        category: "",
        price: "",
        tags: [],
    }
    const [product, setProduct] = useState(initProductState);
    const [submited, setSubmited] = useState();

    useEffect(() => {
        axios.get("http://localhost:5000/api/products/" + id).then((response) => {
            setProduct(response.data)
        });
    }, [id])
    //ให้ค่าเปลี่ยนตาม
    const handleInputChange = (event) => {
        let { name, value } = event.target;
        //split แยก string เป็น array
        if (name === "tags") {
            value = value.split(",");
        }
        setProduct({ ...product, [name]: value });
    };
    //method update porduct
    const editProduct = () => {
        //prepare parameter for add product
        const param = {
            name: product.name,
            category: product.category,
            price: product.price,
            tags: product.tags,
        };
        //call api และส่งค่าไป
        axios.put("http://localhost:5000/api/products/" + product._id, param).then((response) => {
            console.log(response.data);
            setProduct({ ...product, param });
            setSubmited(true);
        }).catch((error) => {
            console.log(error);
        });
    };

    const newEditProduct = () => {
        setSubmited(false);
    }
    return (
        <Container>
            <Row>
                <h3>Edit Product</h3>
                {submited ? (
                    <>
                        <Alert color="success"><FontAwesomeIcon icon={faCheck}> </FontAwesomeIcon> You have submited successfully !!</Alert>
                        <Button className='btn btn-success' onClick={newEditProduct}>Update product again</Button>
                    </>
                ) : (
                    <>
                        <Form>
                            <FormGroup>
                                <Label for="Product Name">Product Name</Label>
                                <Input type='text' name="name" id="productName" value={product.name || ""} onChange={handleInputChange} placeholder='Enter product name.' />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Product Name">Product Category</Label>
                                <Input type='text' name="category" id="productCategory" value={product.category || ""} onChange={handleInputChange} placeholder='Enter product category.' />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Product Name">Product Price</Label>
                                <Input type='text' name="price" id="productPrice" value={product.price || ""} onChange={handleInputChange} placeholder='Enter product price.' />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Product Name">Product Tags</Label>
                                <Input type='text' name="tags" id="productTags" value={product.tags || ""} onChange={handleInputChange} placeholder='Enter product tags.' />
                            </FormGroup>
                            <Button className='btn btn-success' onClick={editProduct}>Update product</Button>
                        </Form>
                    </>
                )}


            </Row>
        </Container>
    )
}

export default EditProductForm
