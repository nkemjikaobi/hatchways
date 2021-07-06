import React, { useContext } from 'react'
import Spinner from '../components/layouts/Spinner'
import StudentItem from './StudentItem'
import studentContext from '../context/students/studentContext'
import Filters from './Filters'

const Students = () => {

    const StudentContext = useContext(studentContext)
    const { students, loading, filteredName, filteredTag, filteredNameAndTag } = StudentContext

    const displayStudents =   students && students.map(student => (
                                <StudentItem student={student} key={student.id}/>
                              ))

    const displayFilteredName = filteredName && filteredName.map(name => (
                                    <StudentItem student={name} key={name.id}/>
                                ))

    const displayFilteredTag = filteredTag && filteredTag.map(tag => (
                                    <StudentItem student={tag} key={tag.id}/>
                                ))

    const displayFilteredNameAndTag = filteredNameAndTag && filteredNameAndTag.map(tag => (
                                    <StudentItem student={tag} key={tag.id}/>
                                ))

    return (
    
        <div className='students'>

           <Filters />

            {
                loading ? <Spinner /> : 
                displayFilteredNameAndTag ? displayFilteredNameAndTag :
                displayFilteredName ? displayFilteredName : 
                displayFilteredTag ? displayFilteredTag :
                displayStudents && displayStudents
            }
        </div>
    )
}

export default Students
