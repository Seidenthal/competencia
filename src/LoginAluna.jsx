import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginAluna = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/alunas/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (res.ok) {
        console.log(response);
        alert('Login bem-sucedido!');
        // Redirecionar para o dashboard ou outra rota
        window.location.href = '/tutoriaPageAluna';
      } else {
        alert(response.message || 'Erro ao fazer login.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro no servidor. Tente novamente.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-300">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login Alunas
        </h2>
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
                maxLength: {
                  value: 20,
                  message: 'A senha não pode exceder 20 caracteres.',
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-customOrange"
          >
            <Link to ="/homePageAluna">
            Login
            </Link>
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Não possui uma conta?{' '}
          <Link to="/registerAluna" className="text-blue-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginAluna;
