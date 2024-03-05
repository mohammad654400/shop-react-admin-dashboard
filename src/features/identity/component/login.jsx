import fasco from "@assets/images/fasco.png";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, redirect } from "react-router-dom";
import { useSubmit } from "react-router-dom";
import { httpService } from "../../../core/http-service";
const Login = () => {
  const { t } = useTranslation();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = useSubmit();
  const onSubmit = (data) => {
    submitForm(data, { method: "post" });
  };

  return (
    <>
      <div className="text-center mt-4">
        <img
          src={fasco}
          style={{
            marginBottom: "30px",
          }}
        />
        <h1 className="h2">{t(`login.title`)}</h1>
        <p className="lead">{t(`login.description`)} </p>
        <p className="lead">
          {t(`login.question`)}
          <Link to="/register" className="me-2">
            {t(`login.register`)}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t(`login.mobile`)}</label>
                <input
                  {...register("mobile", {
                    required: `${t("login.errorMobile")}`,
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
                      {t("login.errorPassword")}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t(`login.password`)}</label>
                <input
                  {...register("password", {
                    required: `${t("login.password")}`,
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
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-lg btn-primary">
                  {t(`login.signin`)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/login", data);
  console.log(response);
  if (response.status === 200) {
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return redirect("/");
  }
}
