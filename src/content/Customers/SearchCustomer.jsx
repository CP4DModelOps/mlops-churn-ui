import React from 'react';
import axios from 'axios';
import {
    Loading, StructuredListWrapper, StructuredListHead, StructuredListBody,
    StructuredListRow, StructuredListCell, Button, Search
} from '@carbon/react';
import {
    IbmCloudPakData
} from '@carbon/react/icons';

export function SearchCustomer() {

    const [loading, setLoading] = React.useState(false);
    const [customers, setCustomers] = React.useState(undefined);
    const [predictions, setPredictions] = React.useState({});
    const [error, setError] = React.useState(undefined);

    const searchCustomers = function (searchValue) {
        if (!searchValue) return;
        setLoading(true);
        const name = searchValue?.split(' ');
        const filter = {
            "where": {
                "or": [
                    { "firstName": { "ilike": `%${name?.length > 1 ? name[0] : searchValue}%` } },
                    { "lastName": { "ilike": `%${name?.length > 1 ? name[1] : searchValue}%` } },
                    { "id": { "eq": Number(searchValue) } }
                ]
            }
        }
        axios({ method: 'get', url: `/api/customers?filter=${encodeURIComponent(JSON.stringify(filter))}`, headers: { 'Accept': 'application/json' } })
            .then((response) => {
                setLoading(false);
                setCustomers(response.data);
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
            });
    }

    const getPredictions = function (customer) {
        setLoading(true);
        const body = [
            {
                "fields": [
                    "ID", "LONGDISTANCE", "INTERNATIONAL", "LOCAL", "DROPPED",
                    "PAYMETHOD", "LOCALBILLTYPE", "LONGDISTANCEBILLTYPE",
                    "USAGE", "RATEPLAN", "GENDER", "STATUS", "CHILDREN",
                    "ESTINCOME", "CAROWNER", "AGE"
                ],
                "values": [
                    [
                        customer.id, customer.longDistance,
                        customer.international, customer.local,
                        customer.dropped, customer.payMethod,
                        customer.localBillType, customer.longDistanceBillType,
                        customer.usage, customer.ratePlan, customer.gender,
                        customer.status, customer.children, customer.estIncome,
                        customer.carOwner, customer.age
                    ]
                ]
            }
        ];
        axios({
            method: 'post',
            url: '/api/inference/predictions',
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                setLoading(false);
                setPredictions({ ...predictions, [customer.id]: response.data?.predictions[0]?.values[0][0] });
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
            });
    }

    return <div>
        <h1>Search Customer</h1>
        <br />
        <div style={{ width: '500px' }}>
            <Search
                labelText="Search customer"
                closeButtonLabelText="Clear search input"
                placeholder="Customer name, email, number..."
                role="searchbox"
                size="md"
                type="text"
                autoComplete='on'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') searchCustomers(e.target.value)
                }}
            />
        </div>
        <br />
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
                                {customer.id in predictions ?
                                    predictions[customer.id]
                                    :
                                    <Button size='sm' renderIcon={IbmCloudPakData} onClick={() => {getPredictions(customer)}}>Predict</Button>
                                }
                            </StructuredListCell>
                        </StructuredListRow>
                    ))}
                </StructuredListBody>
            </StructuredListWrapper>}
            {error && 'An error occured trying to preform query'}
        </div>
    </div>;
}
