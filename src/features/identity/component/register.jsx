import fasco from "@assets/images/fasco.png";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { httpService } from "../../../core/http-service";
import { useEffect } from "react";

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = useSubmit();
  const onSubmit = (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      const response = submitForm(userData, { method: "post" });
      console.log("Response from server:", response);
      response;
    } catch (error) {
      console.error("Error occurred during form submission:", error);
    }
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const isSuccessOperation = useActionData();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccessOperation) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isSuccessOperation]);

  return (
    <>
      <div className="text-center mt-4">
        <img
          src={fasco}
          style={{
            marginBottom: "30px",
          }}
        />
        <h1 className="h2">پنل ادمین فروشگاه ری اکت</h1>
        <p className="lead">
          جهت ورود لازم است از طریق موبایل و رمز عبور خود اقدام کنید
        </p>
        <p className="lead">
          قبلا ثبت نام کرده اید؟
          <Link to="/login" className="me-2">
            وارد شوید
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">موبایل</label>
                <input
                  {...register("mobile", {
                    required: "موبایل الزامی است",
                    minLength: 11,
                    maxLength: 11,
                  })}
                  className={`form-control form-control-lg ${
                    errors.mobile && `is-invalid`
                  }`}
                />

                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {errors.mobile?.message}
                  </p>
                )}

                {errors.mobile &&
                  (errors.mobile.type === "minLength" ||
                    errors.mobile.type === "maxLength") && (
                    <p className="text-danger small fw-bolder mt-1">
                      تعداد رقم مبایل باید 11 رقم باشد
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">رمز عبور</label>
                <input
                  {...register("password", { required: "رمز عبور الزامی است" })}
                  className={`form-control form-control-lg ${
                    errors.password && `is-invalid`
                  }`}
                  type="password"
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">تکرار رمز عبور</label>
                <input
                  {...register("confirmPassword", {
                    required: "تکرار رمز عبور الزامی است",
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return "عدم تطابق با رمز وارد شده";
                      }
                    },
                  })}
                  className={`form-control form-control-lg ${
                    errors.confirmPassword && `is-invalid`
                  }`}
                  type="password"
                />

                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <p className="text-danger small fw-bolder mt-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}

                {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <p className="text-danger small fw-bolder mt-1">
                      {errors.confirmPassword?.message}~
                    </p>
                  )}
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? "در حال انجام عملیات" : "ثبت نام کنید"}
                </button>
              </div>
              {isSuccessOperation && (
                <div className="alert alert-success text-success p-2 mt-3">
                  عملیات با موفقیت انجام شد به صفحه ورود منتقل میشوید
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;

export async function registerAction({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await httpService.post("/register", data);
    console.log("Data sent to server:", data);
    console.log("Response from server:", response);
    return response.status === 200 || 201;
  } catch (error) {
    console.error("Error occurred during form submission:", error);
    return false;
  }
}
