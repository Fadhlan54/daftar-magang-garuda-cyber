import AuthLayout from "../components/layouts/AuthLayout";
import FormLogin from "../components/fragments/FormLogin";

const LoginPage = () => {
  return (
    <AuthLayout
      title={"Login"}
      subtitle={"Masukkan email dan password anda"}
      type="login"
    >
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginPage;
