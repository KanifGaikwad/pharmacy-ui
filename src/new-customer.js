import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';

export default function NewCustomer() {
    const [customer, setCustomer] = useState({name: '', email_id: '', mobile_no: '', customer_dob: ''});
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const handleSave = () => {
        fetch('/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer),
        })
            .then((response) => setShowA(true))
    };

    return (
        <>
            <Form.Label htmlFor='name'>Name</Form.Label>
            <Form.Control
                id='name'
                value={customer.name}
                onChange={(event) => setCustomer({...customer, name: event.target.value})}
            />
            <Form.Label htmlFor='email_id'>Email</Form.Label>
            <Form.Control
                id='email_id'
                type={'email'}
                value={customer.email_id}
                onChange={(event) => setCustomer({...customer, email_id: event.target.value})}
            />
            <Form.Label htmlFor='mobile_no'>Number</Form.Label>
            <Form.Control
                id='mobile_no'
                type={'number'}
                value={customer.mobile_no}
                onChange={(event) => setCustomer({...customer, mobile_no: event.target.value})}
            />
            <Form.Label htmlFor='customer_dob'>Date of Birth</Form.Label>
            <Form.Control
                id='customer_dob'
                type={'date'}
                value={customer.customer_dob}
                onChange={(event) => setCustomer({...customer, customer_dob: event.target.value})}
            />
            <div className={'c-add-button'}>
                <Button variant='primary' onClick={handleSave}>
                    Save
                </Button>
            </div>
            <Toast show={showA} onClose={toggleShowA}>
                <Toast.Header>
                    <strong className="me-auto">Success!!</strong>
                    <small>Just now</small>
                </Toast.Header>
                <Toast.Body>You have added new customer!</Toast.Body>
            </Toast>
        </>
    )
}