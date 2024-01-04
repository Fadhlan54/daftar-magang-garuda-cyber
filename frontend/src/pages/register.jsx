import AuthLayout from "../components/layouts/AuthLayout";
import FormRegister from "../components/fragments/FormRegister";

const RegisterPage = () => {
  return (
    <AuthLayout
      title={"Register"}
      subtitle={"Masukkan data anda"}
      type="register"
    >
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterPage;
