import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { registerThunk } from "../../redux/account/account.thunk";
import Button from "../../components/button/button.component";

import registerValidation from "./register.validation";

function Register() {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const { username, password } = data;
        dispatch(registerThunk({ username, password }));
    };

    return (
        <>
            <h2 className="title">ĐĂNG KÝ</h2>
            <form className="content__form">
                <div className="form__item">
                    <input
                        className="content__input--text"
                        {...register("username", registerValidation.username)}
                        placeholder="Email or phone number"
                    />
                    {errors?.username && <span className="content__input--invalid">{errors.username.message}</span>}
                </div>
                <div className="form__item">
                    <input
                        type="password"
                        className="content__input--text"
                        {...register("password", registerValidation.password)}
                        placeholder="Password"
                    />
                    {errors?.password && <span className="content__input--invalid">{errors.password.message}</span>}
                </div>
                <div className="form__item">
                    <input
                        type="password"
                        className="content__input--text"
                        {...register("repassword", registerValidation.repassword)}
                        placeholder="Password"
                    />
                    {errors?.repassword && <span className="content__input--invalid">{errors.repassword.message}</span>}
                </div>

                <Button className="btn-submit" onClick={handleSubmit(onSubmit)} content="Đăng ký" />
                <div className="btn-gr">
                    <Link className="underline" to="/quen-mat-khau">
                        Quên mật khẩu ?
                    </Link>
                    <Link className="underline" to="/dang-nhap">
                        Đăng nhập
                    </Link>
                </div>
            </form>
        </>
    );
}
export default Register;
