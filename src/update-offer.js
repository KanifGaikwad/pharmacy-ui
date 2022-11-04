import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

export default function UpdateOffer() {
    const [offers, setOffers] = useState([]);
    const [gotOffers, setGotOffers] = useState(false);

    useEffect(() => {
        const a = async () => {
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
    });

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Active</th>
                    <th>Discount %</th>
                </tr>
                </thead>
                <tbody>
                {
                    offers.map(offer => {
                        return (
                            <tr>
                                <td>
                                    <Form.Label>{offer.offer_name}</Form.Label>
                                </td>
                                <td>
                                    <Form.Label>{offer.created_on}</Form.Label>
                                </td>
                                <td>
                                    <Form.Label>{offer.is_active}</Form.Label>
                                </td>
                                <td>
                                    <Form.Label>{offer.percentage_discount}</Form.Label>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </>
    )
}