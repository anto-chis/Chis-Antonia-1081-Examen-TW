import { CREATE_MEETING, GET_MEETINGS, GET_MEETING_BY_ID, GET_MEETING_PARTICIPANTS_BY_ID } from "../actions/meetingActions";
import { actionIsPending, actionIsFulfilled, actionIsRejected } from "../utils/promiseActions";

function mapMeetings(meetings){
    return meetings.map(m=>mapMeeting(m))
} 


function mapMeeting(meeting){
    return {
        ...meeting,
        data: new Date(Date.parse(meeting.data))
    };
} 

const INITIAL_STATE={
    meetings: [],
    crtMeeting: null,
    crtMeetingParticipants: [],
    loading:false,
    error: null,
}
export default function (state= INITIAL_STATE,action){
    switch (action.type){
        case actionIsFulfilled(GET_MEETINGS):
            return {
                ...state,
                meetings: mapMeetings(action.payload),
                loading:false,
                error: null
            }
        case actionIsPending(GET_MEETINGS):
        case actionIsPending(CREATE_MEETING):
            return {
                ...state,
                loading:true,
                error: null
            }
        case actionIsRejected(GET_MEETINGS):
        case actionIsRejected(CREATE_MEETING):
            return {
                ...state,
                loading:false,
                error: "A aparut o eroare!"
            }
        case actionIsFulfilled(GET_MEETING_BY_ID):
            return {
                ...state,
                crtMeeting: mapMeeting(action.payload),
                loading: false,
                error: null
            }
        
        case actionIsPending(GET_MEETING_BY_ID):
            return {
                ...state,
                loading: true,
                error: null
            }
            
        case actionIsRejected(GET_MEETING_BY_ID):
            return {
                ...state,
                crtMeeting: null,
                loading: false,
                error: "A aparut o eroare!"
            }
        
        case actionIsFulfilled(GET_MEETING_PARTICIPANTS_BY_ID):
            return {
                ...state,
                crtMeetingParticipants: action.payload,
                loading: false,
                error: null
            }
        
        case actionIsPending(GET_MEETING_PARTICIPANTS_BY_ID):
            return {
                ...state,
                loading: true,
                error: null
            }
            
        case actionIsRejected(GET_MEETING_PARTICIPANTS_BY_ID):
            return {
                ...state,
                crtMeetingParticipants: null,
                loading: false,
                error: "A aparut o eroare!"
            }
        default: return state;
            
    }
}