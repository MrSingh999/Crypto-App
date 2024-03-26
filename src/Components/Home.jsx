import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import btcSrc from "../assets/bitcoin.jpg"

const Home = () => {
  return (
    <Box bg={"#000000"} w={"full"} h={"90vh"}>
      <Image w={"full"} h={"full"} objectFit={"contain"} src={btcSrc} />
    </Box>
  )
}

export default Home