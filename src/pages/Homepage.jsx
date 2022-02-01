import {
  Badge,
    Flex,
    Spacer,
    HStack,
    Input,Heading
} from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'
import banner from '../Assets/Banner.jpg'
export default function Homepage() {



  return (
    <Layout>
      <Heading>

      </Heading>



        <Flex pb={5}>
            <Heading >

            </Heading>
            <Spacer />
            <HStack>
            <img src={banner}/>

            </HStack>
        </Flex>



    </Layout>
  )
}
