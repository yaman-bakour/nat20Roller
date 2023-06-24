import React, { Component } from 'react';
import Logs from "./logs";

const Roll = () => {

    const [dice , setDice] = React.useState({"20" : 0 , "100" : 0, "12" : 0 , "10" : 0 ,
                                            "8" : 0 , "6" : 0 , "4" : 0})

    const [rollLog , setRollLog] = React.useState([])

    const [rollDetails , setRollDetails] = React.useState([])

    const [advantage , setAdvantage] = React.useState(false)

    const [disadvantage , setDisadvantage] = React.useState(false)

    const [logWidth , setLogWidth] = React.useState(0);

    const [abilityMods , setAbilityMods] = React.useState({
        "Acrobatics":0,
        "Animal Handling" : 0,
        "Arcana" : 0,
        "Athletics" : 0,
        "Deception" : 0,
        "History" : 0,
        "Insight" : 0,
        "Intimidation" : 0,
        "Investigation" : 0,
        "Medicine" : 0,
        "Nature" : 0,
        "Perception" : 0,
        "Performance" : 0,
        "Persuasion" : 0,
        "Religion" : 0,
        "Sleight of Hand" : 0,
        "Stealth" : 0,
        "Survival" : 0
    }); //save to storage

    const [saveMods, setSaveMods] = React.useState({
        "Int" : 0,
        "Dex" : 0,
        "Str" : 0,
        "Wis" : 0,
        "Con" : 0,
        "Cha" : 0
}); //save to storage

    const [changingMods , setChangingMods] = React.useState(false);

    const [maxHP , setMaxHP] = React.useState(0)

    const [changingHP , setChangingHP] = React.useState(false)

    const [spellSlots , SetSpellSlots] = React.useState({
        "1st" : 0,
        "2nd" : 0,
        "3rd" : 0,
        "4th" : 0,
        "5th" : 0,
        "6th" : 0,
        "7th" : 0,
        "8th" : 0,
        "9th" : 0
    }); //save to storage

    const [changingSpellSlots , setChangingSpellSlots] = React.useState(false)

    let ability = ["Acrobatics","Animal Handling","Arcana","Athletics",
    "Deception","History","Insight","Intimidation","Investigation",
    "Medicine","Nature","Perception","Performance","Persuasion","Religion"
    ,"Sleight of Hand","Stealth","Survival"];

    let saves = ["Int","Dex","Str","Wis","Con","Cha"];

    let slots = ["1st" , "2nd" , "3rd" , "4th" , "5th" , "6th" , "7th" , "8th" , "9th"]

    function handleAdd(event){
        const {id} = event.target.parentNode

        setDice(prev => {
            return {...prev , [id] : parseInt(prev[`${id}`]) + 1}
        })
    }

    function handleDec(event){
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

    function roll20(event){
        let {textContent} = event.target
        let mod;

        if(textContent in abilityMods){
            mod = parseInt(abilityMods[textContent]);
        }else{
            mod = parseInt(saveMods[textContent]);
        }

        if(advantage == true){
            let roll1 = randomRoll(20);
            let roll2 = randomRoll(20);
            let currentRollDetails = [];

            currentRollDetails.push(roll1)
            currentRollDetails.push(roll2);
            setRollDetails(prev => { let a = [...prev]
                a.push(currentRollDetails);
                return a;
            })

            let highRoll = Math.max(...currentRollDetails);
            highRoll += mod;
            setRollLog(prev => {let currentlog = [...prev]
                currentlog.push(highRoll)
            return currentlog})

        }else if(disadvantage == true){
            let roll1 = randomRoll(20);
            let roll2 = randomRoll(20);
            let currentRollDetails = [];

            currentRollDetails.push(roll1)
            currentRollDetails.push(roll2);
            setRollDetails(prev => { let a = [...prev]
                a.push(currentRollDetails);
                return a;
            })

            let lowRoll = Math.min(...currentRollDetails)
            lowRoll += mod
            setRollLog(prev => {let currentlog = [...prev]
                currentlog.push(lowRoll)
            return currentlog})

        }else{
            let roll = randomRoll(20);
            let currentRollDetails = [];

            currentRollDetails.push(roll);
            setRollDetails(prev => { let a = [...prev]
                a.push(currentRollDetails);
                return a;
            })

            let totalRoll = currentRollDetails.reduce((total , roll) => {
                return total + roll;
            },0)

            totalRoll += mod;
            setRollLog(prev => {let currentlog = [...prev]
                        currentlog.push(totalRoll)
                    return currentlog})
        }

    }

    function changeHP(){
        setChangingHP(prev => !prev)
    }

    function handleChangeHP(event){
        let {value} = event.target;

        setMaxHP(value);

        //save maxhp to storage
    }

    function handleChangingMods(){
        setChangingMods(prev => !prev);
    }

    function handleSaveMods(event){
        const {name,value} = event.target
        
        setSaveMods(prev => ({...prev , [name] : value}))

        //save mods to storage
    }

    function handleAbilityMods(event){
        const {name,value} = event.target

        setAbilityMods(prev => ({...prev , [name] : value}))

        //save mods to storage

    }

    function handleChangingSpellSlots(){
        setChangingSpellSlots(prev => !prev)
    }

    function handleSpellSlots(event){
        let {name , value} = event.target;

        SetSpellSlots(prev => {
            let a = {...prev , [name] : value}
            return a
        })

        //save max spell slots
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
        <div className='app'>
            <div className='dice-buttons text-light' id='dice-buttons'>
                <div className='row justify-content-center no-gutters m-2 ' id='20'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["20"]}d20</div>
                    <button onClick={handleAdd} className='btn btn-sm btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 ' id='100'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["100"]}d100</div>
                    <button onClick={handleAdd} className='btn btn-sm btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 ' id='12'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["12"]}d12</div>
                    <button onClick={handleAdd} className='btn btn-sm btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 ' id='10'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["10"]}d10</div>
                    <button onClick={handleAdd} className='btn btn-sm  btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 ' id='8'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["8"]}d8</div>
                    <button onClick={handleAdd} className='btn btn-sm  btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 ' id='6'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["6"]}d6</div>
                    <button onClick={handleAdd} className='btn btn-sm btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 ' id='4'>
                    <button onClick={handleDec} className='btn btn-sm btn-danger'>-</button>
                    <div className='m-1'>{dice["4"]}d4</div>
                    <button onClick={handleAdd} className='btn btn-sm btn-success'>+</button>
                </div>
                <div className='row no-gutters justify-content-center m-2 '>
                    <button onClick={rollDice} className='roll btn btn-success'>Roll the dice</button>
                </div>
            </div>

            <div className='d-flex justify-content-end w-100'>
                <div className='condition' style={{width : window.innerWidth - logWidth}}>
                    <div className='hp row no-gutters w-100 pr-2'>
                        <input className='col-4' type="text" />
                        {changingHP ? <input className='col-5 maxHP font-weight-bold' value={maxHP} type='text' onChange={handleChangeHP}/> : <span className='col-5 maxHP font-weight-bold'>/{maxHP}</span>}
                        <button className='col-3 btn btn-outline-secondary' onClick={changeHP}>set</button>
                    </div>
                    <div className={`advantage font-weight-bold ${advantage ? "active" : ""}`} onClick={setConditionAdvantage}>Advantage</div>
                    <div className={`disadvantage font-weight-bold ${disadvantage ? "active" : ""}`} onClick={setConditionDisadvantage}>Disadvantage</div>
                </div>
            </div>

            <div className='roll-log'>
                    <Logs 
                    rollLog = {rollLog}
                    rollDetails = {rollDetails}
                    logWidth={logWidth}/>
            </div>


            <button className='btn btn-outline-danger mb-3' onClick={handleChangingMods}>{changingMods? "Save" : "Change"} Mods</button>
            

            <p style={{fontSize : 20}}>Saving Throws:</p>
            <div className='Saves row no-gutters' style={{width : logWidth}}>
                {saves.map(a => 
                    <div className={`${a} mb-3 col-6 row no-gutters`} key={a}>
                        <button className='col-6 btn btn-outline-secondary' onClick={roll20}>{a}</button>
                        {changingMods ? 
                    <input className='col-6' name={a} value={saveMods[a]} onChange={handleSaveMods} type="text" /> : <span className='mod col-6 pt-2 pl-2'>{saveMods[a]}</span>}
                </div>
                )}
            </div>

            <p style={{fontSize : 20}}>Ability checks:</p>
            <div className='checks pb-1 row no-gutters' style={{width : logWidth}}>
                {ability.map(a =>
                    <div className={`${a} mb-3 col-6 row no-gutters`} key={a}>
                        <button className='col-9 btn btn-outline-secondary' onClick={roll20}>{a}</button>{changingMods ? 
                        <input className='col-3' name={a} value={abilityMods[a]} type="text" onChange={handleAbilityMods}/> : <span className='mod col-3 pt-2 pl-2'>{abilityMods[a]}</span>}
                    </div>
                )}            
            </div>

            <div className='spell-slots w-75'>
                <button className='btn btn-outline-secondary mb-3' onClick={handleChangingSpellSlots}>{changingSpellSlots ? "Save max spell slots" : "Change max spell slots"}</button>
                {slots.map(a => 
                    <div className={`${a} row no-gutters`} key={a}>
                        <div className='col-6'>{a} lvl spell slots:</div>
                        <input type="text" className='col-3'/>
                        {changingSpellSlots ? <input type='text' value={spellSlots[a]} name={a} onChange={handleSpellSlots} className='col-2'/>: <span className='col'>/{spellSlots[a]}</span>}
                    </div>
                )}
            </div>

        </div>
     );
}
 
export default Roll;