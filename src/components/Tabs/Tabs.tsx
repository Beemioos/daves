import React from 'react';
import '../../pages/Auth/Tabs.css';

interface ITabButton {
  id: string;
  title: string;
  selected: string;
  setSelected: (id: string) => void;
}

const TabButton: React.FC<ITabButton> = ({ id, title, selected, setSelected }) => {
  return (
    <button
      className={`tab ${selected === id ? 'active' : ''}`}
      onClick={() => setSelected(id)}
    >
      {title}
    </button>
  );
};

export default TabButton;
