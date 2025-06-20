import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, loginSchema } from "@/lib/authSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getAuth } from "firebase/auth";

export default function AuthForm({ type }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signupWithEmailPassword, loginWithEmailPassword, loginWithGoogle } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const isLogin = type === "login";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        await loginWithEmailPassword(data.email, data.password);
        toast({ title: "Logged in successfully!", variant: "default" });
      } else {
        await signupWithEmailPassword(data.email, data.password, data.name);

        toast({ title: "Account created successfully!", variant: "default" });
      }
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
      }
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Please check your credentials.",
        variant: "destructive",
      });
    }
  };


  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
      }
      toast({ title: "Logged in with Google!", variant: "default" });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      toast({
        title: "Google login failed",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };



  return (
    <div className="w-full max-w-md bg-card p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 border font-poppins mx-auto">
      <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition mb-2">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Home
      </Link>

      <h2 className="text-2xl font-semibold text-center text-primary">
        {isLogin ? "Login to CropMate" : "Create an Account"}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Name</label>
            <div className="flex items-center border rounded-lg px-3 bg-white">
              <User className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Your Name"
                autoComplete="name"
                {...register("name")}
                className="flex-1 border-0 focus-visible:ring-0 bg-transparent text-primary"
              />
            </div>
            {errors.name?.message && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-primary mb-1">Email</label>
          <div className="flex items-center border rounded-lg px-3 bg-white">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
              {...register("email")}
              className="flex-1 border-0 focus-visible:ring-0 bg-transparent text-primary"
            />
          </div>
          {errors.email?.message && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-1">Password</label>
          <div className="flex items-center border rounded-lg px-3 bg-white">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              autoComplete={isLogin ? "current-password" : "new-password"}
              {...register("password")}
              className="flex-1 border-0 focus-visible:ring-0 bg-transparent text-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-muted-foreground hover:text-primary"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password?.message && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full bg-primary text-white hover:bg-secondary transition-colors duration-300" disabled={isSubmitting}>
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>

      <Button
        variant="outline"
        className="w-full flex items-center gap-2 justify-center border border-primary text-primary hover:bg-primary hover:text-white transition"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="h-5 w-5" />
        Continue with Google
      </Button>

      <div className="text-sm text-center text-primary">
        {isLogin ? (
          <>
            Not registered yet?{" "}
            <Link to="/signup" className="text-secondary hover:underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-secondary hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
