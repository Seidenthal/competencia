import React from 'react';

const InfoWindow = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Informações da Conta</h2>
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefone:</strong> {user.telefone}</p>
        <p><strong>CPF:</strong> {user.cpf}</p>
        <p><strong>RA:</strong> {user.ra}</p>
        <p><strong>Curso:</strong> {user.curso}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default InfoWindow;