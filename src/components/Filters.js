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

       // For both name and tags filter 
          if(nameFilter.current.value !== "" && tagFilter.current.value !== ""){
              filterStudentsByNameAndTag(nameFilter.current.value, tagFilter.current.value)
          }
          else if (nameFilter.current.value === "" || tagFilter.current.value === ""){
              clearNameAndTagFilter()
          }

          //For name filter
          else if(e.target.name === "name" && nameFilter.current.value !== ''){

            filterStudentsByName(e.target.value);
          }
          else if(nameFilter.current.value === ""){
            clearNameFilter()
          }

          //For tags filter
          else if(e.target.name === "tag" && tagFilter.current.value !== ''){

            filterStudentsByTag(e.target.value);
          }
          else if(tagFilter.current.value === ""){
            clearTagFilter()
          }
          
          else{
              console.log("not doing anything");
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
