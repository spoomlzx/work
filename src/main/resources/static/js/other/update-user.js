/**
 * Created by spoomlzx on 2016/8/31.
 */
$(function () {
    update_user.initial();
    update_password.initial();
});
var update_password = {
    initial: function () {
        this.bindFormSubmit();
    },
    bindFormSubmit: function () {
        $("#reset-password-btn").click(function () {
            if (update_password.verifyInput()) {
                var data = new Object();
                data.userId = $("#reset-password-form .form-userid input").val();
                if ($("#reset-password-form .form-password input").val() != "") {
                    data.password = $("#reset-password-form .form-password input").val();
                }
                var action = $(this).data("action");
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: action,
                    data: JSON.stringify(data),
                    success: function (message) {
                        if (message.result == "success") {
                            window.location.reload();
                        }
                    }
                });
            }
            return false;
        });
    },
    verifyInput: function () {
        $(".form-message").empty();
        var result = true;
        var password = $("#reset-password-form .form-password input").val();
        var passwordMessage = $("#reset-password-form .form-password .form-message");
        var check_p = verify.checkPassword(password, passwordMessage);
        var check_cp = this.checkConfirmPassword();
        result = check_p && check_cp;
        return result;
    },
    checkConfirmPassword: function () {
        var password = $("#reset-password-form .form-password input").val();
        var confirmPassword = $("#reset-password-form .form-confirm-password input").val();
        if (confirmPassword == "") {
            $("#reset-password-form .form-confirm-password .form-message").text("请确认密码");
            return false;
        } else if (confirmPassword != password) {
            $("#reset-password-form .form-confirm-password .form-message").text("请确认两次输入的密码一致");
            return false;
        } else {
            return true;
        }
        return true;
    }
}

var update_user = {
    initial: function () {
        this.bindFormSumbmit();
    },
    bindFormSumbmit: function () {
        $("#update-user-btn").click(function () {
            if (update_user.verifyInput()) {
                var data = new Object();
                data.userId = $("#update-user-form .form-userid input").val();
                if ($("#update-user-form .form-truename input").val() != "") {
                    data.trueName = $("#update-user-form .form-truename input").val();
                }
                if ($("#update-user-form .form-nationalId input").val() != "") {
                    data.nationalId = $("#update-user-form .form-nationalId input").val();
                }
                if ($("#update-user-form .form-phone input").val() != "") {
                    data.phoneNum = $("#update-user-form .form-phone input").val();
                }
                if ($("#update-user-form .form-email input").val() != "") {
                    data.email = $("#update-user-form .form-email input").val();
                }
                var action = $(this).data("action");
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: action,
                    data: JSON.stringify(data),
                    success: function (message) {
                        if (message.result == "success") {
                            window.location.reload();
                        }
                    }
                });
            }
            return false;
        });
    },
    verifyInput: function () {
        $(".form-message").empty();
        var result = true;
        var trueName = $("#update-user-form .form-truename input").val();
        var trueNameMessage = $("#update-user-form .form-truename .form-message");
        //如果为空就代表不需要修改这一项，则不作判断
        var check_t = (trueName == "") ? true : verify.checkTrueName(trueName, trueNameMessage);
        var check_n = true;
        var phoneNum = $("#update-user-form .form-phone input").val();
        var phoneNumMessage = $("#update-user-form .form-phone .form-message");
        var check_p = (phoneNum == "") ? true : verify.checkPhoneNum(phoneNum, phoneNumMessage);
        var email = $("#update-user-form .form-email input").val();
        var emailMessage = $("#update-user-form .form-email .form-message");
        var check_e = (email == "") ? true : verify.checkEmail(email, emailMessage);
        result = check_t && check_p && check_n && check_e;
        return result;
    }
}