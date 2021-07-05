import React, { useRef, useEffect, useContext } from 'react'
import studentContext from '../context/students/studentContext'

const TagFilter = () => {

    const StudentContext = useContext(studentContext)
    const { filteredTag, filterStudentsByTag, clearTagFilter } = StudentContext

    const text = useRef("")

    useEffect(() => {

        if(filteredTag === null){
            text.current.value = ""
        }

        //eslint-disable-next-line
    },[filteredTag])

     //Monitor changes on the name filter
     const onChange = e => {
        if(text.current.value !== ''){

            filterStudentsByTag(e.target.value);
        }
        // else if(text.current.value !== '' && filteredTag.length < 1 ){
        //     return <p>No name matches found...</p>
        // }
        else{
           clearTagFilter();
        }
    }

    return (
        <div className="tag-filter-search-bar">
            <input type="search" ref={text} onChange={onChange} placeholder="Search by tag"/>
        </div>
    )
}

export default TagFilter
