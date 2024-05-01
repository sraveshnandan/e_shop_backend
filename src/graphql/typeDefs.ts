export const typeDefs = `#graphql
scalar Boolean
scalar UnSignedInt
scalar DateTime
scalar Number

# System Status Type
type SytemUser {
  uid:Int,
  gid:Int
  username:String
  homedir:String
  shell:String
}
type NetWork {
  address:String
  netmask:String
  family:String
  mac:String
  internal:Boolean
  cidr:UnSignedInt
}
type Status {
  os: String,
  arch: String,
  platform: String,
  release: String,
  machine: String,
  memory: UnSignedInt,
  uptime: UnSignedInt,
  user:SytemUser
  network:NetWork
}

# User Type Defination 
type User {
  _id:String!
  full_name:String!
  email:String,
  avatar:media,
  addressess:[Address]
  orders:[OrderRefId],
  cart:[ProductRefId],
  wishlist:[ProductRefId]
  createdAt:DateTime,
  updatedAt:DateTime
}


# product id type 
type ProductRefId {
  product_id:String
}

# order id type 
type OrderRefId {
  order_id:String
}


# address type 
type Address {
  appartment_building_no: Int,
  village_locality: String,
  landmark: String,
  city: String,
  district: String,
  state: String,
  pin_code: Int,
  contact_no: Int,
}

# User avatar type 
type media{
  public_id:String,
  url:String
}

input UserRegistrationInput {
  full_name:String,
  email:String,
  password:String
  avatar:AvatarInput
}

input LoginInput {
  email:String!,
  password:String!
}
# User Avatar Input 
input AvatarInput {
  public_id:String!,
  url:String!
}
# User Responce type 
type UserResponce{
  message:String,
  userData:User,
  token:String,
}
# GraphQl query 
type Query {
  status(secret:String!):Status
  sendOtp(email:String!):String
  login(data:LoginInput):UserResponce
  profile:User
}
# GraphQl Mutation 
type Mutation {
  createUser(data:UserRegistrationInput):UserResponce
  updateProfile(data:UserRegistrationInput):UserResponce
  
}

`;
