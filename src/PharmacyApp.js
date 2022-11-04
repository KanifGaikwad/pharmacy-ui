import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NewCustomer from './new-customer';
import NewOffer from './create-offer';
import ProductOffer from './product-offer';
import Alert from 'react-bootstrap/Alert';
import UpdateOffer from './update-offer';

function PharmacyApp() {
    const [products, setProducts] = useState([])
    const [returnProduct, setReturnProduct] = useState('')
    const [show, setShow] = useState(false);
    const [showCManage, setShowCManage] = useState(false);
    const [showOManage, setShowOManage] = useState(false);
    const [returnShow, setReturnShow] = useState(false);
    const [unsavedProduct, setUnsavedProduct] = useState({
        product_name: '',
        category_id: '',
        supplier_id: '',
        threshold_qty: ''
    });

    const handleClose = () => {
        setShow(false);
        setReturnShow(false);
        setShowCManage(false);
        setShowOManage(false);
    }
    const handleSave = () => {
        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(unsavedProduct),
        })
            .then((response) => response.json())
            .then((data) => setProducts([...products, data]));
    };
    const handleDelete = () => {
        fetch(`/api/products/${returnProduct}`, {
            method: 'DELETE',
        })
            .then((response) => searchProducts());
    };
    const searchProducts = () => {
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    };

    const searchProductsByName = (searchProduct) => {
        if (searchProduct === '') {
            return;
        }
        fetch(`/api/products/search/${searchProduct}`)
            .then((response) => response.json())
            .then((data) => setProducts(data));
    };
    return (
        <div className='App'>
            <div className='button-div'>
                <Button className='button-pha' variant='primary'
                        onClick={searchProducts}>{'Check Inventory'}</Button>
                <Button className='button-pha' variant='primary'>{'Generate Report'}</Button>
                <Button className='button-pha' variant='primary'>{'Search Expiring'}</Button>
                <Button className='button-pha' variant='primary'>{'Search out of Stock'}</Button>
                <Button className='button-pha' variant='secondary' onClick={() => setShow(true)}>{'Order Item'}</Button>
                <Button className='button-pha' variant='secondary'
                        onClick={() => setReturnShow(true)}>{'Return Item'}</Button>
                <Button className='button-pha' variant='secondary'
                        onClick={() => setShowCManage(true)}>{'Customer Management'}</Button>
                <Button className='button-pha' variant='secondary'>{'Billing Management'}</Button>
                <Button className='button-pha' variant='secondary'
                        onClick={() => setShowOManage(true)}>{'Offer Management'}</Button>
                <div className='search-bar-pha'>
                    <Form.Label htmlFor='productName'>Search By product name</Form.Label>
                    <Form.Control
                        id='productName'
                        aria-describedby='Enter Product Name'
                        onChange={(event) => searchProductsByName(event.target.value)}
                    />
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Supplier</th>
                    <th>Expiry Date</th>
                    <th>Quantity</th>
                    <th>Offers Applied</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map((prod) => {
                        return (
                            <tr key={prod.product_id}>
                                <td key={prod.product_id}>{prod.product_id}</td>
                                <td key={prod.product_id}>{prod.product_name}</td>
                                <td key={prod.product_id}>{prod.category_id}</td>
                                <td key={prod.product_id}>{prod.supplier_id}</td>
                                <td key={prod.product_id}>{prod.created_on}</td>
                                <td key={prod.product_id}>{prod.threshold_qty}</td>
                                <td key={prod.product_id}>{
                                    prod.offers.map(off => {
                                        return (
                                            <div>
                                                <Alert key={'primary'} variant={'primary'}>
                                                    {off.offer_name}
                                                </Alert>
                                            </div>
                                        )
                                    })
                                }</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <Modal show={returnShow} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Return Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor='productNo'>Product No</Form.Label>
                    <Form.Control
                        type={'number'}
                        id='productNo'
                        value={returnProduct}
                        onChange={(event) => setReturnProduct(event.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleDelete}>
                        Return
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor='productName'>Name</Form.Label>
                    <Form.Control
                        id='productName'
                        value={unsavedProduct.product_name}
                        onChange={(event) => setUnsavedProduct({...unsavedProduct, product_name: event.target.value})}
                    />
                    <Form.Label htmlFor='category'>Category</Form.Label>
                    <Form.Control
                        id='category'
                        value={unsavedProduct.category_id}
                        onChange={(event) => setUnsavedProduct({...unsavedProduct, category_id: event.target.value})}
                    />
                    <Form.Label htmlFor='supplier'>Supplier</Form.Label>
                    <Form.Control
                        id='supplier'
                        value={unsavedProduct.supplier_id}
                        onChange={(event) => setUnsavedProduct({...unsavedProduct, supplier_id: event.target.value})}
                    />
                    <Form.Label htmlFor='quantity'>Quantity</Form.Label>
                    <Form.Control
                        id='quantity'
                        value={unsavedProduct.threshold_qty}
                        onChange={(event) => setUnsavedProduct({...unsavedProduct, threshold_qty: event.target.value})}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleSave}>
                        Order
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showOManage} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Offer Management</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey='add'
                        id='c-tabs-id'
                        className='mb-3'
                    >
                        <Tab eventKey='add' title='Add'>
                            <NewOffer/>
                        </Tab>
                        <Tab eventKey='delete' title='Delete'>

                        </Tab>
                        <Tab eventKey='update' title='Update'>
                            <UpdateOffer/>
                        </Tab>
                        <Tab eventKey='product-offer' title='Product Offers'>
                            <ProductOffer/>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showCManage} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Management</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey='add'
                        id='c-tabs-id'
                        className='mb-3'
                    >
                        <Tab eventKey='add' title='Add'>
                            <NewCustomer/>
                        </Tab>
                        <Tab eventKey='delete' title='Delete'>

                        </Tab>
                        <Tab eventKey='update' title='Update'>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default PharmacyApp;
