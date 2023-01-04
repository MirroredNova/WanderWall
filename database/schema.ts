import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  name: String,
  description: String,
  rating: Number,
});

const GymSchema = new mongoose.Schema({
  name: String,
  overallRating: Number,
  description: String,
  location: String,
  sections: [SectionSchema],
  imagePaths: [String],
});

const gym = mongoose.models.Gym || mongoose.model('Gym', GymSchema);

export default gym;
