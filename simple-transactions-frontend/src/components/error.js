import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert'

const getErrorMessage = (code) => {
  switch(code) {
    case '404': return 'Resource not found';
    default:  return 'Internal server error';
    // TODO: Fill other HTTP errors
  }
}


export const ErrorAlert = (props) => {
  const [show, setShow] = useState(true);
  const errorCode = props?.error?.code;
  const message = getErrorMessage(errorCode);
  const alertMessage = (
    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Error</Alert.Heading>
      <p>
        {message}
      </p>
    </Alert>
  )
  return (
    <>
      { show && alertMessage }
    </>
  )
}