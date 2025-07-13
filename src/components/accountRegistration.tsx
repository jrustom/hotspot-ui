import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleLogin, handleSignUp } from "@/services/accountService";
import { useState } from "react";
import { useAuth, User } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export function Login({
  changeToSignUp,
  setUserData,
}: {
  changeToSignUp: () => void;
  setUserData: (user: User) => void;
}) {
  const loginFormSchema = z.object({
    username: z
      .string()
      .nonempty({ message: "Please enter a valid email address." }),
    password: z.string().nonempty({ message: "Please enter your password." }),
  });

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    criteriaMode: "all",
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      handleLogin(setUserData, values.username, values.password).then(
        (error) => {
          if (error) {
            loginForm.setError("root", { message: error.message });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...loginForm}>
        <Card className="w-full max-w-md mx-auto self-center">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={loginForm.handleSubmit(onSubmit)}>
              <FormField
                control={loginForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {loginForm.formState.errors.root && (
                <p className="text-sm text-red-500">
                  {loginForm.formState.errors.root.message}
                </p>
              )}
              <Button type="submit" className="mt-5 w-full">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a
              onClick={changeToSignUp}
              className="ml-1 underline cursor-pointer"
            >
              Sign Up
            </a>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
}

export function SignUp({
  changeToLogin,
  setUserData,
}: {
  changeToLogin: () => void;
  setUserData: (user: User) => void;
}) {
  const signUpFormSchema = z.object({
    username: z.string().nonempty("Please enter a valid email address."),
    password: z
      .string()
      .min(6, "The password must be at least 6 characters long.")
      .regex(/[^a-zA-Z0-9]/, "The password must contain at least one symbol."),
    profilePicture: z.enum(
      [
        "girl1",
        "girl2",
        "girl3",
        "girl4",
        "girl5",
        "guy1",
        "guy2",
        "guy3",
        "guy4",
        "guy5",
      ],
      {
        message: "Please select a profile picture.",
      }
    ),
  });

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      password: "",
      profilePicture: undefined,
    },
    criteriaMode: "all",
  });

  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    try {
      handleSignUp(
        setUserData,
        values.username,
        values.password,
        values.profilePicture
      ).then((error) => {
        if (error) {
          signUpForm.setError("root", { message: error.message });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...signUpForm}>
        <Card className="w-full max-w-md mx-auto self-center">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
              <FormField
                control={signUpForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
                    </FormControl>

                    {signUpForm.formState.errors.password?.types &&
                      Object.values(
                        signUpForm.formState.errors.password.types
                      ).map((msg, i) => (
                        <p key={i} className="text-sm text-red-500">
                          {msg}
                        </p>
                      ))}
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <div className="flex justify-center">
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div>
                              {field.value ? (
                                <img
                                  src={`/src/assets/avatars/${field.value}.svg`}
                                  alt={field.value}
                                  className="size-15 md:size-20"
                                />
                              ) : (
                                <div className="!bg-gray-500 flex justify-center items-center !text-5xl md:!text-7xl !rounded-full size-15 md:size-20">
                                  ?
                                </div>
                              )}
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="p-4 bg-gray-500 rounded-sm m-4">
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                              {[
                                "girl1",
                                "girl2",
                                "girl3",
                                "girl4",
                                "girl5",
                                "guy1",
                                "guy2",
                                "guy3",
                                "guy4",
                                "guy5",
                              ].map((pic, i) => (
                                <DropdownMenuItem key={i}>
                                  <img
                                    src={`/src/assets/avatars/${pic}.svg`}
                                    alt={pic}
                                    onClick={() => field.onChange(pic)}
                                    className="flex aspect-square w-15 md:w-20 cursor-pointer"
                                  />
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {signUpForm.formState.errors.root && (
                <p className="text-sm text-red-500">
                  {signUpForm.formState.errors.root.message}
                </p>
              )}
              <Button type="submit" className="mt-5 w-full">
                Sign up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              onClick={changeToLogin}
              className="ml-1 underline cursor-pointer"
            >
              Login
            </a>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
}

function AccountRegistration() {
  const [loggingIn, setLoggingIn] = useState<boolean>(true);
  const { setUserData } = useAuth();

  return loggingIn ? (
    <Login
      changeToSignUp={() => setLoggingIn(false)}
      setUserData={setUserData}
    />
  ) : (
    <SignUp
      changeToLogin={() => setLoggingIn(true)}
      setUserData={setUserData}
    />
  );
}

export default AccountRegistration;
