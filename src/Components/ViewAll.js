import React from 'react';
import {Table} from 'semantic-ui-react'
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from "reactstrap";
import {Link} from 'react-router-dom';

export default function ViewAll() {

    const [APIData, setAPIData] = useState([]);

    const onDelete = (id) => {
        axios.delete(`http://localhost:8080/employee/${id}`).then((res) => {
            getData();
            if (res.status === 200) {
                alert("Successfully Delete")
            }

        })
    }
    const getData = () => {
        axios.get(`http://localhost:8080/employee`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/employee`)
            .then((response) => {
                setAPIData(response.data);
            })

    }, [])

    const setData = (data) => {
        console.log(data)
        let {empId, firstName, lastName, depName} = data;
        localStorage.setItem('ID', empId);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Department', depName)
    }
    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Employee Id</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Department Name</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.empId}</Table.Cell>
                                <Table.Cell>{data.firstName}</Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.depName}</Table.Cell>
                                <Link to='/update'>
                                    <Table.Cell>
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button class="btn btn-danger" onClick={() => onDelete(data.empId)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <Link to='/'>
                <Button class="btn btn-primary">Add new Employee</Button>
            </Link>

        </div>
    )
}