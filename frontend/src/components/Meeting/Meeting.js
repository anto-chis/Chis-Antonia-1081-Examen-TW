import { Link } from "react-router-dom";
import "./Meeting.css"
import { useDispatch } from "react-redux"
import { deleteMeeting } from "../../redux/actions/meetingActions";

export default function Meeting(params){
    const dispatch=useDispatch()

    const {meeting} = params;
    if(!meeting)return(<></>);

    const {descriere, url, data, id} = meeting;


    const formatData = (data)=>`${data.getFullYear()}/${data.getMonth()+1}/${data.getDate()}`

    const deleteClick=(id)=>{
        dispatch(deleteMeeting(id));
    }
    return (
        <div className="meeting">
            <Link to={`/meeting/${id}`}><div className="data">{formatData(data)}</div></Link>
            <div className="descriere">{descriere}</div>
            <a className="url" target="_blank" href={url}>{url}</a>
            <button onClick={()=>{deleteClick(id)}}>STERGE</button>
        </div>
    )
}