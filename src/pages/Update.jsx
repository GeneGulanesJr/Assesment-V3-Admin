import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import {Form,Field,Formik} from "formik";
import { useToast } from '@chakra-ui/react'
import { doc, updateDoc} from "firebase/firestore";
import {db} from "../utils/init-firebase";
import Select from "../components/Select";





export default  function Update ({id}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast()
    const firstField = React.useRef()

    async  function updateUsers2(values) {

        const userRef = doc(db, 'users', id.id);
        await  updateDoc(userRef,{
            ...values

        })
    }


    return (
        <>

            <Button
                w={'full'}
                mt={8}
                bg={useColorModeValue('#151f21', 'gray.900')}
                color={'white'}
                rounded={'md'} ref={btnRef} colorScheme='black' onClick={onOpen}
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                }}
            >
                Update User

            </Button>


            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Update Social Worker Account
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Formik
                                initialValues={{
                                    ...id
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
                                                    <FormLabel htmlFor='username'>username</FormLabel>
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


                                        <Button
                                            mt={4}
                                            colorScheme='teal'
                                            isLoading={props.isSubmitting}
                                            type='submit'
                                        >
                                            Submit
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>


                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}