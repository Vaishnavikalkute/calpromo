import React, { useState } from "react";

export const Modal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim() !== "") {
      onSave(title);
      setTitle("");
    }
    onClose(); // close the modal after saving
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4">New Event</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 rounded mb-4"
        />
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-red-500 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
