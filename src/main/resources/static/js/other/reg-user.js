/**
 * Created by spoomlzx on 2016/8/30.
 */
$(function () {
    reg_user.initial();
});

/**
 * 注册提交
 * @type {{initial: reg_user.initial, bindSubmitForm: reg_user.bindSubmitForm, verifyInput: reg_user.verifyInput}}
 */
var reg_user = {
    initial: function () {
        this.bindSubmitForm();
    },

    bindSubmitForm: function () {
        $("#add-user-btn").click(function () {
            var verifyResult = reg_user.verifyInput();
            if (verifyResult) {
                var data = new Object();
                data.userName = $(".form-username input").val();
                data.password = $(".form-password input").val();
                data.trueName = $(".form-truename input").val();
                data.phoneNum = $(".form-phone input").val();
                data.email = $(".form-email input").val();
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
                        } else {
                            if (message.result == "duplicate-username") {
                                $(".form-username .form-message").text(message.messageInfo);
                            }
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
        //获取username
        var userName = $(".form-username input").val();
        //获取username对应的message selector
        var userNameMessage=$(".form-username .form-message");
        var check_u = verify.checkUserName(userName,userNameMessage);
        var password = $(".form-password input").val();
        var passwordMessage=$(".form-password .form-message");
        var check_p = verify.checkPassword(password,passwordMessage);
        var truename = $(".form-truename input").val();
        var truenameMessage=$(".form-truename .form-message");
        var check_t = verify.checkTrueName(truename,truenameMessage);
        var phoneNum = $(".form-phone input").val();
        var phoneNumMessage=$(".form-phone .form-message");
        var check_phone = verify.checkPhoneNum(phoneNum,phoneNumMessage);
        var email = $(".form-email input").val();
        var emailMessage=$(".form-email .form-message");
        var check_e = verify.checkEmail(email,emailMessage);
        //result 是所有条件都为true &&
        result = check_u && check_p && check_t && check_phone && check_e;
        return result;
    }
}



