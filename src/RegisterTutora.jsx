
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";

const RegisterTutora = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/tutoras/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (res.ok) {
        alert(
          "Cadastro realizado com sucesso! Aguarde até 5 dias úteis para aprovação."
        );
        reset();
      } else {
        alert(response.message || "Erro ao realizar cadastro.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao realizar cadastro. Tente novamente.");
    }
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-300">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Cadastro de Tutoria
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Nome:</label>
            <input
              type="text"
              {...register("nome", { required: "Nome é obrigatório." })}
              className={`w-full px-3 py-2 border ${
                errors.nome ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring ${
                errors.nome ? "focus:ring-red-500" : "focus:ring-blue-300"
              }`}
            />
            {errors.nome && (
              <span className="text-red-500 text-sm">{errors.nome.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Telefone:</label>
            <Controller
              name="telefone"
              control={control}
              defaultValue=""
              rules={{
                required: "Telefone é obrigatório.",
                pattern: {
                  value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                  message: "Formato inválido. Ex: (XX) XXXXX-XXXX",
                },
              }}
              render={({ field }) => (
                <InputMask
                  {...field}
                  mask="(99) 99999-9999"
                  className={`w-full px-3 py-2 border ${
                    errors.telefone ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:ring ${
                    errors.telefone ? "focus:ring-red-500" : "focus:ring-blue-300"
                  }`}
                  placeholder="(XX) XXXXX-XXXX"
                />
              )}
            />
            {errors.telefone && (
              <span className="text-red-500 text-sm">
                {errors.telefone.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">CPF:</label>
            <input
              type="text"
              {...register("cpf", {
                required: "CPF é obrigatório.",
                validate: (value) =>
                  validarCPF(value) || "CPF inválido.",
              })}
              className={`w-full px-3 py-2 border ${
                errors.cpf ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring ${
                errors.cpf ? "focus:ring-red-500" : "focus:ring-blue-300"
              }`}
            />
            {errors.cpf && (
              <span className="text-red-500 text-sm">{errors.cpf.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email:</label>
            <input
              type="email"
              {...register("email", {
                required: "Email é obrigatório.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de email inválido.",
                },
              })}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring ${
                errors.email ? "focus:ring-red-500" : "focus:ring-blue-300"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Senha:</label>
            <input
              type="password"
              {...register("senha", {
                required: "Senha é obrigatória.",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres.",
                },
                maxLength: {
                  value: 20,
                  message: "A senha não pode exceder 20 caracteres.",
                },
              })}
              className={`w-full px-3 py-2 border ${
                errors.senha ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring ${
                errors.senha ? "focus:ring-red-500" : "focus:ring-blue-300"
              }`}
            />
            {errors.senha && (
              <span className="text-red-500 text-sm">{errors.senha.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-customOrange"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTutora;