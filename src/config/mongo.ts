import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/stocks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoose;
