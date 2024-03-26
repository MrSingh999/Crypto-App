import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const CoinCard = ({ id, name, img, price, symbol, currencySymobal = "₹" }) => (
  <Link to={`/coin/${id}`} target={"blank"}>
    <VStack w={"52"} shadow={"lg"} p={"9"} borderRadius={"xl"} transition={"all 0.3s"} m={"4"} bgColor={""}

      css={{
        "&:hover": {
          transform: " scale(1.1)"
        }
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} >
        {symbol}
      </Heading>

      <Text noOfLines={1} >{name}</Text>
      <Text noOfLines={1} >{price ? `${currencySymobal}${price}` : "Na"}</Text>

    </VStack>
  </Link>
)

export default CoinCard