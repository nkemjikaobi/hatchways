import React, { useRef, Fragment, useEffect, useContext } from 'react'
import studentContext from '../context/students/studentContext'


const Filters = () => {

    const StudentContext = useContext(studentContext)
    const { filteredName, filterStudentsByNameAndTag, clearNameAndTagFilter, filterStudentsByTag, clearTagFilter, filteredTag, filterStudentsByName, clearNameFilter } = StudentContext

    const nameFilter = useRef("")
    const tagFilter = useRef("")

    useEffect(() => {

        filteredName === null ? nameFilter.current.value = "" :
        filteredTag === null ? tagFilter.current.value = "" : 
        console.log("filtered name and tag are not empty")

        //eslint-disable-next-line
    },[filteredName, filteredTag])


      //Monitor changes on the filters (name and tag)
      const handleChange = e => {

          //For name filter
          if(e.target.name === "name"){

            nameFilter.current.value !== '' ?
              filterStudentsByName(e.target.value)
            : clearNameFilter()
          } 

          //For tag filter
          if(e.target.name === "tag"){
            tagFilter.current.value !== '' ?
              filterStudentsByTag(e.target.value)
            : clearTagFilter()
          } 

          //For both tags and filter
          if(nameFilter.current.value !== "" && tagFilter.current.value !== ""){
            filterStudentsByNameAndTag(nameFilter.current.value, tagFilter.current.value)
          }
          else if (nameFilter.current.value === "" || tagFilter.current.value === ""){
              clearNameAndTagFilter()
          }

       
    }

    return (
        <Fragment>
            <div className="name-filter-search-bar">
                <input type="search" name="name" onChange={handleChange} ref={nameFilter} placeholder="Search by name"/>
            </div>
            <div className="tag-filter-search-bar">
                <input type="search" name="tag" ref={tagFilter} onChange={handleChange} placeholder="Search by tag"/>
            </div>
        </Fragment>
    )
}

export default Filters
