import React, {useEffect} from 'react'
import {Button, Dropdown, Form} from 'semantic-ui-react'
import {useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useHistory} from 'react-router';


export default function AddNewEmployee() {
    let history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');

    const [departmentData, setDepartmentData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/department`)
            .then((response) => {
                setDepartmentData(response.data);
            })

    }, [])

    const postData = () => {

        axios.post(`http://localhost:8080/employee`, {
            firstName,
            lastName,
            department: {
                depId: department
            }
        }).then(res => {
            history.push('/read')
        })
    }
    return (
        <Form className="create-form">
            <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
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
            <Link to='/read'>
                <Button type='submit' onClick={postData}>Submit</Button>
            </Link>
            <Link to='/read'>
                <Button type='submit' className="btn btn-danger">View List</Button>
            </Link>
        </Form>
    )
}
