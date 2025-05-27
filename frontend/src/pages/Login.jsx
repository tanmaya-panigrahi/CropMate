import AuthForm from "@/components/Authform"

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF5] px-4">
      <AuthForm type="login" />
    </div>
  )
}

export default Login