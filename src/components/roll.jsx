import React, { Component } from 'react';
import Logs from "./logs";

const Roll = () => {

    const [dice , setDice] = React.useState({"20" : 0 , "100" : 0, "12" : 0 , "10" : 0 ,
                                            "8" : 0 , "6" : 0 , "4" : 0})

    const [rollLog , setRollLog] = React.useState([])

    const [rollDetails , setRollDetails] = React.useState([])

    const [advantage , setAdvantage] = React.useState(false)

    const [disadvantage , setDisadvantage] = React.useState(false)

    const [logWidth , setLogWidth] = React.useState()

    function handleAdd(event){
        const {target} = event;
        const {id} = event.target.parentNode

        setDice(prev => {
            return {...prev , [id] : parseInt(prev[`${id}`]) + 1}
        })
    }

    function handleDec(event){
        const {target} = event;
        const {id} = event.target.parentNode
        
        if(dice[`${id}`] > 0){
        setDice(prev => {
            return {...prev , [id] : parseInt(prev[`${id}`]) - 1}
        })}
    }

    function randomRoll(max){
        let roll = Math.ceil((Math.random() * max));
        return roll
    }

    function rollDice(){
        let currentRollDetails = [];


        for(let i=0; i < dice["20"] ; i++){
            let die = randomRoll(20);
            currentRollDetails.push(die);
        }

        for(let i=0; i < dice["100"] ; i++){
            let die = randomRoll(100);
            currentRollDetails.push(die);
        }

        for(let i=0; i < dice["12"] ; i++){
            let die = randomRoll(12);
            currentRollDetails.push(die);
        }

        for(let i=0; i < dice["10"] ; i++){
            let die = randomRoll(10);
            currentRollDetails.push(die);
        }

        for(let i=0; i < dice["8"] ; i++){
            let die = randomRoll(8);
            currentRollDetails.push(die);
        }

        for(let i=0; i < dice["6"] ; i++){
            let die = randomRoll(6);
            currentRollDetails.push(die);
        }

        for(let i=0; i < dice["4"] ; i++){
            let die = randomRoll(4);
            currentRollDetails.push(die);
        }

        setRollDetails((prev) => {let a = [...prev]
            a.push(currentRollDetails);
            return a;
        })

        if(advantage == false && disadvantage == false){
            let totalRoll = currentRollDetails.reduce((total , die) => {
                return total + die;
            },0)
            setRollLog(prev => {let currentlog = [...prev]
                        currentlog.push(totalRoll)
                    return currentlog})

        }else if(advantage == true){
            let highRoll = Math.max(...currentRollDetails)
            setRollLog(prev => {let currentlog = [...prev]
                currentlog.push(highRoll)
            return currentlog})
        }else if(disadvantage == true){
            let lowRoll = Math.min(...currentRollDetails)
            setRollLog(prev => {let currentlog = [...prev]
                currentlog.push(lowRoll)
            return currentlog})
        }

        setDice({"20" : 0 , "100" : 0, "12" : 0 , "10" : 0 ,
        "8" : 0 , "6" : 0 , "4" : 0})
    }

    function setConditionAdvantage(){
        if (advantage == true){
            setAdvantage(false)
        }else{
            setAdvantage(true)
            setDisadvantage(false)
        }
    }

    function setConditionDisadvantage(){
        if (disadvantage == true){
            setDisadvantage(false)
        }else{
            setAdvantage(false)
            setDisadvantage(true)
        }
    }

    React.useEffect(() => {
        let diceButtons = document.getElementById("dice-buttons")
        let styles = window.getComputedStyle(diceButtons);
        setLogWidth(window.innerWidth - parseInt(styles.width));

        window.addEventListener("resize" , () => {
            let diceButtons = document.getElementById("dice-buttons")
            let styles = window.getComputedStyle(diceButtons);
            setLogWidth(window.innerWidth - parseInt(styles.width));
        })
    },[])

    return ( 
        <div className='app pt-5'>
            <div className='dice-buttons text-light' id='dice-buttons'>
                <div className='row justify-content-center no-gutters m-2 mb-4' id='20'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["20"]}d20</div>
                    <button onClick={handleAdd} className='btn btn-sm btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 mb-4' id='100'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["100"]}d100</div>
                    <button onClick={handleAdd} className='btn btn-sm btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 mb-4' id='12'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["12"]}d12</div>
                    <button onClick={handleAdd} className='btn btn-sm btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 mb-4' id='10'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["10"]}d10</div>
                    <button onClick={handleAdd} className='btn btn-sm  btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 mb-4' id='8'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["8"]}d8</div>
                    <button onClick={handleAdd} className='btn btn-sm  btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 mb-4' id='6'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["6"]}d6</div>
                    <button onClick={handleAdd} className='btn btn-sm btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 mb-4' id='4'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["4"]}d4</div>
                    <button onClick={handleAdd} className='btn btn-sm btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 mb-4'>
                    <button onClick={rollDice} className='roll btn btn-success'>Roll the dice</button>
                </div>
            </div>

            <div className='condition row w-100'>
                <button className={`col btn btn-outline-success font-weight-bold ${advantage ? "active" : ""}`} onClick={setConditionAdvantage} onTouchEnd={setConditionAdvantage}>Advantage</button>
                <button className={`col btn btn-outline-danger ${disadvantage ? "active" : ""}`} onClick={setConditionDisadvantage} onTouchEnd={setConditionDisadvantage}>disadvantage</button>
            </div>

            <div className='roll-log' style={{}}>
                    <Logs 
                    rollLog = {rollLog}
                    rollDetails = {rollDetails}
                    logWidth={logWidth}/>
            </div>
        </div>
     );
}
 
export default Roll;