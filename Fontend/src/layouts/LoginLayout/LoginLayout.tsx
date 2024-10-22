import { Outlet } from "react-router-dom";
import HeaderLogin from "./HeaderLogin";

function LoginLayout() {
  return (
    <div className='h-screen w-screen'>
      <div className='h-[56px] w-full sticky top-0 left-0 z-10'>
        <HeaderLogin />
      </div>
      <div className='min-h-[calc(100vh - 56px)] mt-14 overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
}

export default LoginLayout;
