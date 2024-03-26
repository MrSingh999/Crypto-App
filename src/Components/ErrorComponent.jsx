import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({ message }) => {
  return (
    <Alert maxW={"screen"} status='error' position={"fixed"} left={"50%"} transform={"translateX(-50%)"} w={"container.lg"} top={"20%"} >
      <AlertIcon />
      {message}

    </Alert>
  )
}

export default ErrorComponent