import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required']
  },
  username: {
    type: String,
    required: [true, 'username is required'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters."]
  
  },
  image: {
    type: String
  }
})

const Users = models.User || model('User', UserSchema)
export default Users