import fasco from "@assets/images/fasco.png";
import { Link } from "react-router-dom";
const Login = () => {
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
          قبلا ثبت نام نکرده اید؟
          <Link to="/register" className="me-2">
            ثبت نام کنید
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form>
              <div className="mb-3">
                <label className="form-label">موبایل</label>
                <input className="form-control form-control-lg" />
              </div>
              <div className="mb-3">
                <label className="form-label">رمز عبور</label>
                <input
                  className="form-control form-control-lg mb-2"
                  type="password"
                />
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-lg btn-primary">
                  وارد شوید
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
