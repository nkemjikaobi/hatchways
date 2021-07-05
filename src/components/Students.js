import React, { useContext } from 'react'
import Spinner from '../components/layouts/Spinner'
import NameFilter from './NameFilter'
import StudentItem from './StudentItem'
import studentContext from '../context/students/studentContext'
import TagFilter from './TagFilter'

const Students = () => {

    const StudentContext = useContext(studentContext)
    const { students, loading, filteredName, filteredTag } = StudentContext

    const displayStudents =   students && students.map(student => (
                                <StudentItem student={student} key={student.id}/>
                              ))

    const displayFilteredName = filteredName && filteredName.map(name => (
                                    <StudentItem student={name} key={name.id}/>
                                ))

    const displayFilteredTag = filteredTag && filteredTag.map(tag => (
                                    <StudentItem student={tag} key={tag.id}/>
                                ))

    return (
    
        <div className='students'>

            <NameFilter />
            <TagFilter />

            {
                loading ? <Spinner /> : 
                displayFilteredName ? displayFilteredName : 
                displayFilteredTag ? displayFilteredTag :
                displayStudents && displayStudents
            }
        </div>
    )
}

export default Students
