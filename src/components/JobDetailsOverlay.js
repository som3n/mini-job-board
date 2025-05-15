import React from 'react';

const JobDetailsOverlay = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ✕
        </button>

        {/* Job Info */}
        <h2 className="text-3xl font-bold text-green-700 mb-2">{job.title}</h2>
        <p className="text-lg font-medium text-gray-800">{job.company}</p>
        <p className="text-gray-600">{job.location}</p>
        <span className="inline-block my-3 px-4 py-1 text-sm bg-green-100 text-green-800 font-semibold rounded-full">
          {job.type}
        </span>

        <div className="text-gray-700 leading-relaxed mt-4 space-y-4">
          {job.description.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {job.jobLink && (
          <a
            href={job.jobLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-green-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Apply Now
          </a>
        )}
      </div>
    </div>
  );
};

export default JobDetailsOverlay;
