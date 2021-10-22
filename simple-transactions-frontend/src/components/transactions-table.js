import React from 'react';
import { Table } from 'react-bootstrap';

const TransactionTableRow = (props) => {
  return (
    <tr>
      <td> {props.item.description} </td>
      <td> {props.item.amount} </td>
      <td> {props.item.timestamp} </td>
    </tr>
  );
}

const EmptyMessage = () => {
  return (
    <p>
      No data
    </p>
  );
}

export const TransactionsTable = (props) => {
  const items = props.transactions && Array.isArray(props.transactions)
    ? props.transactions.map((transaction, i) => <TransactionTableRow item={transaction} key={i} />)
    : [];

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>  Description </th>
            <th> Amount </th>
            <th> Timestamp </th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 && items}
        </tbody>
      </Table>
      <div>
        { items?.length <= 0 && <EmptyMessage />}
      </div>
    </>
  )
}