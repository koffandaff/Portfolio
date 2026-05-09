import { Schema, model, models, Document } from 'mongoose';

export interface IReview extends Document {
  name: string;
  org?: string;
  role: string;
  rating: number;
  feedback: string;
  avatar?: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name must be 100 characters or less'],
    },
    org: {
      type: String,
      trim: true,
      maxlength: [100, 'Organisation name must be 100 characters or less'],
      default: '',
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
      maxlength: [100, 'Role must be 100 characters or less'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5'],
    },
    feedback: {
      type: String,
      required: [true, 'Feedback message is required'],
      trim: true,
      maxlength: [1000, 'Feedback must be 1000 characters or less'],
    },
    avatar: {
      type: String,
      default: '😊',
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  },
);

// Prevent model re-compilation on hot reload
const Review = models.Review ?? model<IReview>('Review', ReviewSchema);

export default Review;
