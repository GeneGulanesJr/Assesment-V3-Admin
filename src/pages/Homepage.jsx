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
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/init-firebase";

import UpdateClient from "./UpdateClient";

import DataTable from "react-data-table-component";
import LTOForm from "./Forms/LTOForm";
export default function Homepage() {

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
  return (
    <Layout>
      <Heading>

      </Heading>



        <Flex pb={5}>
            <Heading >
          List of Users
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
                        value.firstName && value.firstName
                            .toLowerCase()
                            .includes(filterText.toLowerCase())
                    ) {
                        return value;
                    } else if (
                        value.lastName && value.lastName
                            .toLowerCase()
                            .includes(filterText.toLowerCase())
                    ) {
                        return value;
                    }else if (
                        value.status && value.status
                            .toLowerCase()
                            .includes(filterText.toLowerCase())
                    ) {
                        return value;
                    }
                    else if (
                        value.ApplicationType && value.ApplicationType
                            .toLowerCase()
                            .includes(filterText.toLowerCase())
                    ) {
                        return value;
                    }
                })
            }

        />

    </Layout>
  )
}
