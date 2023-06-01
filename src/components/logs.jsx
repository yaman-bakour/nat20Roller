import React, { Component } from 'react';

const Logs = (props) => {
    let {rollLog , rollDetails , logWidth} = props

    React.useEffect(() => {
        let logs = document.getElementById("log");

        logs.scrollTop = logs.scrollHeight // scrolls to the bottom of log element
    })

    return ( 
        <div className='log' id="log" style={{maxWidth : logWidth , height : window.innerHeight - 48}}>
            {rollDetails.map((a,b) => {
                let logResult = a.reduce((result , die) => {
                    return result += die + " + "
                },"")

                let details = logResult.slice(0,-2);

                details += " ="

                let result = rollLog[b]

                return <React.Fragment key={b}>
                    <p className='border border-dark text-muted p-2 m-0' style={{fontSize : 20}}>{details}</p>
                    <p className='border border-dark p-2 m-0' style={{fontSize : 30}}>{result}</p>
                </React.Fragment>
            })}
        </div>
    );
}
 
export default Logs;