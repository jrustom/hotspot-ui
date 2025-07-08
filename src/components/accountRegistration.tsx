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

export function Login({ changeToSignUp }: { changeToSignUp: () => void }) {
  const loginFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, "The password must be at least 6 characters long")
      .regex(/[^a-zA-Z0-9]/, "The password must contain at least one symbol"),
  });

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    criteriaMode: "all",
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      handleLogin(values.email, values.password);
    } catch (error) {}
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@email.com" {...field} />
                    </FormControl>
                    <FormMessage className="ml-2 mb-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
                    </FormControl>

                    {loginForm.formState.errors.password?.types &&
                      Object.values(
                        loginForm.formState.errors.password.types
                      ).map((msg, i) => (
                        <p key={i} className="text-sm text-red-500">
                          {msg}
                        </p>
                      ))}
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a onClick={changeToSignUp} className="ml-1 underline cursor-pointer">
              Sign Up
            </a>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
}

export function SignUp({ changeToLogin }: { changeToLogin: () => void }) {
  const signUpFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, "The password must be at least 6 characters long")
      .regex(/[^a-zA-Z0-9]/, "The password must contain at least one symbol"),
  });

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    criteriaMode: "all",
  });

  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    try {
      handleSignUp(
        values.firstName + " " + values.lastName,
        values.email,
        values.password
      );
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage className="ml-2 mb-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage className="ml-2 mb-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@email.com" {...field} />
                    </FormControl>
                    <FormMessage className="ml-2 mb-3" />
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
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a onClick={changeToLogin} className="ml-1 underline cursor-pointer">
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

  return loggingIn ? (
    <Login changeToSignUp={() => setLoggingIn(false)} />
  ) : (
    <SignUp changeToLogin={() => setLoggingIn(true)} />
  );
}

export default AccountRegistration;
