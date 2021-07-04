import React, { useReducer } from 'react';
import axios from 'axios';
import studentContext from './studentContext'
import studentReducer from './studentReducer'
import { 
    ADD_TAG,
    BASE_URL,
    CLEAR_NAME_FILTER,
    CLEAR_TAG_FILTER,
    STUDENT_ERROR,
    FILTER_STUDENTS_BY_NAME,
    FILTER_STUDENTS_BY_TAG,
    GET_STUDENTS,
 } from '../types'

 const StudentState = props => {
     const initialState = {

        error: null,
        filteredName: null,
        filteredTag: null,
        loading: true,
        students: null,
        tags: []
        
     };

     const [ state, dispatch ] =  useReducer(studentReducer, initialState);

     //Set up axios baseUrl
     const corsAxios = axios.create({
        baseURL: BASE_URL
    })

     //Add Tag
     const addTag = async tag => {

        try {

            dispatch({ 
                type: ADD_TAG, 
                payload: tag
               })
        } catch (error) {
            dispatch({ 
                type: STUDENT_ERROR,
                payload: error
               })
        }
    }

     //Clear Name Filter
     const clearNameFilter = () => {

        dispatch({ 
            type: CLEAR_NAME_FILTER 
        })
    }

     //Clear Tag Filter
     const clearTagFilter = () => {

        dispatch({ 
            type: CLEAR_TAG_FILTER 
        })
    }


     //Filter Students by Name
     const filterStudentsByName = name => {

        dispatch({ 
            type: FILTER_STUDENTS_BY_NAME, 
            payload: name
        })
    }

     //Filter Students By Tag
     const filterStudentsByTag = tag => {

        dispatch({ 
            type: FILTER_STUDENTS_BY_TAG, 
            payload: tag 
        })
    }
     //Get all students
     const getStudents = async () => {

        try {
            const res = await corsAxios.get('/assessment/students');

            dispatch({ 
                type: GET_STUDENTS, 
                payload: res.data.students
               })
        } catch (error) {
            dispatch({ 
                type: STUDENT_ERROR ,
                payload: error
               })
        }
    }

     return (
         <studentContext.Provider value={{ 
             error: state.error,
             filteredName: state.filteredName,
             filteredTag: state.filteredTag,
             loading: state.loading,
             students: state.students,
             tags: state.tags,
             addTag,
             clearNameFilter,
             clearTagFilter,
             filterStudentsByName,
             filterStudentsByTag,
             getStudents
         }}>
            { props.children }
         </studentContext.Provider>
     )
 }

 export default StudentState;