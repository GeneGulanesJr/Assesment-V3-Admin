import {
  Badge,
  Heading,
} from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'
import banner from '../Assets/Banner.jpg'
export default function Homepage() {
  return (
    <Layout>
      <Heading>
        <Badge
          fontWeight='black'
          fontSize='4xl'
          mx={2}
          px={2}
          colorScheme='green'
        >
            Love - Licensing Of Vehicle for Everyone,
        </Badge>
      </Heading>

      <Heading size='md' mt={8}>
          <img src={banner} alt="Banner"></img>
      </Heading>

    </Layout>
  )
}
