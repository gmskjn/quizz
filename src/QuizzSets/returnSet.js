import {animalSet} from './sets/animalSet';
import {quickMathSet} from './sets/quickMathSet';

const loadSet =  (id) => {
    let setsObj = {


       animal_set: animalSet,
       math_set: quickMathSet,


    }
    if(setsObj[id]){
        return setsObj[id];
    }else{
        return 'set-not-found'
    }
    
}



export function returnSet(setId){
    return loadSet(setId)
}