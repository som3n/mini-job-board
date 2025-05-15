import React, { useState } from 'react';

const AddJob = () => {
  const [job, setJob] = useState({
    title: '', company: '', type: '', location: '', description: '', jobLink: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: null, text: '' });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
    setMessage({ type: null, text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, company, type, location, description } = job;
    if (!title || !company || !type || !location || !description) {
      return setMessage({ type: 'error', text: 'Please fill all required fields.' });
    }

    setLoading(true);
    setMessage({ type: null, text: '' });

    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add job');
      }

      setMessage({ type: 'success', text: 'Job added successfully!' });
      setJob({ title: '', company: '', type: '', location: '', description: '', jobLink: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-24 p-6 bg-white">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Post a Job</h2>

      {message.text && (
        <div
          className={`p-3 mb-4 rounded text-sm ${
            message.type === 'error'
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'title', placeholder: 'Job Title' },
          { name: 'company', placeholder: 'Company Name' },
          { name: 'location', placeholder: 'Location' },
          { name: 'jobLink', placeholder: 'Job Link (optional)', type: 'url' },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || 'text'}
            name={field.name}
            value={job[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        ))}

        <select
          name="type"
          value={job.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="">Select Job Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
        </select>

        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          rows={4}
          placeholder="Job Description"
          className="w-full px-3 py-2 border rounded-md resize-y focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-medium transition ${
            loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Add Job'}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
