import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form} from 'semantic-ui-react'
import axios from 'axios';
import { useHistory } from 'react-router';


export default function UpdateEmployee() {
    let history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState(false);
    const [id, setID] = useState(null);

    const [departmentData, setDepartmentData] = useState([]);

    const updateAPIData = () => {
        axios.put(`http://localhost:8080/employee/${id}`, {
            firstName,
            lastName,
            department: {
                depId: department
            }
        }).then((res) => {
            history.push('/read')
        })
    }

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('First Name'));
        setLastName(localStorage.getItem('Last Name'));
        setDepartment(localStorage.getItem('Department'))
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/department`)
            .then((response) => {
                setDepartmentData(response.data);
            })

    }, [])

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Department</label>
                    <select
                        disabled={false}
                        value={department}
                        onChange={(e) => setDepartment(e.currentTarget.value)}
                    >
                        {departmentData.map((data) => (
                            <option key={data.depId} value={data.depId}>
                                {data.depName}
                            </option>
                        ))}
                    </select>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}