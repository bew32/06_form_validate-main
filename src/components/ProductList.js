import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Button } from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
function ProductList() {
    const [product, setProduct] = useState([]);
    //ดึง data 
    const updateProductData = () => {
        axios.get("http://localhost:5000/api/products").then((respond) => {
            setProduct(respond.data);
            console.log("Update Product data list .....");
        });
    }

    useEffect(() => {
        updateProductData();
    }, [])

    const deleteProduct = (product) => {
        swal({
            title: "Do you want to delete " + product.name + " ?",
            text: "Once deleted, you will not be able to recover this prouct!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete("http://localhost:5000/api/products/" + product._id).then((response) => {
                        console.log(response.data);
                        updateProductData();
                        swal("Poof! Your product has been deleted!", {
                            icon: "success",
                        });
                    }
                    );

                } else {
                    swal("Your product is safe!");
                }
            });
    };
    return (
        <Container>
            <Row>Product List</Row>
            <Row>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((product) => {
                            return (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Button color="info" href={"edit/" + product._id}><FontAwesomeIcon icon={faEdit} /> Edit</Button>{" "}
                                        <Button color="danger" onClick={() => { deleteProduct(product) }}><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default ProductList
