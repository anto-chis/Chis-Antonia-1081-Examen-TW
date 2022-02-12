
import { useState } from "react";
import { useDispatch } from "react-redux"
import { createMeeting } from "../../redux/actions/meetingActions";
import "./CreateMeeting.css"


export default function CreateMeeting(){
    const dispatch=useDispatch()

    const [descriere,setDescriere]=useState('')
    const [data,setData]=useState('')
    const [url,setUrl]=useState('')

    const handleClick=()=>{
        dispatch(createMeeting({descriere, url, data}))
    }


    return (
        <div className="create-meeting">

            <input type="datetime-local" placeholder="data" onChange={(e)=>{setData(e.target.value)}}></input>
            <textarea placeholder="descriere" onChange={(e)=>{setDescriere(e.target.value)}}></textarea>
            <input type="url" placeholder="url" onChange={(e)=>{setUrl(e.target.value)}}></input>

            <input className='submit' type="button" value="Adauga" onClick={handleClick}></input>

        </div>

    )
}