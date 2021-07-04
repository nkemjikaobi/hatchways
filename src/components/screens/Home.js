import React, { useEffect, useContext, Fragment } from 'react'
import Students from '../Students'
import studentContext from '../../context/students/studentContext'

const Home = () => {

    const StudentContext = useContext(studentContext)
    const { getStudents } = StudentContext

    useEffect(() => {

        getStudents()

        //eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <Students />
        </Fragment>
    )
}

export default Home
