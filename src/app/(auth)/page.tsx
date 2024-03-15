"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import axiosClient from "@/configs/axiosClient";
import Input from "@/components/HookForm/Input";
import { EPath } from "@/constants/path";
import { ISignInRequest, IToken } from "@/types/auth";

const schema = Yup.object({
  email: Yup.string().email("Email is invalid!").required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

const AuthPage = () => {
  const router = useRouter();

  const {
    register,
    reset,
    setFocus,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignInRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { mutate: signIn } = useMutation({
    mutationFn: async (data: ISignInRequest) => {
      const res = await axiosClient.post<IToken>("/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      reset();
      localStorage.setItem("accessToken", data.access_token);
      toast.success("Sign in successfully!");
      router.push(EPath.DASHBOARD);
    },
    onError: (error) => {
      setFocus("email");
      toast.error(error.message || "Sign in failure!");
    },
  });

  const onSubmit = (data: ISignInRequest) => {
    signIn(data);
  };

  return (
    <div className="max-w-[calc(100%_-_32px)] w-[565px] max-h-[calc(100%_-_32px)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center px-8 md:px-[70px] py-14 md:py-16 bg-white dark:bg-gray-700 rounded-[10px] shadow-auth-shadow overflow-y-auto">
      <div className="flex flex-col items-center gap-[14px] mb-[42px]">
        <h5 className="text-xl text-primary">Welcome back!</h5>
        <p className="text-[15px] text-secondary">
          Sign in to continue to Dashboard
        </p>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-6 text-primary mb-2">
            <Input
              type="email"
              label="Email"
              htmlFor="email"
              placeholder="E.g: username@digitalfortress.dev"
              register={register("email")}
              errors={errors}
            />
            <Input
              type="password"
              label="Password"
              htmlFor="password"
              placeholder="•••••••"
              register={register("password")}
              errors={errors}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-3 rounded-lg text-white bg-gray-800 dark:bg-gray-800"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
