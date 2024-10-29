import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RouterPath } from "src/routers/utils";
import { schemaLogin, SchemaLogin } from "src/utils/validate";
import { useMutation } from "@tanstack/react-query";
import { LoginAccount } from "src/auth/auth.API";
import { ILogin } from "src/auth/models";
import { saveToLocalStorage } from "src/utils/function";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SchemaLogin>({
    resolver: yupResolver(schemaLogin)
  });
  const navigate = useNavigate();

  const LoginAccountMutaion = useMutation({
    mutationKey: ["login"],
    mutationFn: (body: ILogin) => LoginAccount(body)
  });
  const onSubmit = handleSubmit((data) => {
    LoginAccountMutaion.mutate(data, {
      onSuccess: (response) => {
        const { data } = response;
        saveToLocalStorage("access_token", data.data);
        navigate(RouterPath.Index),
          {
            replace: true
          };
      }
    });
  });
  return (
    <div className='flex items-center justify-center min-h-full'>
      <div className='bg-white rounded-lg shadow dark:border sm:max-w-md w-full md:w-[500px] xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8 border border-gray-200 rounded-lg'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Sign in to your account
          </h1>
          <form className='space-y-4 md:space-y-6' onSubmit={onSubmit}>
            <div className='flex flex-col items-start'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Your Email
              </label>
              <input
                type='email'
                id='email'
                placeholder='Your Email'
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                {...register("email")}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
            </div>
            <div className='flex flex-col items-start'>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Password
              </label>
              <input
                type='password'
                id='password'
                placeholder='Password'
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                {...register("password")}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember'
                  type='checkbox'
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                />
                <label htmlFor='remember' className='ml-2 text-sm text-gray-500 dark:text-gray-300'>
                  Remember me
                </label>
              </div>
            </div>
            <button
              type='submit'
              className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              Sign in
            </button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Don’t have an account yet?{" "}
              <Link
                to={RouterPath.Register}
                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
