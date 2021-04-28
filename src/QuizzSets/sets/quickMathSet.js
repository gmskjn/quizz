export const quickMathSet = {
    setName: 'Quick Math Quizz',
    maxPoints: 10,
    questionsArray: [
        {
            type: 'trueOrFalse',
            question: 'is 2 + 2 = 4?',
            choices: [
                {choice: 'False', isValid: false},
                {choice: 'True', isValid: true},
            ],
            points:5,
        },
        {
            type: 'trueOrFalse',
            question: 'is 4 - 1 = 3',
            choices: [
                {choice: 'True', isValid: true},
                {choice: 'False', isValid: false},
            ],
            points:5,
        },
    ],
    feedbackByPoints: function(points){
        if(points < 5){
            return "You didn't score so well, don't be afraid to take your time"
        }else if(points >= 5 && points < 10){
            return "Good enough, but maybe double check your anwsers"
        }else if (points >= 8){
            return "A scholar in the making, well done."
        }
    }

}