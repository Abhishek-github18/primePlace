export const health = (req, res)=>{
    res.json({
        message:'The application is up and running',
        status: 'Ok',
        timestamp: new Date().toISOString()
    })
}