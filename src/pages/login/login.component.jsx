import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { loginThunk } from "../../redux/account/account.thunk";
import Button from "../../components/button/button.component";

import loginValidation from "./login.validation";
import "./login.styles.css";

function Login() {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { username, password } = data;
        dispatch(loginThunk({ username, password }));
    };

    return (
        <>
            <h2 className="title">ĐĂNG NHẬP</h2>
            <form className="content__form">
                <div className="form__item">
                    <input
                        className="content__input--text"
                        {...register("username", loginValidation.username)}
                        placeholder="Email or phone number"
                    />
                    {errors?.username && <span className="content__input--invalid">{errors.username.message}</span>}
                </div>
                <div className="form__item">
                    <input
                        type="password"
                        className="content__input--text"
                        {...register("password", loginValidation.password)}
                        placeholder="Password"
                    />
                    {errors?.password && <span className="content__input--invalid">{errors.password.message}</span>}
                </div>

                <Button className="btn-submit" onClick={handleSubmit(onSubmit)} content="Đăng nhập" />
                <div className="btn-gr">
                    <Link className="underline" to="/quen-mat-khau">
                        Quên mật khẩu ?
                    </Link>
                    <Link className="underline" to="/dang-ky">
                        Đăng ký
                    </Link>
                </div>
            </form>
        </>
    );
}
export default Login;
