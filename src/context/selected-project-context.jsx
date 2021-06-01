import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_SELECTED_PROJECT } from '../constants/index';

export const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(
    DEFAULT_SELECTED_PROJECT,
  );

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
