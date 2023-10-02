import { AuthContext } from "@/shared/providers/AuthProvider/authProvider";
import { useRouter } from "next/navigation"
import { ComponentType, useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import useAuthStore from "@/store/useAuth";

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Component = (props: P) => {
    const router = useRouter()
    const { isAuth } = useAuthStore()
    const [authChecked, setAuthChecked] = useState(false)

    useEffect(() => {
      if (!isAuth) {
        router.push('/sign-in')
      } else {
        setAuthChecked(true)
      }
    }, [isAuth, router])

    if (!authChecked) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default WithAuth;