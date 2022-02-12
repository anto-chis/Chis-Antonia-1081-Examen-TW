const SERVER_URL = "http://127.0.0.1:8080"

async function proccessResponse(response){
    const jsonResponse=await response.json();    
    if(jsonResponse.hasOwnProperty("result")){
        return jsonResponse.result;        
    } else if(jsonResponse.hasOwnProperty("message")){
        throw new Error(jsonResponse.message)
    } else{
        throw new Error("Unknown error")
    }
}

export async function getMeetingsL(){
    const response = await fetch(`${SERVER_URL}/meeting`, {
        method: 'GET' 
    });
    return await proccessResponse(response);
}


export async function deleteParticipantL(mID, pID){
    const response = await fetch(`${SERVER_URL}/meeting/${mID}/participanti/${pID}`, {
        method: 'DELETE' 
    });
    return await proccessResponse(response);
}


export async function deleteMeetingL(id){
    const response = await fetch(`${SERVER_URL}/meeting/${id}`, {
        method: 'DELETE' 
    });
    return await proccessResponse(response);
}

export async function getMeetingByIdL(id){
    const response = await fetch(`${SERVER_URL}/meeting/${id}`, {
        method: 'GET' 
    });
    return await proccessResponse(response);
}


export async function getMeetingParticipantsByMeetingIDL(id){
    const response = await fetch(`${SERVER_URL}/meeting/${id}/participanti`, {
        method: 'GET' 
    });
    return await proccessResponse(response);
}

export async function createMeetingL(meeting){
    const response = await fetch(`${SERVER_URL}/meeting`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({            
            descriere:meeting.descriere,
            data:meeting.data,
            url: meeting.url
        })
    });
    return await proccessResponse(response);
} 
