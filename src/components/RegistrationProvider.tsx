// RegistrationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RegistrationContextType {
  registrationStatus: string | null;
  setRegistrationStatus: (status: string | null) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);

  return (
    <RegistrationContext.Provider value={{ registrationStatus, setRegistrationStatus }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
