import React, { useState } from 'react';
import RatingModal from './RatingModal';
import { Ratings } from 'types/types';

type RatingsButtonProps = {
  
  onSubmit: (ratings: Ratings) => void; // Passed from the parent
  title?: string;
  currentRatings?: Ratings;

};

const RatingsButton: React.FC<RatingsButtonProps> = ({onSubmit, title, currentRatings}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Rate
      </button>
      <RatingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={onSubmit} // Pass custom submit handler
        title={title}
        currentRatings={currentRatings}
      />
    </div>
  );
};

export default RatingsButton;
