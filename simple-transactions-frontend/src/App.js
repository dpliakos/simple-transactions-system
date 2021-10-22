import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { dataAdapter } from './services/data-adapter';
import { TransactionsTable } from './components/transactions-table';
import { Loader } from './components/loading';
import { ErrorAlert } from './components/error';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ transactions, setTransactions ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState();

  useEffect(() => {
    setLoading(true);
    dataAdapter.get('transactions')
    .then((result) => {
      setTransactions(result);
    })
    .catch(err => {
      setError(err);
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

  return (
      <Container className="fluid">
        <Row>
          <Col>
            { error && <ErrorAlert error={error} />}
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            { !loading && transactions && <TransactionsTable transactions={transactions} /> }
            { loading && <Loader /> }            
          </Col>
        </Row>
    </Container>
  );
}

export default App;
