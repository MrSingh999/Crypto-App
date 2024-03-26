import { Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../main'
import ErrorComponent from './ErrorComponent'

const CoinDetails = () => {

  const [coins, setCoins] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState("inr")

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"


  const parms = useParams()

  useEffect(() => {

    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${parms.id}`)
        console.log(data);
        setCoins(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }

    }
    fetchCoins()

  }, [parms.id])

  if (error) return <ErrorComponent message={"Error while Fetching Coins"} />


  return (
    <Container maxW={"container.xl"}>
      {
        loading ? <Loader /> : (<>

          <Box width={"full"} borderWidth={1} >

          </Box>

          { }


          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack>
              <Radio value={"inr"}>₹ INR</Radio>
              <Radio value={"eur"}>€ EUR</Radio>
              <Radio value={"usd"}>$ USD</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} align={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.8"}>
              last Updated On {Date(coins.market_data.last_updated).split("G")[0]}
            </Text>
          </VStack>
          <Image
            src={coins.image.large}
            w={"16"}
            h={"16"}
            objectFit={"contain"} />

          <Stat>
            <StatLabel>{coins.name}</StatLabel>
            <StatNumber>{currencySymbol}{coins.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type={coins.market_data.price_change_percentage_24h > 0
                ? "increase"
                : "decrease"
              }></StatArrow>
              {coins.market_data.price_change_percentage_24h}%
            </StatHelpText>
          </Stat>

          <Badge
            fontSize={"2xl"}
            bgColor={'black'}
            color={"white"}>
            #{coins.market_cap_rank}
          </Badge>
          <CustomBar high={coins.market_data.high_24h[currency]} low={coins.market_data.low_24h[currency]} />

          <Box w={"full"} p="4">
            <Item title={"Max Supply "} value={coins.market_data.max_supply} />
            <Item title={"Circulating Supply "} value={coins.market_data.circulating_supply} />
            <Item title={"Market Cap "} value={`${currencySymbol}${coins.market_data.market_cap[currency]}`} />
            <Item title={"All Time High "} value={`${currencySymbol} ${coins.market_data.ath[currency]}`} />
            <Item title={"All Time Low "} value={`${currencySymbol} ${coins.market_data.atl[currency]}`} />


          </Box>

        </>)
      }
    </Container>
  )
}

const Item = ({ title, value }) => (

  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={'Bebas Neue'} >{title}</Text>
    <Text >{value ? value : "Not Found"}</Text>
  </HStack>
)


const CustomBar = ({ high, low }) => (
  <VStack>
    <Progress value={50} colorScheme='teal' w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme='red'></Badge>
      <Text fontSize={"small"}>24H RANGE</Text>
      <Badge children={high} colorScheme='green'></Badge>
    </HStack>

  </VStack>)

export default CoinDetails