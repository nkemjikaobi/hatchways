import {
    ADD_TAG,
    CLEAR_NAME_FILTER,
    CLEAR_TAG_FILTER,
    FILTER_STUDENTS_BY_NAME,
    FILTER_STUDENTS_BY_TAG,
    GET_STUDENTS,
    STUDENT_ERROR,
   
 } from '../types'

const studentReducer = (state,action) => {
    switch(action.type){

        case ADD_TAG:

            //Create a copy of students from global state
            let studentCopy = JSON.parse(JSON.stringify(state.students));
            let index = studentCopy.findIndex(s => s.id === action.payload.studentId);
            
            
            if (index > -1) {

                // if student object is in array, then add tag to student's tag array
                if (studentCopy[index].tags) {
                    studentCopy[index].tags = [...studentCopy[index].tags, action.payload];
                } else {
                    studentCopy[index].tags = [action.payload]
                }
            } 
         
            return {
              ...state,
              students: studentCopy,
              tags: [...state.tags, action.payload]
            }

        case CLEAR_NAME_FILTER:
            return {
                ...state,
                filteredName: null
            }
        case CLEAR_TAG_FILTER:
            return {
                ...state,
                filteredTag: null
            }
       
        case FILTER_STUDENTS_BY_NAME:
            return {
                ...state,
                filteredName: state.students.filter(student => {

                    const regex = new RegExp(`${action.payload}`, 'gi')

                    const fullName = student && `${student.firstName} ${student.lastName}`

                    return (student.firstName && student.firstName.match(regex)) || (student.lastName && student.lastName.match(regex)) 
                            || (fullName.match(regex))
                })
            }
        case FILTER_STUDENTS_BY_TAG:
            console.log(state.students.tags);
            return {
                ...state,
                filteredTag: state.tags.filter(tag => {

                    const regex = new RegExp(`${action.payload}`, 'gi')

                    return (tag.tag && tag.tag.match(regex))
                })
               }
        case GET_STUDENTS:
            return {
                ...state,
                students: action.payload,
                loading: false
            }
        case STUDENT_ERROR:
            return {
                ...state,
                error: action.payload
            }
            
        default:
            return state;
    }

}
 export default studentReducer