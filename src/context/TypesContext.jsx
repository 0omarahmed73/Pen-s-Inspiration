import { createContext, useState } from "react";

export const TypesContext = createContext();

export const TypesProvider = ({ children }) => {
  const [filters, setFilters] = useState([]);
  const [types, setTypes] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const handleFilters = (filters) => {
    setFilters(filters);
    if (filters === "type") {
      setTypes((types) => {
        return ['مدح' , "حزين", "رعب", "فروسية", "هجاء", "رثاء", "مجون"];
      });
    } else {
      setTypes(false);
      setSelectedType('')
    }
  };

  return (
    <TypesContext.Provider
      value={{ types,filters, handleFilters, setSelectedType , selectedType }}
    >
      {children}
    </TypesContext.Provider>
  );
};
