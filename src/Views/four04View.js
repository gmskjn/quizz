import React from 'react';
import { Redirect, NavLink as Link } from 'react-router-dom';



const Four04View = () => {


    return(
        <div className="qz-404">
                <h1>404</h1>
                <p>This is a bit awkward, but I belive you may have taken a wrong turn.</p>
                <Link className="qz-quizz-questions-completed-return" to={`/`}> Take me Home</Link>
        </div>
    )
}


export default Four04View;