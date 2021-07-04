import React, { useState, useRef, useContext } from 'react'
import studentContext from '../context/students/studentContext'
import {  useToasts } from 'react-toast-notifications'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'


const StudentItem = ({ student }) => {

    const { addToast } = useToasts()

    const StudentContext = useContext(studentContext)
    const { tags, addTag} = StudentContext

    const { id, firstName, lastName, email, company, skill, grades, pic } = student 

    //Convert elements from string to integer
    let result = grades && grades.map(i => Number(i))

    //Calculate average function
    const calculateAverage = result => result && parseInt((result.reduce((sum, elem) => sum + elem, 0))/result.length )

    //Get the average
    const average = result && calculateAverage(result)

    //Set the drop down of grades to hidden by default
    const[showGrades, setShowGrades] = useState(false)

    //Set each students tag to empty by default
    const[tag, setTag] = useState("")

    var text = useRef()

    const studentId = id;


    const handleKeyPress = e => {

        //Forgive the nested if's also.. ):
        if (e.key === 'Enter') {

            e.preventDefault()

            if(text.current.value !== ""){

                //Assign a unique id to the created tag
                let id = uuid()

                //Create object for new tag
                var newTagToBeAdded = {  //pardon my naming convention :)

                    studentId,
                    tag,
                    id
                }

                addTag(newTagToBeAdded)
    
                //Clear the tag state
                setTag("")
    
                //Clear Input field
                text.current.value =  ""

                addToast('Tag added successfully', 
                    { 
                        appearance: 'success',
                        autoDismiss: true
                    }
                )
            }
            else{
                addToast('Tag cannot be empty', 
                { 
                    appearance: 'error',
                    autoDismiss: true
                }
                )
            }
          
        }
    }

    const getIndividualTags = tags.filter(t => t.studentId === id)

    return (
        <div className="student-item">
            <img src={pic} alt="weird creatures" />
            <div className="student-item-details">
                <h1>{firstName} {lastName}</h1>
                <p>Email: {email}</p>
                <p>Company: {company}</p>
                <p>Skill: {skill}</p>
                <p style={{ marginBottom: '20px' }}>Average: {average}%</p>
            {
                showGrades && result.map((testScores, key) =>(
                    <p id="test-scores" key={uuid()}><span>Test {key}</span> <span>{testScores}%</span></p>
                ))  
            }
            {
                tags.length > 0 && 
                    getIndividualTags.map(git => (
                        <div id="new-tag" key={git.id}>
                            <span key={git.id}>{git.tag}</span>
                        </div>
                    ))
                    
            }
            <form action="">
                <input type="text" ref={text} onChange={e => setTag(e.target.value)}  placeholder="Add a tag" onKeyDown={handleKeyPress}/>
            </form>
            </div>
            <div className="button-container" onClick={() => setShowGrades(!showGrades)}>
                <button>{showGrades ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i> }</button>
            </div>
        </div>
    )
}

StudentItem.propTypes = {
    student: PropTypes.object.isRequired,
}

export default StudentItem
