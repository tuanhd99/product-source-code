import { Link } from "react-router-dom";
import { RouterPath } from "src/routers/utils";

function Register() {
  return (
    <div className='flex items-center justify-center min-h-ful'>
      <div className=' bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 w-[500px]'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Sign up to your account
          </h1>
          <form className='space-y-4 md:space-y-6'>
            <div className='flex items-start flex-col'>
              <div className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Your Email</div>
              <input
                type='email'
                name='email'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Your Email'
              />
            </div>
            <div className='flex items-start flex-col'>
              <div className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</div>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Password'
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
            <div className='flex items-start flex-col'>
              <div className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password</div>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Confirm Password'
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
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
