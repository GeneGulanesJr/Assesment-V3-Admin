import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Select,
    Stack,
    FormControl,Box, Center,
    FormLabel,
    Input,
    FormErrorMessage,
    useToast,
    useColorModeValue
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import {LinkIcon} from "@chakra-ui/icons";
import React from 'react'
import {Field, Form, Formik} from "formik";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../utils/init-firebase";


export default function UpdateClient({works}) {
    const btnRef = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    async  function updateUsers2(values) {

        const userRef = doc(db, 'users', works.id);
        await  updateDoc(userRef,{
            ...values

        })
    }



    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                <LinkIcon />
            </Button>




            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>

                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>
                    <Center py={12}>
                        <Box
                            w={'full'}
                            bg={useColorModeValue('white', 'gray.800')}
                            rounded={'md'}
                            overflow={'hidden'}
                            boxShadow={'lg'}>
                            <Box p={6}>
                    <Stack spacing='24px'>
                        <Formik
                            initialValues={{
                                ...works
                            }}
                            onSubmit={(values, actions) => {
                                updateUsers2(values)
                                    .then(() => {
                                        toast({
                                            title: 'Success',
                                            description: 'User Profile Updated Successfully',
                                            status: 'info',
                                            duration: 9000,
                                            isClosable: true,
                                        })
                                        actions.setSubmitting(false)
                                        onClose()
                                    })

                            }}
                        >
                            {(props) => (
                                <Form>
                                    <Field name='firstName' >
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                                                <FormLabel htmlFor='firstName'>First Name</FormLabel>
                                                <Input {...field} id='firstName' placeholder='firstName' />
                                                <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='lastName' >
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                                                <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                                                <Input {...field} id='lastName' placeholder='lastName' />
                                                <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='username' >
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.username && form.touched.username}>
                                                <FormLabel htmlFor='username'>Username</FormLabel>
                                                <Input {...field} id='username' placeholder='username' />
                                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name='email' >
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                <FormLabel htmlFor='email'>Email Address</FormLabel>
                                                <Input {...field} id='email' placeholder='email' isDisabled />
                                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name='contactnumber' >
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.contactnumber && form.touched.contactnumber}>
                                                <FormLabel htmlFor='contactnumber'>Contact Number</FormLabel>
                                                <Input {...field} id='contactnumber' placeholder='contactnumber' type='number' />
                                                <FormErrorMessage>{form.errors.contactnumber}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name='status' >
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.status && form.touched.status}>
                                                <FormLabel htmlFor='status'>Status</FormLabel>
                                                <Select {...field} id='status' placeholder='Select Option'>
                                                    <option value='Completed'>Completed</option>
                                                    <option value='Pending'>Pending</option>

                                                </Select>

                                                <FormErrorMessage>{form.errors.status}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>


                                    <Button
                                        mt={4}
                                        colorScheme='teal'
                                        isLoading={props.isSubmitting}
                                        type='submit'
                                    >
                                        Update
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                            </Box>
                        </Box>
                    </Center>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}