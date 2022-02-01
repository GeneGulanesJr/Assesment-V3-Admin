import {
    Flex,
    Spacer,
    HStack,
    Heading,
    Input,
} from '@chakra-ui/react'
import { Layout } from '../components/Layout'
import React, { useEffect, useState, useMemo } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/init-firebase";

import UpdateClient from "./UpdateClient";

import DataTable from "react-data-table-component";
import LTOForm from "./Forms/LTOForm";
import banner from "../Assets/Banner.jpg";


export default function UserList() {
    const newidk = sessionStorage.getItem('UserRole')
    const was =JSON.parse(newidk)

    console.log(was[0].Role,"aaaaaaaaaaaaa")

    const [filterText, setFilterText] = useState("");
    const [targetClient, setTargetClient] = useState([]);
    const Data = () => {
        const usersCollectionRef = collection(db, "users");
        onSnapshot(usersCollectionRef, (snapshot) => {
            let userData = []
            snapshot.docs.forEach(doc => {
                userData.push({ ...doc.data(), id: doc.id })
            })
            setTargetClient(userData)
        })
    };

    useEffect(() => {
        Data();
    }, []);

    const columns = useMemo(
        () => [
            {
                name: "First Name",
                selector: (row) => row.firstName,
                sortable: true,
                grow: 2,
            },
            {
                name: "Last Name",
                selector: (row) => row.lastName,
                sortable: true,
                grow: 2,
            },
            {
                name: "Status",
                selector: (row) => row.status,
                sortable: true,
                grow: 2,
            },
            {
                name: "Actions",
                cell: (works) => <HStack>
                    <UpdateClient works={works} />


                </HStack>
            },
        ],
        []
    );

if( was[0].Role==="Admin"){   return (

    <Layout>

        <Flex pb={5}>
            <Heading >
                User List
            </Heading>
            <Spacer />
            <HStack>
                <Input
                    type="text"
                    placeholder="Search List"
                    onChange={(e) => setFilterText(e.target.value)}
                />

            </HStack>
        </Flex>

        <DataTable
            highlightOnHover
            pagination
            direction="ltr"
            responsive
            striped
            columns={columns}
            data={
                targetClient.filter((value) => {
                    if (filterText === "") {
                        return value;
                    } else if (
                        value.firstname && value.firstname
                            .toLowerCase()
                            .includes(filterText.toLowerCase())
                    ) {
                        return value;
                    } else if (
                        value.lastname && value.lastname
                            .toLowerCase()
                            .includes(filterText.toLowerCase())
                    ) {
                        return value;
                    }
                })
            }

        />
    </Layout>
)}else if(was[0].Role ==="User"){
    return (
        <Layout>
            <Heading>

            </Heading>



            <Flex pb={5}>
                <Heading >

                </Heading>
                <Spacer />
                <HStack>
                    <h1>Go Back your not an admin</h1>

                </HStack>
            </Flex>



        </Layout>
    )
}

}
