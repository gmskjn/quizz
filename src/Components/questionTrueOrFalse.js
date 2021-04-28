//react components .........
import React, { Fragment, useState,useEffect } from 'react';


//material components........
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';





const TrueOrFalse = ({question,nextQuestion,updateTotalPoints}) => {

    // Control and Variables.......................
    
    useEffect(() => {
        setQuestionData(question)
    }, [question]);

    const [ questionData, setQuestionData] = useState(null);
    const [ reply,setReply] = useState(null)
    const [ replyConfirmed,setReplyConfirmed] = useState(false);
    const [ confirmedReplyObj,setConfirmedReplyObj] = useState(null)

    const [showError,setShowError] = useState(false)



    
 

    //Set a new selected Option.................................................
    const changeRadioValue = (event) => {
        if(!replyConfirmed){
            setReply(event.target.value)
        }
    }

    // check if something is selected and call anwser check
    const verifyAndGoToNext = () => {
        if(reply != null){
            setReplyConfirmed(true)
        }else{
            callVanishingError();
        }
    }


    // Upon Confirm, get class to show if question is correct
    const getIsCorrectClass = (choiceValue) => {
        let selectedChoice  = questionData.choices.find( function (choice) {
            return choice.choice === choiceValue;
        });
        if(replyConfirmed){
            return `reply-is-${selectedChoice.isValid}`
        }else{
            return ''
        }
    }

    //Show message if it is correct or not, and add to confirmed reply obj
    const checkIfSelectedReplyIsCorrect = () => {
        let selectedReply  = questionData.choices.find( function (choice) {
            return choice.choice === reply;
        });
        if(!confirmedReplyObj){
            setConfirmedReplyObj(selectedReply)
            updateTotalPoints({correct:selectedReply.isValid,points:questionData.points})
        }
        if(selectedReply.isValid){
            return <span className="message-is-true">You are Correct, good job.</span>
        }else{
            return <span className="message-is-false">Sorry, wrong choice.</span>
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
                    <div className="block">
                     <p className="qz-quizz-questions-question">{questionData.question}</p>
                    </div>
                    

                    <FormControl component="fieldset">
                        <RadioGroup aria-label="question" name="questin" value={reply} onChange={changeRadioValue}>
                            {(questionData.choices).map((choice, index) => (
                            <Fragment key={index}> 
                                  <FormControlLabel className={ getIsCorrectClass(choice.choice)} value={choice.choice} control={<Radio />} label={choice.choice} />
                            </Fragment>
                            ))}
                        </RadioGroup>
                    </FormControl>

                    <div className="block">
                    {!replyConfirmed &&
                        <button className="qz-quizz-questions-check" onClick={() => {verifyAndGoToNext()}}>Confirm and Check</button>
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


export default TrueOrFalse;
