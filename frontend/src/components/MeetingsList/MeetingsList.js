import "./MeetingsList.css"
import { useEffect } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import Meeting from "../Meeting/Meeting"
import { getMeetings } from "../../redux/actions/meetingActions"


export default function MeetingsList(){
    const dispatch=useDispatch()
    const meetings=useSelector(state=>state.meeting.meetings,shallowEqual)
    const loading=useSelector(state=>state.meeting.loading,shallowEqual)
    const error=useSelector(state=>state.meeting.error,shallowEqual)

    useEffect(()=>{
        dispatch(getMeetings())        

    },[dispatch])
    
    return (
        <div >
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            <div className="lista-meetings">
                {meetings.length?
                    meetings.map(m=><Meeting key={m.id} meeting={m}></Meeting>):
                    <div className="lista-goala">
                        Nu exista meetinguri
                    </div>
                }
            </div>
        </div>

    )
}