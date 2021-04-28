import React, { Fragment, useState,useEffect } from 'react';
import { Redirect, NavLink as Link } from 'react-router-dom';

//get components
import CircularProgress from '@material-ui/core/CircularProgress';

//getSets
import {returnSet} from '../QuizzSets/returnSet';


import TrueOrFalse from '../Components/questionTrueOrFalse';
import MultiChoice from '../Components/questionMultiChoice';






const QuizzView = () => {


    useEffect(() => {
        let quizzId = window.location.hash.substr(1);
        if(quizzId){
            let selectedSet = returnSet(quizzId)
            setTimeout(() => {
                setQuizzData(selectedSet)
                setLoadingQuizz(false);
            }, 1000);
        }else{
            setQuizzData('set-not-found');
            setLoadingQuizz(false);
        }
    }, []);


    const [ loadingQuizz, setLoadingQuizz] = useState(true);
    const [ quizzData, setQuizzData] = useState(null);
    const [ totalPoints, setTotalPoints] = useState(0);
    const [ questionNumber,setQuestionNumber] = useState(-1)

    const nextQuestion = () => {
        setQuestionNumber(questionNumber + 1);
    }

    const renderQuestion = (number) => {
        if(loadingQuizz){
            setLoadingQuizz(false);
        }
        if(quizzData.questionsArray[number].type === 'trueOrFalse'){
            return renderTrueOrFalse(quizzData.questionsArray[number]);
        }
        if(quizzData.questionsArray[number].type === 'multiChoice'){
            return renderMultiChoice(quizzData.questionsArray[number]);
        }
    }

        // Call Components ..........................................................................
        const renderTrueOrFalse = (question) => {
            return (
                <TrueOrFalse question={question}   updateTotalPoints={ (confirmedData) => {checkPointsAndUpdate(confirmedData)}}  nextQuestion={() => { goToNext()}}></TrueOrFalse>
            )
        }
    
        const renderMultiChoice = (question) => {
            return (
                <MultiChoice question={question} updateTotalPoints={ (confirmedData) => {checkPointsAndUpdate(confirmedData)}}  nextQuestion={() => { goToNext()}}></MultiChoice>
            )
        }
    




    // ..........................................
    const goToNext = (data) => {
        setLoadingQuizz(true);
        nextQuestion();
        setTimeout(() => {
            setLoadingQuizz(false);
        }, 700);

    }

    const checkPointsAndUpdate = (data) => {
        if(data.correct){
            setTotalPoints(totalPoints + data.points)
        }
    }

    


    return(
        <div className="qz-quizz">
            

                {/* Page is Loading or Loading Question................................................................................ */}
                {(loadingQuizz || quizzData == null) &&
                    <div className="qz-quizz-loading">
                         <CircularProgress />
                    </div>
                }


                {/* Unable to Find Quizz................................................................................ */}
                 {(!loadingQuizz && quizzData === 'set-not-found') && 
                    <div className="qz-quizz-not-found">
                        <h2>
                            Sorry, set not found
                            <span>😑</span>
                        </h2>
                    </div>
                 }

                 {/* Quizz Loaded............................................................................... */}
                 {(!loadingQuizz && quizzData !== 'set-not-found') && 
                    <div className={ (questionNumber > -1 && !quizzData.questionsArray[questionNumber] ) ? 'qz-quizz-questions-completed' : 'qz-quizz-questions'}  >
                        <div className="block qz-quizz-questions-score">
                            { (questionNumber > -1 && !quizzData.questionsArray[questionNumber] ) ? 'Total' : 'Current'} Score: {totalPoints !== -1 ? totalPoints : 0} / {quizzData.maxPoints}
                        </div>
                        <h1>{quizzData.setName}</h1>

                        {/* Quizz Have Yet To Start............................................................... */}
                        {questionNumber === -1 &&
                            <Fragment>
                                <button className="qz-quizz-questions-start" onClick={() => nextQuestion()}>Start</button>
                            </Fragment>
                        }

                        {/* Quizz Ongoing............................................................... */}
                        { (questionNumber > -1 && quizzData.questionsArray[questionNumber] )&&
                            <div>
                                <h4  className="qz-quizz-questions-question-number"> Question {questionNumber + 1} </h4>
                                {renderQuestion(questionNumber)}
                                
                            </div>
                       
                        }

                        {/* Quizz Done............................................................... */}
                        { (questionNumber > -1 && !quizzData.questionsArray[questionNumber] )&&
                            <Fragment>
                                <p>Congratualtions, you've completed the quizz, your results are:</p>
                                {/* Your total points are {totalPoints}<br></br> */}
                                <p className="heavy">"{quizzData.feedbackByPoints(totalPoints)}"</p>
                                <Link className="qz-quizz-questions-completed-return" to={`/`}> Back Home</Link>
                            </Fragment>
                        }

                    </div>
                 }
        </div>
    )
}


export default QuizzView;