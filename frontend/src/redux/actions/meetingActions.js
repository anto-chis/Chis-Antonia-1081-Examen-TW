import { createMeetingL, deleteMeetingL, deleteParticipantL, getMeetingByIdL, getMeetingParticipantsByMeetingIDL, getMeetingsL } from "../../logic/meetingLogic";

export const GET_MEETINGS="GET_MEETINGS";
export const CREATE_MEETING="CREATE_MEETING";
export const GET_MEETING_BY_ID="GET_MEETING_BY_ID";
export const GET_MEETING_PARTICIPANTS_BY_ID="GET_MEETING_PARTICIPANTS_BY_ID";
export const DELETE_PARTICIPANT="DELETE_PARTICIPANT"
export const DELETE_MEETING="DELETE_MEETING"

export function getMeetings(){
    return {
        type: GET_MEETINGS,
        payload: async function(){
            return await getMeetingsL()
        }
    };
    
    
}

export function getMeetingById(id){
    return {
        type: GET_MEETING_BY_ID,
        payload: async function(){
            return await getMeetingByIdL(id)
        }
    };
    
}

export function getMeetingParticipantsByMeetingID(id){
    return {
        type: GET_MEETING_PARTICIPANTS_BY_ID,
        payload: async function(){
            return await getMeetingParticipantsByMeetingIDL(id)
        }
    };
    
}

export function createMeeting(meeting){
    return async(dispatch,getState)=>{
        
        await dispatch({
            type: CREATE_MEETING,
            payload: async function(){
                return await createMeetingL(meeting)
            }
        });

        await dispatch({
            type: GET_MEETINGS,
            payload: async function(){
                return await getMeetingsL()
            }
        })
            
    };
    
}

export function deleteMeeting(id){
    return async(dispatch,getState)=>{
        
        await dispatch({
            type: DELETE_MEETING,
            payload: async function(){
                return await deleteMeetingL(id)
            }
        });

        await dispatch({
            type: GET_MEETINGS,
            payload: async function(){
                return await getMeetingsL()
            }
        })
            
    };
    
}

export function deleteParticipant(mID, pID){
    return async(dispatch,getState)=>{
        
        await dispatch({
            type: DELETE_PARTICIPANT,
            payload: async function(){
                return await deleteParticipantL(mID, pID)
            }
        });

        await dispatch({
            type: GET_MEETING_PARTICIPANTS_BY_ID,
            payload: async function(){
                return await getMeetingParticipantsByMeetingIDL(mID)
            }
        })
            
    };
    
}
