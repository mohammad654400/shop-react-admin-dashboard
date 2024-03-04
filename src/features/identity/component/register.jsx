import fasco from "@assets/images/fasco.png";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { httpService } from "../../../core/http-service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { t } = useTranslation();

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

  const routeErrors = useRouteError();

  return (
    <>
      <div className="text-center mt-4">
        <img
          src={fasco}
          style={{
            marginBottom: "30px",
          }}
        />
        <h1 className="h2"> {t("register.title")}</h1>
        <p className="lead">{t("register.description")}</p>
        <p className="lead">
          {t("register.question")}
          <Link to="/login" className="me-2">
            {t("register.logIn")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label"> {t("register.mobile")}</label>
                <input
                  {...register("mobile", {
                    required: `${t("register.errorMobile")}`,
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
                      {t("register.errorPassword")}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t("register.password")} </label>
                <input
                  {...register("password", {
                    required: `${t("register.password")}`,
                  })}
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
                <label className="form-label">
                  {" "}
                  {t("register.repeatPassword")}{" "}
                </label>
                <input
                  {...register("confirmPassword", {
                    required: `${t("register.repeatPassword")}`,
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return `${t(`register.incompatibility`)}`;
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
                  {isSubmitting
                    ? "در حال انجام عملیات"
                    : `${t("register.register")}`}
                </button>
              </div>
              {isSuccessOperation && (
                <div className="alert alert-success text-success p-2 mt-3">
                  عملیات با موفقیت انجام شد به صفحه ورود منتقل میشوید
                </div>
              )}

              {routeErrors && (
                <div className="alert alert-danger text-danger p-2 mt-3">
                  {routeErrors.response.data.mobile.map((error) => (
                    <p className="mb-0">{error}</p>
                  ))}
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
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/register", data);
  console.log("Data sent to server:", data);
  console.log("Response from server:", response);
  return response.status === 200 || 201;
}
