/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LogIn } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { loginUser, registerUser } from "@/service/auth.sevice";
import toast from "react-hot-toast";

const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Validation schemas
  const registerSchema = yup.object().shape({
    username: yup.string().required("Please enter your username"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter your password"),
    dateOfBirth: yup.date().required("Please enter your date of birth"),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"], "Please select a valid gender")
      .required("Please select your gender"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter your password"),
  });

  // React Hook Forms
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    reset: resetLoginForm,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
    reset: resetRegisterForm,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const onSubmitRegister = async (data) => {
    try {
      const result = await registerUser();
      if (result?.status === "success") {
        router.push("/");
      }
      toast.success("User registered successfully");
    } catch (error) {
      console.error(error);
      toast.error("Email already exists. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // reset the form
  useEffect(() => {
    resetLoginForm();
    resetRegisterForm();
  }, [resetLoginForm, resetRegisterForm]);

  const onSubmitLogin = async (data) => {
    try {
      const result = await loginUser();
      if (result?.status === "success") {
        router.push("/");
      }
      toast.success("User login successfully");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/callback`;
    console.log("Google URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[90vw] max-w-md sm:max-w-lg md:max-w-xl bg-gradient-to-br from-cyan-200/50 via-blue-300/50 to-violet-300/50 backdrop-blur-md rounded-2xl shadow-xl p-6 space-y-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-black">
              Facebook
            </CardTitle>
            <CardDescription className="text-black text-sm">
              Connect with friends and the world around you on Facebook
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full ">
              <TabsList className="grid w-full grid-cols-2 mb-4 rounded-lg shadow-inner bg-white/10 border border-white/20 overflow-hidden">
                <TabsTrigger
                  value="login"
                  className="py-2 px-4 text-black  hover:bg-white/20 focus:bg-gray text-sm font-semibold"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="py-2 px-4 text-black hover:bg-white/20 focus:bg-gray text-sm font-semibold"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="loginEmail" className="text-black mb-1">
                        Email
                      </Label>
                      <Input
                        id="loginEmail"
                        type="email"
                        {...registerLogin("email")}
                        placeholder="Enter your email"
                        className="text-black"
                      />
                      {errorsLogin.email && (
                        <p className="text-red-500 text-sm">
                          {errorsLogin.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="loginPassword"
                        className="text-black mb-1"
                      >
                        Password
                      </Label>
                      <Input
                        id="loginPassword"
                        type="password"
                        {...registerLogin("password")}
                        placeholder="Enter your password"
                        className="text-black"
                      />
                      {errorsLogin.password && (
                        <p className="text-red-500 text-sm">
                          {errorsLogin.password.message}
                        </p>
                      )}
                    </div>
                    <Button type="submit" className="w-full">
                      <LogIn className="mr-2 h-4 w-4" />
                      Log in
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register">
                <form onSubmit={handleSubmitSignUp(onSubmitRegister)}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="signupName" className="text-black mb-1">
                        User name
                      </Label>
                      <Input
                        id="signupName"
                        type="text"
                        {...registerSignUp("username")}
                        placeholder="Enter your username"
                        className="text-black"
                      />
                      {errorsSignUp.username && (
                        <p className="text-red-500 text-sm">
                          {errorsSignUp.username.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="signUpEmail" className="text-black mb-1">
                        Email
                      </Label>
                      <Input
                        id="signUpEmail"
                        type="email"
                        {...registerSignUp("email")}
                        placeholder="Enter your email"
                        className="text-black"
                      />
                      {errorsSignUp.email && (
                        <p className="text-red-500 text-sm">
                          {errorsSignUp.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="signUpPassword"
                        className="text-black mb-1"
                      >
                        Password
                      </Label>
                      <Input
                        id="signUpPassword"
                        type="password"
                        {...registerSignUp("password")}
                        placeholder="Enter your password"
                        className="text-black"
                      />
                      {errorsSignUp.password && (
                        <p className="text-red-500 text-sm">
                          {errorsSignUp.password.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="signUpBirthday"
                        className="text-black mb-1"
                      >
                        Birthday
                      </Label>
                      <Input
                        id="signUpBirthday"
                        type="date"
                        {...registerSignUp("dateOfBirth")}
                        className="text-gray-500"
                      />
                      {errorsSignUp.dateOfBirth && (
                        <p className="text-red-500 text-sm">
                          {errorsSignUp.dateOfBirth.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-black mb-1">Gender</Label>
                      <RadioGroup
                        className="flex justify-between space-x-4"
                        defaultValue="male"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="male"
                            id="male"
                            {...registerSignUp("gender")}
                          />
                          <Label htmlFor="male" className="text-gray-500">
                            Male
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="female"
                            id="female"
                            {...registerSignUp("gender")}
                          />
                          <Label htmlFor="female" className="text-gray-500">
                            Female
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="other"
                            id="other"
                            {...registerSignUp("gender")}
                          />
                          <Label htmlFor="other" className="text-gray-500">
                            Other
                          </Label>
                        </div>
                      </RadioGroup>
                      {errorsSignUp.gender && (
                        <p className="text-red-500 text-sm">
                          {errorsSignUp.gender.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="confirmPassword"
                        className="text-black mb-1"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...registerSignUp("confirmPassword")}
                        placeholder="Confirm your password"
                        className="text-black"
                      />
                      {errorsSignUp.confirmPassword && (
                        <p className="text-red-500 text-sm">
                          {errorsSignUp.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign up
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>

          {/* Divider */}
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full flex items-center justify-center">
              <hr className="flex-grow border-t border-gray-500" />
              <span className="mx-2 text-sm text-gray-400 bg-gray-800 px-2">
                Or continue with
              </span>
              <hr className="flex-grow border-t border-gray-500" />
            </div>
            <div className="w-full gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full flex items-center justify-center"
              >
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Sign in with Google
                </Button>
              </motion.div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default page;
