const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Task's name is required."],
    trim: true,
    maxLength: [50, 'Name Cannot Be More Than 50 Characters.']
  },
  completed: {
    type: Boolean,
    default: false
  }
})
const Task = mongoose.model('Task', taskSchema)

module.exports = Task

// const validator = function(value){
//     return  /wael|wail|ouail/i.test(value)

// }
// taskSchema.path('name').validate(validator,'Name `{VALUE}` is not supported sorry! ','invalid error')