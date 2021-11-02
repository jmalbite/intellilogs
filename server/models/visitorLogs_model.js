import mongoose from 'mongoose';

const visitorLogSchema = mongoose.Schema({
  id_number: String,
  name: String,
  company: String,
  area_visited: String,
  visitor_signature: String,
  purpose: String,
  time_visited: {
    type: Date,
    default: new Date(),
  },
});

const VisitorLogs = mongoose.model('VisitorLogs', visitorLogSchema);

export default VisitorLogs;
