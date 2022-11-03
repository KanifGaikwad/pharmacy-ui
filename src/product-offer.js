import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Table from 'react-bootstrap/Table';

export default function ProductOffer() {
    const [offers, setOffers] = useState([]);
    const [gotOffers, setGotOffers] = useState(false);
    const [gotProducts, setGotProducts] = useState(false);
    const [products, setProducts] = useState([]);
    const [proOffer, setProOffer] = useState([]);
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    useEffect(() => {
        const a = async () => {
            console.log("gotOffers " + gotProducts)
            if (!gotOffers) {
                await fetch('/api/offers')
                    .then((response) => response.json())
                    .then((data) => {
                        setGotOffers(true);
                        setOffers(data)
                    })
            }
        }
        a();
        const b = async () => {
            console.log("gotProducts " + gotProducts)
            if (!gotProducts) {
                await fetch('/api/products')
                    .then((response) => response.json())
                    .then((data) => {
                        setGotProducts(true);
                        setProducts(data)
                        setProOffer(data)
                    })
            }
        }
        b();
    });

    const manageOffer = (prodId, offerId, isAdd) => {
        let tmp = [];
        proOffer.forEach(o => {
            if (o.product_id === prodId) {
                if (isAdd) {
                    o.offers.push({offer_id: offerId});
                } else {
                    o.offers = o.offers.filter(of => of.offer_id !== offerId);
                }
            }
            tmp.push(o);
        })
        setProOffer(tmp);
    }

    const isOfferSelected = (prodId, offerId) => {
        let selectedProduct = proOffer.filter(prod => prod.product_id === prodId);
        if (selectedProduct.length > 0) {
            let p = selectedProduct[0];
            let selectedOffer = p.offers.filter(of => of.offer_id === offerId);
            if (selectedOffer.length > 0) {
                return true
            }
        }
        return false;
    }

    const handleSave = () => {
        fetch('/api/products/offers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proOffer),
        })
            .then((response) => setShowA(true))
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Offers</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map(product => {
                        return (
                            <tr>
                                <td>
                                    <Form.Label>{product.product_name}</Form.Label>
                                </td>
                                <td>
                                    {
                                        offers.map(offer => {
                                            return (
                                                <>
                                                    <Form.Check
                                                        type="switch"
                                                        id="custom-switch"
                                                        value={isOfferSelected(product.product_id, offer.offer_id)}
                                                        checked={isOfferSelected(product.product_id, offer.offer_id)}
                                                        isValid={true}
                                                        onChange={(event) => manageOffer(product.product_id, offer.offer_id, event.target.checked)}
                                                        label={offer.offer_name}/>
                                                </>
                                            )
                                        })
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <div className={'c-add-button'}>
                <Button variant='primary' onClick={handleSave}>
                    Save
                </Button>
            </div>
            <Toast show={showA} onClose={toggleShowA}>
                <Toast.Header>
                    <strong className='me-auto'>Success!!</strong>
                    <small>Just now</small>
                </Toast.Header>
                <Toast.Body>You have applied new Offers!!</Toast.Body>
            </Toast>
        </>
    )
}