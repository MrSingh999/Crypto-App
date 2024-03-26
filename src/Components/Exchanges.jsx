import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from "../main"
import { Container, HStack, Heading, Image, Spinner, Text, VStack, flattenTokens } from '@chakra-ui/react'
import ErrorComponent from './ErrorComponent'
import Loader from './Loader'


const Exchanges = () => {

  const [exchanges, setExchanges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)


  useEffect(() => {

    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`)

        setExchanges(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }

    }
    fetchExchange()

  }, [])

  if (error) return <ErrorComponent message={"Error while Fetching Exchanges"} />


  return (


    <Container maxW={"container.xl"}>
      {loading ? (<Loader/>) : (<>

        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {exchanges.map((i) => (<ExchangeCard
            key={i.id}
            name={i.name}
            img={i.image}
            rank={i.trust_score_rank}
            url={i.url} />))}
        </HStack>


      </>
      )}
    </Container>
  )
}

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack w={"52"} shadow={"lg"} p={"9"} borderRadius={"xl"} transition={"all 0.3s"} m={"4"}

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
        {rank}
      </Heading>

      <Text>

        {name}
      </Text>

    </VStack>
  </a>
)

export default Exchanges