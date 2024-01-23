import mongoose from 'mongoose';

const dbURI = "mongodb+srv://bellacristsantos:Z3Ewa6aOBma29WJY@cluster0.fq1n86h.mongodb.net/usersdb";

mongoose.connect(dbURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

export default mongoose;
