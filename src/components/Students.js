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

    //This is quite different because we want to get the studentId from tag and get the associated student
    const displayFilteredTag = filteredTag && filteredTag.map(tag => (
                                students.map(s => (
                                s.id === tag.studentId &&  <StudentItem student={s} key={s.id}/>
    ))))

    displayFilteredTag && console.log(displayFilteredTag);
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
