import React, { useRef, useEffect, useContext } from 'react'
import studentContext from '../context/students/studentContext'

const NameFilter = () => {

    const StudentContext = useContext(studentContext)
    const { filteredName, filterStudentsByName, clearNameFilter } = StudentContext

    const text = useRef("")

    useEffect(() => {

        if(filteredName === null){
            text.current.value = ""
        }

        //eslint-disable-next-line
    },[filteredName])

    //Monitor changes on the name filter
    const onChange = e => {
        if(text.current.value !== ''){

            filterStudentsByName(e.target.value);
        }
        // else if(text.current.value !== '' && filteredName.length < 1){
        //     //return <h1 style={{ backgroundColor: 'orange' }}>No name matches found...</h1>
        //     alert('no matches')
        // }
        else{
           clearNameFilter();
        }
    }

    return (
        <div className="name-filter-search-bar">
            <input type="search" onChange={onChange} ref={text} placeholder="Search by name"/>
        </div>
    )
}

export default NameFilter
