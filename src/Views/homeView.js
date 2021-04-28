import React, { Fragment, useState } from 'react';
import { Redirect, NavLink as Link } from 'react-router-dom';


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';


const HomeView = () => {


    // Required Data..........................
    const textSteps = [
        { title: 'Welcome to Quizz', text: 'here you can challenge yourself in a variaty of subjects', button: 'I want to challenge myself, tell me more' },
        { title: 'Made by Experts', text: 'All of our challenges are made by experts in the field, here you will only find the best of the best', button: `I'm convinced, let's get Started` },
        { title: 'Select Quizz', text: null, button: 'Go' }
    ]
    const quizzList = [{ name: 'Animals', value: 'animal_set' }, { name: 'Genius', value: 'math_set' }]

    const [textStep, setTextStep] = useState(0);
    const [selectedQuizz, setSelectedQuizz] = useState(quizzList[0].value);



    const backStep = () => {
        if (textStep > 0) {
            setTextStep(textStep - 1)
        }
    }
    const nextStep = () => {
        if (textStep < 2) {
            setTextStep(textStep + 1)
        }
    }

    const changeSelectedQuizz = (event) => {
        let selected = event.target.value;
        setSelectedQuizz(selected)
    }

    const startQuizz = () => {
        return (
            <Redirect to="/admin/" />
        )
    }



    return (
        <Fragment>
            <main className="qz-home-view">


                <div className="block">
                    <h1>{textSteps[textStep].title}</h1>
                </div>

                {textSteps[textStep].text &&
                    <div className="block">

                        <p>{textSteps[textStep].text}</p>
                    </div>
                }

                {textStep === 2 &&
                    <FormControl variant="filled" >
                        <InputLabel htmlFor="filled-age-native-simple">Quizz</InputLabel>
                        <Select
                            native
                            value={selectedQuizz}
                            onChange={changeSelectedQuizz}
                            inputProps={{
                                name: "Quizz",
                                id: "filled-age-native-simple"
                            }}
                        >

                            {quizzList.map((quizz, index) => (
                                <option value={quizz.value}>{quizz.name}</option>
                            ))}

                        </Select>
                    </FormControl>
                }


                <div className="block qz-home-nav">
                   
                        {textStep !== 0 &&
                            <button onClick={() => { backStep() }}>{`<`} Back</button>
                        }
            
                        {textStep !== 2 &&
                            <button onClick={() => { nextStep() }}>{textSteps[textStep].button} {`>`}</button>
                        }
                        {textStep === 2 &&
                            <Link to={`/quizz#${selectedQuizz}`}> Start</Link>
                        }
                      
                </div>
                {textStep !== 2 &&
                    <div className="block">
                        <button className="qz-skip" onClick={() => { setTextStep(2) }}> Skip {`>>`}</button>
                    </div>        
                }


            </main>
        </Fragment>
    )
}


export default HomeView;