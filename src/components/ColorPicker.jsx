import React from 'react';
import { FaTimes } from 'react-icons/fa';

const colors = [
  { background: '#FF5733', text: '#FFFFFF', border: '#C70039' },
  { background: '#33FF57', text: '#000000', border: '#39C700' },
  { background: '#3357FF', text: '#FFFFFF', border: '#0039C7' },
  { background: '#FF33A1', text: '#FFFFFF', border: '#C700A1' },
  { background: '#A133FF', text: '#FFFFFF', border: '#7000C7' }
];

const ColorPickerModal = ({ showModal, setShowModal, setColorScheme }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Pick a Color Scheme</h2>
          <button onClick={() => setShowModal(false)}>
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => {
                setColorScheme(color);
                setShowModal(false);
              }}
              style={{ backgroundColor: color.background, color: color.text, borderColor: color.border }}
              className="w-full h-24 rounded-lg shadow-md flex items-center justify-center border-4"
            >
              <span>Background</span>
              <span>Text</span>
              <span>Border</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPickerModal;
