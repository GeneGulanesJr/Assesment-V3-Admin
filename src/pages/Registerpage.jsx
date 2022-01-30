import {
    Button,
    Center,
    chakra,
    FormControl,
    FormLabel,
    Heading,
    Input, Select,
    Stack,
    useToast,
} from '@chakra-ui/react'

import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card } from '../components/Card'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'

export default function Registerpage() {
    const history = useHistory()
    const { register } = useAuth()
    const [email, setEmail] = useState('')
    const [firstName, setfName] = useState('')
    const [lastName, setlName] = useState('')
    const [username, setUsername] = useState('')
    const [contactnumber, setContactNumber] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const toast = useToast()
    const mounted = useRef(false)

    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])

    return (
        <Layout>
            <Heading textAlign='center' my={12}>
                Register
            </Heading>
            <Card maxW='md' mx='auto' mt={4}>
                <chakra.form
                    onSubmit={async e => {
                        e.preventDefault()
                        if (!email || !password) {
                            toast({
                                description: 'Credentials not valid.',
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                            })
                            return
                        }
                        // your register logic here
                        setIsSubmitting(true)
                        register(email, password,firstName,lastName,username,contactnumber)
                            .then(res => {  })
                            .catch(error => {
                                console.log(error.message)


                                toast({
                                    description: error.message,
                                    status: 'error',
                                    duration: 9000,
                                    isClosable: true,
                                })
                            })
                            .finally(() => {
                                mounted.current && setIsSubmitting(false)
                            })
                    }}
                >
                    <Stack spacing='6'>
                        <FormControl id='email' isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id='username' isRequired>
                            <FormLabel>UserName</FormLabel>
                            <Input
                                name='username'
                                type='username'
                                autoComplete='username'
                                required
                                onChange={e => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id='fname' isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                name='fname'
                                type='fname'
                                autoComplete='fname'
                                required
                                onChange={e => setfName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id='lname' isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                name='lname'
                                type='lname'
                                autoComplete='fname'
                                required
                                onChange={e => setlName(e.target.value)}
                            />
                        </FormControl>


                        <FormControl id='password' isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                name='password'
                                type='password'
                                autoComplete='password'
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id='number' isRequired>
                            <FormLabel>Contact Number</FormLabel>
                            <Input
                                name='number'
                                type='number'
                                autoComplete='number'
                                required
                                onChange={e => setContactNumber(e.target.value)}
                            />
                        </FormControl>

                        <Button
                            type='submit'
                            colorScheme='green'
                            size='lg'
                            fontSize='md'
                            isLoading={isSubmitting}
                        >
                            Sign up
                        </Button>
                    </Stack>
                </chakra.form>
                <Center my={4}>
                    <Button variant='link' onClick={() => history.push('/login')} >
                        Login
                    </Button>
                </Center>

            </Card>
        </Layout>
    )
}