import React from 'react';

const truncate = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const JobCard = ({ job, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 flex flex-col justify-between max-w-md min-w-[28vw] mx-auto my-4">
      <div>
        <h2 className="text-2xl font-semibold text-green-700 mb-2">{job.title}</h2>
        <p className="text-gray-700 font-medium mb-1">{job.company}</p>
        <p className="text-gray-500 mb-3">{job.location}</p>
        <span className="inline-block px-4 py-1 text-sm rounded-full bg-green-100 text-green-800 font-semibold">
          {job.type}
        </span>

        <p className="mt-4 text-gray-600 leading-relaxed">
          {truncate(job.description, 70)}
        </p>
      </div>

      <button
        onClick={() => onViewDetails(job)}
        className="mt-6 inline-block self-start bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-700 transition-colors duration-300"
      >
        View Details
      </button>
    </div>
  );
};

export default JobCard;
