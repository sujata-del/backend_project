const asyncHandler =(requestHandler) => {
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}


export {asynchandler}










// const asyncHandler =()=>{}

// export {asyncHandler}
// const asyncHandler =(fn) => async (req,res,nextn) =>{
//     try{
//         await fn(req,res,next)
//     }
//  catch(Error){
//     res.ststus(err.code|| 500).json({
//         success:false,
//         message:err.message

//     })
//  }
// }