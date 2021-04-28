export const animalSet = {
    setName: 'All About Monkeys',
    maxPoints: 10,
    questionsArray: [
        {
            type: 'multiChoice',
            question: 'Select those that are true( when it comes to monkeys):',
            choices: [
                {choice: 'apes together strong', isValid: true},
                {choice: 'apes together weak', isValid: false},
                {choice: 'apes are cool', isValid: true},
            ],
            points:2,
        },
        {
            type: 'trueOrFalse',
            question: 'True or False: can monkeys fly?',
            choices: [
                {choice: 'yes', isValid: false},
                {choice: 'no', isValid: true},
            ],
            points:2,
        },
        {
            type: 'trueOrFalse',
            question: 'True or False: can monkeys dance?',
            choices: [
                {choice: 'no', isValid: false},
                {choice: 'yes', isValid: true},
            ],
            points:2,
        },
        {
            type: 'trueOrFalse',
            question: 'Select the correct choice: can monkeys breakdance?',
            choices: [
                {choice: 'hell no', isValid: false},
                {choice: 'no', isValid: false},
                {choice: 'yes, it is known', isValid: true},
            ],
            points:2,
        },
        {
            type: 'multiChoice',
            question: 'Select those that are false( when it comes to monkeys):',
            choices: [
                {choice: 'apes are evil', isValid: true},
                {choice: 'apes together weak', isValid: true},
                {choice: 'apes are cool', isValid: false},
            ],
            points:2,
        },
    ],
    feedbackByPoints: function(points){
        if(points < 2){
            return "you could read a bit more about animals"
        }else if(points >= 2 && points < 8){
            return "Looks like you know a lot about animals"
        }else if (points >= 8){
            return "Didn't know you were an expert, well done."
        }
    }

}