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


import  { useEffect, useState, useMemo } from 'react'

import { db } from "../utils/init-firebase";


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
