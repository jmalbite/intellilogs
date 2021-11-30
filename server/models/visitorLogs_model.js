import mongoose from 'mongoose';

const visitorLogSchema = mongoose.Schema({
  employee_code: String,
  name: String,
  company: String,
  area_visited: String,
  visitor_signature: String,
  purpose: String,
  signature: String,
  time_visited: {
    type: Date,
    default: new Date(),
  },
});

const VisitorLogs = mongoose.model('VisitorLogs', visitorLogSchema);

export default VisitorLogs;
