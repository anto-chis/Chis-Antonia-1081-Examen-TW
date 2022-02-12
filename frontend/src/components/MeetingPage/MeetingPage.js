import "./MeetingPage.css"
import { useEffect } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { deleteParticipant, getMeetingById, getMeetingParticipantsByMeetingID } from "../../redux/actions/meetingActions"
import Meeting from "../Meeting/Meeting"


export default function MeetingPage(){
    const dispatch=useDispatch()
    const crtMeeting=useSelector(state=>state.meeting.crtMeeting,shallowEqual)
    const crtMeetingParticipants=useSelector(state=>state.meeting.crtMeetingParticipants,shallowEqual)
    const {id}=useParams();

    useEffect(()=>{
        dispatch(getMeetingById(id))        
        dispatch(getMeetingParticipantsByMeetingID(id))        
    },[dispatch, id])



    if(!crtMeeting || !crtMeetingParticipants) return (<><Link to="/">ACASA</Link><br/>Error!</>)

    const deleteClick=(pID)=>{
        dispatch(deleteParticipant(id, pID))
    }
    
    return (
        <div className="meeting-page">
            <Link to="/">ACASA</Link>
           <Meeting meeting={crtMeeting}></Meeting>
           <ul className="lista-participanti">
               PARTICIPANTI:
                {crtMeetingParticipants.length?
                    crtMeetingParticipants.map(p=><li key={p.id}>{p.nume} <button onClick={()=>{deleteClick(p.id)}}>STERGE</button></li>):
                    <div className="lista-goala">
                        Nu exista participanti
                    </div>
                }
           </ul>
        </div>

    )
}