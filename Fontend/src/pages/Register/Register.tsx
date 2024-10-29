import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RegisterAccount } from "src/auth/auth.API";
import { ILogin } from "src/auth/models";
import { RouterPath } from "src/routers/utils";
import { saveToLocalStorage } from "src/utils/function";
import { schemaRegister, SchemaRegister } from "src/utils/validate";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SchemaRegister>({
    resolver: yupResolver(schemaRegister)
  });
  const navigate = useNavigate();
  const RegisterAccountMutaion = useMutation({
    mutationKey: ["register"],
    mutationFn: (body: ILogin) => RegisterAccount(body)
  });

  const handleOnSubmit = handleSubmit((data) => {
    console.log(data);

    const body = omit(data, ["confirm_password"]);
    RegisterAccountMutaion.mutate(body, {
      onSuccess: (res) => {
        saveToLocalStorage("access_token", res.data.data);
        navigate(RouterPath.Index),
          {
            replace: true
          };
      }
    });
  });

  return (
    <div className='flex items-center justify-center min-h-full'>
      <div className=' bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 w-[500px]'>
        <div className='p-6 space-y-4 md:space-y-4 sm:p-8 border border-gray-200 rounded-lg'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Sign up to your account
          </h1>
          <form className='space-y-4 md:space-y-1' onSubmit={handleOnSubmit}>
            <div className='flex items-start flex-col'>
              <div className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Name</div>
              <input
                type='text'
                placeholder='Name'
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                {...register("name")}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.name?.message}</div>
            </div>
            <div className='flex items-start flex-col'>
              <div className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Your Email</div>
              <input
                type='email'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Your Email'
                {...register("email")}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
            </div>
            <div className='flex items-start flex-col'>
              <div className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Password</div>
              <input
                type='password'
                id='password'
                placeholder='Password'
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                {...register("password")}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
            </div>
            <div className='flex items-start flex-col'>
              <div className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password</div>
              <input
                type='password'
                id='password'
                placeholder='Confirm Password'
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                {...register("confirm_password")}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
            </div>
            <button
              type='submit'
              className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              Sign up
            </button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Do you have an account?{" "}
              <Link
                to={RouterPath.Login}
                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
