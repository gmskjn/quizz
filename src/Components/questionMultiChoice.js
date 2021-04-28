import React, { Fragment, useState,useEffect } from 'react';



import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const MultiChoice = ({question,nextQuestion,updateTotalPoints}) => {


    useEffect(() => {
        // create choices obj and set data
        let choicesObj = [];
        (question.choices).forEach((choice,index) => {
            choicesObj[`choice${index}`] = choice;
            choicesObj[`choice${index}`].value = false;
        });
        setChoiceBoxesData(choicesObj)
        setQuestionData(question)

    }, [question]);


    const [ questionData, setQuestionData] = useState(null);
    const [ choiceBoxesData,setChoiceBoxesData] = useState(null);
    const [checkBoxState,setCheckBoxState] = useState(0);

    const [ replyConfirmed,setReplyConfirmed] = useState(false);
    const [ confirmedResult,setConfirmedResult] = useState(null)

    const [showError,setShowError] = useState(false)



    // re render upon checkbox select ........................................................
    const checkboxChange = (index) => {
        if(!replyConfirmed){
            let updatedCheckBox = choiceBoxesData;
            updatedCheckBox[`choice${index}`].value = !(choiceBoxesData[`choice${index}`].value);
            setChoiceBoxesData(updatedCheckBox)
            setCheckBoxState(checkBoxState + 1)
        }
    };


    // check if something is selected and call anwser check
    const verifyAndGoToNext = () => {
        let isAnySelected = false;
        (questionData.choices).forEach((choice,index) => {
            if(choiceBoxesData[`choice${index}`].value){
                isAnySelected = true;
            }
        });

        if(isAnySelected && !replyConfirmed){
            setReplyConfirmed(true)
        }else if(!isAnySelected && !replyConfirmed){
            callVanishingError();
        }
    }

    // Upon Confirm, get class to show if question is correct
       const getIsCorrectClass = (index) => {
        let isCorrect = choiceBoxesData[`choice${index}`].isValid;
        if(replyConfirmed){
            return `reply-is-${isCorrect}`
        }else{
            return ''
        }
    }

    //Show message if it is correct or not, and add to confirmed reply obj
    const checkIfSelectedReplyIsCorrect = () => {
        let everythingCorrect = true;
        (questionData.choices).forEach((choice,index) => {
            if(choiceBoxesData[`choice${index}`].value !== choice.isValid){
                everythingCorrect = false;
            }
        });        
        if(confirmedResult === null){
            setConfirmedResult(everythingCorrect)
            updateTotalPoints({correct:everythingCorrect,points:questionData.points})
        }
        if(everythingCorrect){
            return <span className="message-is-true">Everything is Correct, good job.</span>
        }else if(!everythingCorrect){
            return <span className="message-is-false">Sorry, seems like you missed something.</span>
        }
    }

    //Go to next question
    const callNextQuestion = () => {
        nextQuestion();
    }

    //Show custom error modal
    const callVanishingError = () =>{
        if(!showError){
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 2000);

        }
    
    }


    return(
        <Fragment>
            {showError &&
                <div className="qz-global-error">
                    <p>It is mandatory to select an option in order to advance</p>
                </div>
            }
            {questionData &&
                <Fragment>
                           {replyConfirmed &&
                 <div className="block">
                 <h2>{checkIfSelectedReplyIsCorrect()}</h2>
             </div>
            }
                    <p className="qz-quizz-questions-question">{questionData.question}</p>

                    
                    <FormControl component="fieldset" key={checkBoxState}>
                        <FormGroup>
                        {(questionData.choices).map((choice, index) => (
                        <FormControlLabel key={index} className={ getIsCorrectClass(index)}
                            control={<Checkbox checked={choiceBoxesData[`choice${index}`].value}  onChange={() => checkboxChange(index)} name={choice.choice} />}
                            label={choice.choice}
                        />
                        ))}
                        </FormGroup>
                    </FormControl>


                    <div className="block">
                    {!replyConfirmed &&
                        <button  className="qz-quizz-questions-check" onClick={() => {verifyAndGoToNext()}}>Confirm and Check</button>
                    }
                    {replyConfirmed &&
                        <Fragment>
                            <button className="qz-quizz-questions-next" onClick={() => callNextQuestion() }>Next</button>
                       

                        </Fragment>
                    }
                    </div>
                   
 

                </Fragment>
            }
     

        </Fragment>
    )
}


export default MultiChoice;