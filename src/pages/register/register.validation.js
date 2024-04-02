const registerValidation = {
    username: { required: "Vui lòng nhập tên đăng nhập" },
    password: { required: "Vui lòng nhập mật khẩu" },
    repassword: {
        required: "Vui lòng nhập mật khẩu xác nhận",
        validate: (repassword, form) => {
            if (repassword !== form.password) {
                return "Mật khẩu xác nhận không trùng khớp";
            }
            return true;
        },
    },
};

export default registerValidation;
