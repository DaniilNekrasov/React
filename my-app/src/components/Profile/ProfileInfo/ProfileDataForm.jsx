import React, { useState } from "react";

const ProfileDataForm = ({ profile, isOwner, onSubmit }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    work: profile.job,
    awards: profile.awards,
    education: profile.education,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onCancel = () => {
    setFormData({
      work: profile.job,
      awards: profile.awards,
      education: profile.education,
    });
    setEditMode(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setEditMode(false);
  };

  return (
    <div className="p-6 rounded-lg">
      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Work
            </label>
            <input
              type="text"
              name="work"
              value={formData.work}
              onChange={handleInputChange}
              className="w-full p-1 border rounded-md text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Awards
            </label>
            <input
              type="text"
              name="awards"
              value={formData.awards}
              onChange={handleInputChange}
              className="w-full p-1 border rounded-md text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Education
            </label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full p-1 border rounded-md text-black"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-700"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Work</h2>
            <p className="text-gray-300">{formData.work}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Awards</h2>
            <p className="text-gray-300">{formData.awards}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Education</h2>
            <p className="text-gray-300">{formData.education}</p>
          </div>
          {isOwner && (
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                onClick={() => setEditMode(true)}
              >
                Edit profile info
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDataForm;
