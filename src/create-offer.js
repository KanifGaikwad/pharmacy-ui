import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

export default function NewOffer() {
    const [offer, setOffer] = useState({offer_name: '', is_active: false, percentage_discount: 0, created_on: ''});
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const handleSave = () => {
        fetch('/api/offers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offer),
        })
            .then((response) => setShowA(true))
    };

    return (
        <>
            <Form.Check
                type="switch"
                id="email_id"
                label="Activate Offer"
                value={offer.is_active}
                onChange={(event) => setOffer({...offer, is_active: !offer.is_active})}
            />
            <Form.Label htmlFor='name'>Name</Form.Label>
            <Form.Control
                id='name'
                value={offer.offer_name}
                onChange={(event) => setOffer({...offer, offer_name: event.target.value})}
            />
            <Form.Label htmlFor='mobile_no'>Percentage</Form.Label>
            <Form.Control
                id='mobile_no'
                type={'number'}
                value={offer.percentage_discount}
                onChange={(event) => setOffer({...offer, percentage_discount: event.target.value})}
            />
            <Form.Label htmlFor='customer_dob'>Start From</Form.Label>
            <Form.Control
                id='customer_dob'
                type={'date'}
                value={offer.created_on}
                onChange={(event) => setOffer({...offer, created_on: event.target.value})}
            />
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
                <Toast.Body>You have added new Offer!</Toast.Body>
            </Toast>
        </>
    )
}