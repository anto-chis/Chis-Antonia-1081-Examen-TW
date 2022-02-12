const express = require("express");
const {Sequelize, DataTypes, Op} = require("sequelize")
const cors = require("cors");
require('express-async-errors');
const MyError = require("./MyError");

const app = express();
const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
})

app.use(cors());
app.use(express.json());

const Meeting = db.define("Meeting", {
    descriere: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len: 3
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isUrl: true
        }
    },
    data: {
        type: DataTypes.DATE,
        allowNull:false,
        validate:{
            dataInViitor(value) {
                if (Date.parse(value)<Date.now()) {
                  throw new Error('Data trebuie sa fie in viitor');
                }
            }
        }
    },
})

const Participant = db.define("Participant", {
    nume: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len: 5
        }
    },
})

Meeting.hasMany(Participant);
// Participant.belongsTo(Meeting);


async function getMeetingById(id){
    const meeting = await Meeting.findOne({where:{id}});
    if(!meeting) throw new MyError(404, "Meeting not found!");
    return meeting;
}
async function getParticipantById(id){
    const participant = await Participant.findOne({where:{id}});
    if(!participant) throw new MyError(404, "Participant not found!");
    return participant;
}

app.get("/meeting", async(req, res)=>{
    const {descriptionLike, onDate, sortDate, pageSize, pageIndex} = req.query;

    const where = {};

    if(descriptionLike){
        where["descriere"]={
            [Op.like]: `%${descriptionLike}%`
        };
    }
    if(onDate) {
        const dayStart = new Date(Number(onDate)).setHours(0, 0, 0, 0);
        const dayEnd = new Date(Number(onDate)).setHours(23, 59, 59, 999);
        console.log(dayStart, dayEnd)
        where["data"]={ 
            [Op.gt]: dayStart,
            [Op.lt]: dayEnd
        };
    }
    const order = [];
    if(sortDate && sortDate == "ASC" || sortDate == "DESC"){
        order.push(["data", sortDate]);
    }

    const paginationData = {};

    if(pageSize && pageIndex!==undefined) {
        const pageS = Number(pageSize);
        const pageI = Number(pageIndex);
        paginationData.offset = pageS*pageI;
        paginationData.limit = pageS;
    }
    console.log(paginationData)

    const meetings = await Meeting.findAll({...paginationData, where, order });
    res.json({result:meetings});
})


app.get("/meeting/:id", async(req, res)=>{
    const {id} = req.params;
    const meeting=await getMeetingById(id);
    res.json({result: meeting});
})

app.post("/meeting", async(req,res)=>{
    const {descriere, url, data} = req.body;

    const meeting = new Meeting({
        descriere, url, data
    })
    await meeting.save();

    res.json({result: meeting})
})

app.put("/meeting/:id", async(req, res)=>{
    const {id} = req.params;
    const {descriere, url, data} = req.body;

    await Meeting.update({descriere, url, data}, {where:{id}})
    const meeting = await getMeetingById(id);
    res.json({result: meeting})

});

app.delete("/meeting/:id", async(req, res)=>{
    const {id} = req.params;
    const n = await Meeting.destroy({where:{id}});
    if(!n) throw new MyError(404, "Meeting not found!");
    res.json({result: true});
});


app.get("/meeting/:meetingID/participanti", async(req, res)=>{
    const {meetingID}=req.params;
    const meeting = await getMeetingById(meetingID);
    const participanti = await meeting.getParticipants();
    res.json({result:participanti});
})

app.get("/meeting/:meetingID/participanti/:participantID", async(req, res)=>{
    const {meetingID, participantID}=req.params;
    const meeting = await getMeetingById(meetingID);
    const participant = await getParticipantById(participantID);
    if(!await meeting.hasParticipant(participant)) throw new MyError(401, "Participant does not belong to the meeting!");
    res.json({result:participant});
})

app.post("/meeting/:meetingID/participanti", async(req, res)=>{
    const {meetingID}=req.params;
    const {nume}=req.body;

    const meeting = await getMeetingById(meetingID);
    const participant = await meeting.createParticipant({nume});
    res.json({result:participant});
});

app.put("/meeting/:meetingID/participanti/:participantID", async(req, res)=>{
    const {meetingID, participantID}=req.params;
    const {nume} = req.body;

    const meeting = await getMeetingById(meetingID);
    const participant = await getParticipantById(participantID);
    if(!await meeting.hasParticipant(participant)) throw new MyError(401, "Participant does not belong to the meeting!");
    await participant.update({nume});
    res.json({result: participant})
});

app.delete("/meeting/:meetingID/participanti/:participantID", async(req, res)=>{
    const {meetingID, participantID}=req.params;

    const meeting = await getMeetingById(meetingID);
    const participant = await getParticipantById(participantID);
    if(!await meeting.hasParticipant(participant)) throw new MyError(401, "Participant does not belong to the meeting!");
    await participant.destroy();
    res.json({result: true})
});


const errorCatchMiddleware = (err,req,res,next)=>{
    if(err.status){
        res.status(err.status).json({message:err.message})
    } else{
        res.status(500).json({message:err.message});
    }
}

app.use(errorCatchMiddleware);

const port = 8080;
app.listen(port, ()=>{
    // db.sync({alter:true});
    console.log(`Server listening on port ${port}`)
})
