import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const LoginAdmin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/admins/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      if (res.ok) {
        // Redirecionar para o dashboard do Admin
        navigate('/adminDashboard');
      } else {
        setError(response.message || 'Erro ao fazer login.');
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login do Admin
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-center rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email é obrigatório.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Formato de email inválido.',
                },
              })}
              className={`w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:ring ${
                errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-300'
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="senha"
              className="block text-gray-700 font-semibold mb-2"
            >
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              {...register('senha', {
                required: 'Senha é obrigatória.',
                minLength: {
                  value: 6,
                  message: 'A senha deve ter pelo menos 6 caracteres.',
                },
              })}
              className={`w-full px-3 py-2 border ${
                errors.senha ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:ring ${
                errors.senha ? 'focus:ring-red-500' : 'focus:ring-blue-300'
              }`}
            />
            {errors.senha && (
              <span className="text-red-500 text-sm">
                {errors.senha.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
