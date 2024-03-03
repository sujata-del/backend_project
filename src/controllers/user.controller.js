import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from"../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js";
const registerUser= asyncHandler(async (req,res)=>{
//   get details from user
// validation-not empty
// check if user already exists
// check if user alreay exists: username,email
// check for images, check for avatar
// upload them to cloudinary
// create user object-create entry in database
// remove password and  refresh token field from response
// checkfor user creation
// return res

const{fullName,email,username,password}= req.body
console.log("email:",email);
// if(fullName===""){
//     throw new ApiError(400,"fullname is required")
// }

if(
    [fullName,email,username,password].some((field)=>
    field?.trim()=="")
){
    throw new ApiError(400,"All fields are required")
}
const existedUser= User.findOne({
    $or: [{username},{email}]
})
if(existedUser){
    throw new ApiError(409,"User with email or username already exists")
}
  const avatarLocalPath = req.files?.avatar[0]?.path;
  req.files?.coverImage[0]?.path;
  const coverImageLocalPath= req.files?.coverImage[0]?.
  path;

  if(!avatarLoaclPath){
    throw new ApiError(400,"Avatar file  is required")
  }
 const avatar = await uploadOnCloudinary(avatarLocalpath)
 const coverImage= await uploadOnCloudinary
 (coverImageLoaclPath)

 if(!avatar){
    throw new ApiError(400,"Avatar file is required")
 }
 User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
 })
 const createUser= await User.findById(user._id).select(
    "-password-refreshToken"
 )
 if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
 }

return res.status(201).json(
    new ApiResponse(200,createduser,"User registered Successfully")
)
})

export { 
    registerUser,
}

