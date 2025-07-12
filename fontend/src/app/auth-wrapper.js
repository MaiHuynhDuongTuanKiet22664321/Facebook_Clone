"use client";
import { checkUserAuth, logoutUser } from "@/service/auth.sevice";
import userStore from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/lib/loader";
import Header from "./components/Header";

export default function AuthWrapper({ children }) {
    const { setUser, clearUser } = userStore();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const isLoginPage = pathname === "/user-login";

    useEffect(() => {
        const handleLogout = async () => {
            clearUser();
            setIsAuthenticated(false);
            try {
                await logoutUser();
            } catch (error) {
                console.error("Error logging out: please try again", error);
            }
            if (!isLoginPage) {
                router.push("/user-login");
            }
        };

        const checkAuth = async () => {
            try {
                const result = await checkUserAuth();
                if (result?.isAuthenticated) {
                    setUser(result?.user);
                    setIsAuthenticated(true);
                } else {
                    await handleLogout();
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                await handleLogout();
            } finally {
                setLoading(false);
            }
        };

        if (!isLoginPage) {
            checkAuth();
        } else {
            setLoading(false);
        }
    }, [isLoginPage, router, setUser, clearUser]);

    useEffect(() => {
        if (!loading && !isAuthenticated && !isLoginPage) {
            router.push("/user-login");
        }
    }, [loading, isAuthenticated, isLoginPage, router]);

    if (loading) {
        return <Loader />;
    }

    // Nếu không đăng nhập và đang ở trang login thì render children (form login)
    if (!isAuthenticated && isLoginPage) {
        return children;
    }

    // Nếu không đăng nhập và không phải trang login thì render Loader (chờ chuyển trang)
    if (!isAuthenticated && !isLoginPage) {
        return <Loader />;
    }

    return (
        <>
            {!isLoginPage && isAuthenticated && <Header />}
            {(isAuthenticated || isLoginPage) && children}
        </>
    );
}
