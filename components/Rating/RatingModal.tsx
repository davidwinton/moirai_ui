import React, { useEffect, useState } from "react";
import { Ratings } from "types/types";

type RatingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ratings: Ratings) => void; // Passed from the parent
  title?: string;
  currentRatings?: Ratings;
};

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit, title, currentRatings }) => {
    
  const [ratings, setRatings] = useState<Ratings>({
    quality: 3,
    fit: 3,
    team: "", // Default to blank
    investors: "", // Default to blank
  });

  useEffect(() => {
    if (currentRatings) {
      setRatings(currentRatings);
    }
  }, [currentRatings]);

  const handleChange = (field: keyof Ratings, value: string) => {
    const numValue = value === "" ? "" : parseInt(value, 10);
    if (numValue === "" || (numValue >= 0 && numValue <= 5)) {
      setRatings((prev) => ({
        ...prev,
        [field]: numValue, // Only update if within range or blank
      }));
    }
  };

  const isValid = () => {
    return (
      ratings.quality >= 0 &&
      ratings.quality <= 5 &&
      ratings.fit >= 0 &&
      ratings.fit <= 5 &&
      (ratings.team === "" || (ratings.team >= 0 && ratings.team <= 5)) &&
      (ratings.investors === "" || (ratings.investors >= 0 && ratings.investors <= 5))
    );
  };

  const handleSubmit = () => {
    if (!isValid()) return;
    onSubmit(ratings); // Call parent-provided function
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Rate {title || "this Company"}</h2>
        <form className="space-y-4">
          {["Quality", "Fit", "Team", "Investors"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="font-medium">{field}:</label>
              <input
                type="number"
                min="0"
                max="5"
                value={ratings[field.toLowerCase() as keyof Ratings] || ""}
                onChange={(e) => handleChange(field.toLowerCase() as keyof Ratings, e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </form>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleSubmit}
            disabled={!isValid()}
            className={`px-4 py-2 text-white rounded-lg ${
              isValid() ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
