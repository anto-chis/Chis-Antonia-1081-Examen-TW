module.exports= class MyError extends Error{
    constructor(status,message){
        super(message)
        this.status=status;
        this.message=message
    }
}