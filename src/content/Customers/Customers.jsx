import React from 'react';
import axios from 'axios';
import {
    Loading, StructuredListWrapper, StructuredListHead, StructuredListBody,
    StructuredListRow, StructuredListCell, Button
} from '@carbon/react';
import {
    IbmCloudPakData
} from '@carbon/react/icons';

export function Customers() {

    const [loading, setLoading] = React.useState(true);
    const [customers, setCustomers] = React.useState(undefined);
    const [error, setError] = React.useState(undefined);

    React.useEffect(() => {
        axios({ method: 'get', url: '/api/customers', headers: { 'Accept': 'application/json' } })
            .then((response) => {
                setLoading(false);
                setCustomers(response.data);
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
            });
    }, []);

    return <div>
        <h1>Customers</h1>
        <div>
            {loading && <Loading />}
            {customers && <StructuredListWrapper>
                <StructuredListHead>
                    <StructuredListRow>
                        <StructuredListCell head>First Name</StructuredListCell>
                        <StructuredListCell head>Last Name</StructuredListCell>
                        <StructuredListCell head>Email</StructuredListCell>
                        <StructuredListCell head>Churn Prediction</StructuredListCell>
                    </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>

                    {customers.map(customer => (
                        <StructuredListRow key={customer.id}>
                            <StructuredListCell>{customer.firstName}</StructuredListCell>
                            <StructuredListCell>{customer.lastName}</StructuredListCell>
                            <StructuredListCell>{customer.email}</StructuredListCell>
                            <StructuredListCell>
                                <Button size='sm' renderIcon={IbmCloudPakData}>Predict</Button>
                            </StructuredListCell>
                        </StructuredListRow>
                    ))}
                </StructuredListBody>
            </StructuredListWrapper>}
            {error && 'An error occured trying to fetch customers'}
        </div>
    </div>;
}
