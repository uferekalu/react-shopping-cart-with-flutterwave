import React, { useContext, useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Container, Button, Form, Col } from 'react-bootstrap';
import { CartContext } from './contexts/CartContext';
import { flutter_key } from './flutter-wave-key';

export default function Flutter() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const { total } = useContext(CartContext);
    
    const config = {
        public_key: flutter_key.REACT_APP_PUBLIC_KEY,
        tx_ref: Date.now(),
        amount: total,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: email,
            phonenumber: phone,
            name: name,
        },
        customizations: {
        title: 'Lushak Payment Title',
        description: 'Payment for items in cart',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const { currency } = config
    const handleFlutterPayment = useFlutterwave(config);

    return (
        <Container className="flutter">
            <h4>Total amount to be deducted is <strong>{currency} {total}</strong></h4>
            <p>Please fill the information below:</p>
            <Form className="mt-5">
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={event => setEmail(event.target.value)} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={event => setName(event.target.value)} type="text" placeholder="Enter your full name" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control onChange={event => setPhone(event.target.value)} placeholder="Your phone number" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>Lagos</option>
                        <option>Imo</option>
                        <option>Abia</option>
                        <option>Rivers</option>
                        <option>Akwa Ibom</option>
                        <option>Edo</option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                    </Form.Group>
                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button
                    className="cart-button-detail text-center"
                    onClick={() => {
                        
                    handleFlutterPayment({
                        callback: (response) => {
                        console.log(response);
                            closePaymentModal() // this will close the modal programmatically
                        },
                        onClose: () => {},
                    });
                    }}
                >
                    Payment with Flutter Wave
                </Button>
                </Form>


            
        </Container>
    );
}