import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { error } from 'console'

const EmployeeComponent = () => {

    const { firstName, setFirstName } = useState('')
    const { lastName, setLastName } = useState('')
    const { email, setEmail } = useState('')

    const { id } = useParams();

    const { errors, setErrors } = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    useEffect(() => {
        if (id) {
            getEmployee(id).then((reponse) => {
                setFirstName(reponse.data.firstName)
                setLastName(reponse.data.lastName)
                setEmail(reponse.data.email)
            }).catch((error) => console.log(error))
        }
    }, [id])

    const navigator = useNavigate();

    function handleFirstName(e) {
        setFirstName(e.target.value);
    }

    function handleLastName(e) {
        setLastName(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {

            const employee = { firstName, lastName, email }
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.log(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error=>{
                    console.log(error);
                })
            }



        }


    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors }

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = "First name is required"
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = "Last name is required"
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = "Email is required"
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update employee</h2>
        } else {
            <h2 className='text-center'>Add employee</h2>
        }
    }

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'> First Name</label>
                                <input className={`form-control ${errors.firstName ? `is-invalid` : ''}`} type='text' placeholder='Enter  employee name' name='firstName' value={firstName} onChange={handleFirstName}></input>
                                {errors.firstName && <div className='invalid-feedback'> {errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'> Last Name</label>
                                <input className={`form-control ${errors.lastName ? `is-invalid` : ''}`} type='text' placeholder='Enter  employee name' name='lastName' value={lastName} onChange={handleLastName}></input>
                                {errors.lastName && <div className='invalid-feedback'> {errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'> email</label>
                                <input className={`form-control ${errors.email ? `is-invalid` : ''}`} type='text' placeholder='Email' name='lastName' value={email} onChange={handleEmail}></input>
                                {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}></button>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default EmployeeComponent