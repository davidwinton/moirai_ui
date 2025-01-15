import React, { useState } from 'react';

type Ratings = {
  quality: number;
  fit: number;
  team: number;
  investors: number;
};

type RatingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ratings: Ratings) => void; // Passed from the parent
};

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [ratings, setRatings] = useState<Ratings>({
    quality: 5,
    fit: 5,
    team: 5,
    investors: 5,
  });

  const handleChange = (field: keyof Ratings, value: number) => {
    setRatings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(ratings); // Call parent-provided function
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Rate the Company</h2>
        <form className="space-y-4">
          {['Quality', 'Fit', 'Team', 'Investors'].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="font-medium">{field}:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={ratings[field.toLowerCase() as keyof Ratings]}
                onChange={(e) =>
                  handleChange(field.toLowerCase() as keyof Ratings, parseInt(e.target.value, 10))
                }
                className="border border-gray-300 rounded-md px-3 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </form>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
