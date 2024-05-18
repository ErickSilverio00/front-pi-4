import React, { useState } from 'react';
import Pesquisar from './Pesquisar'; // Importe o componente Pesquisar aqui

const FiltrosScreen = () => {
  const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);

  const handleFilterChange = (filter) => {
    setFiltrosSelecionados((prev) => [...prev, filter]);
  };

  return (
    <div>
      {/* Renderize o componente Pesquisar e passe a função handleFilterChange como prop */}
      <Pesquisar onFilterChange={handleFilterChange} />
      
      {/* Renderize os filtros selecionados */}
      <div>
        <h2>Filtros Selecionados:</h2>
        <ul>
          {filtrosSelecionados.map((filtro, index) => (
            <li key={index}>{filtro}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FiltrosScreen;
