import React, { useState } from 'react';
import axios from "axios";
import { Container, Row, Button, Form, FormGroup, Label, Input, Alert, FormText, Progress } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
//เรียกทั้งหมด รวมกัน ชื่อ yup
import * as yup from "yup";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function AddProductForm() {
    const initProductState = {
        name: "",
        category: "",
        price: "",
        tags: [],
        file: "",
        imageURL: "",
    }
    // const [product, setProduct] = useState(initProductState);
    const [submited, setSubmited] = useState(false);
    const [progress, setProgress] = useState(0);

    const uploadFileToFirebase = async (file) => {
        //Prepare unique file name
        const userId = "001";
        const timestamp = Math.floor(Date.now() / 1000);  //จะรีเทรินเวลาปัจจุบันเป็นตัวเลขออกมา /1000คือจะปรับตัวเลขลงมาไม่ให้มันยาวเกินไป
        const newName = userId + "_" + timestamp;

        //uploading file
        const storageRef = ref(storage, `images/${newName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        //get URL
        await uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(uploadProgress);
        },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    saveProduct(downloadURL);
                  });
                // storage
                //     .ref('images')
                //     .child(newName)
                //     .getDowloadURL()
                //     .than((url) => {
                //         console.log(url);
                // });
            }
        )
    };

    const FILE_SIZE = 2000 * 1024;
    const SUPPORT_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

    //formik เพื่อ validation form
    const formik = useFormik({
        initialValues: initProductState,//ค่าเริ่มต้น
        //โครงสร้างสำหรับ validate
        validationSchema: yup.object().shape({
            name: yup.string().required("กรุณากรอกข้อมูล"),
            category: yup.string().required("กรุณากรอกข้อมูล"),
            price: yup.number("ต้องเป็นตัวเลขเท่านั้น").positive("ไม่สามารถติดลบได้").required("กรุณากรอกข้อมูล"),
            tags: yup.string(),
            file: yup.mixed().test("fileSize", "ไฟล์รูปภาพมีขนาดใหญ่เกินไป", (file) => {
                if (file) {
                    return file?.size <= FILE_SIZE;
                } else {
                    return true;
                }
            }).test('fileType', "อัพโหลดได้เฉพาะรูปภาพเท่านั้น", (file) => {
                if (file) {
                    return SUPPORT_FORMATS.includes(file?.type);
                } else {
                    return true;
                }
            })
        }),
        onSubmit: () => {
            if(formik.values.file){
            uploadFileToFirebase(formik.values.file);        
            }
            else{
                saveProduct("");
            }
        }
    });


    //ให้ค่าเปลี่ยนตาม
    // const handleInputChange = (event) => {
    //     let { name, value } = event.target;
    //     //split แยก string เป็น array
    //     if (name === "tags") {
    //         value = value.split(",");
    //     }
    //     setProduct({ ...product, [name]: value });
    // };

    const saveProduct = (url) => {
        //prepare parameter for add product
        const param = {
            name: formik.values.name,
            category: formik.values.category,
            price: formik.values.price,
            tags: formik.values.tags,
            imageURL: url
        };
        //call api และส่งค่าไป
        axios.post("http://localhost:5000/api/products", param).then((response) => {
            console.log(response.data);
            // setProduct(initProductState);
            setSubmited(true);
        }).catch((error) => {
            console.log(error);
        });
    };

    const newProduct = () => {
        //setProduct(initProductState);
        setSubmited(true);
    }

    return (
        <Container>
            <Row>
                <h3>Add New Product</h3>
                {submited ? (
                    <>
                        <Alert color="success"><FontAwesomeIcon icon={faCheck}> </FontAwesomeIcon> You have submited successfully !!</Alert>
                        <Button className='btn btn-success' onClick={newProduct}>Add new product</Button>
                    </>
                ) : (
                    <>
                        <Form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <Label for="Product Name">Product Name</Label>
                                <Input type='text' name="name" id="productName" value={formik.values.name || ""} onChange={formik.handleChange} placeholder='Enter product name.' />
                                {formik.errors.name && formik.touched.name && (
                                    <p>{formik.errors.name}</p>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="Product Name">Product Category</Label>
                                <Input type='text' name="category" id="productCategory" value={formik.values.category || ""} onChange={formik.handleChange} placeholder='Enter product category.' />
                                {formik.errors.category && formik.touched.category && (
                                    <p>{formik.errors.category}</p>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="Product Name">Product Price</Label>
                                <Input type='text' name="price" id="productPrice" value={formik.values.price || ""} onChange={formik.handleChange} placeholder='Enter product price.' />
                                {formik.errors.price && formik.touched.price && (
                                    <p>{formik.errors.price}</p>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="Product Name">Product Tags</Label>
                                <Input type='text' name="tags" id="productTags" value={formik.values.tags || ""} onChange={formik.handleChange} placeholder='Enter product tags.' />
                                {formik.errors.tags && formik.touched.tags && (
                                    <p>{formik.errors.tags}</p>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="fileupload">Product Image</Label>
                                <Input type='file' name='file' onChange={(event) => {
                                    formik.setFieldValue("file", event.currentTarget.files[0]);
                                }} />
                                <FormText color="muted">
                                    รองรับเฉพาะไฟล์ภาพและขนาดต้องไม่เกิน 2Mb
                                </FormText>
                                {formik.errors.file && formik.touched.file && (
                                    <p>{formik.errors.file}</p>
                                )}
                                {progress != 0 && (
                                <Progress value={progress} max="100" animated>
                                    {progress} %
                                </Progress>
                                )}
                            </FormGroup>
                            <Button className='btn btn-success'>Add new product</Button>
                        </Form>
                    </>
                )}


            </Row>
        </Container >
    )
}

export default AddProductForm
