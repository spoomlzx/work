/**
 * Created by spoomlzx on 2016/8/31.
 */
/**
 * 表单字段验证函数
 * @param username 需要验证的string
 * @param message message容器的selector
 * @type {{checkUserName: verify.checkUserName, checkPassword: verify.checkPassword, checkTrueName: verify.checkTrueName, checkPhoneNum: verify.checkPhoneNum, checkEmail: verify.checkEmail}}
 */
var verify = {
    checkUserName: function (userName,userNameMessage) {
        var testString = /^[a-zA-Z0-9]{4,20}$/;
        if (userName == "") {
            userNameMessage.text("用户名不能为空");
            return false;
        } else if (testString.test(userName)) {
            return true;
        } else {
            userNameMessage.text("请输入4-20位字母数字组合的用户名");
            return false;
        }
        return true;
    },
    checkPassword: function (password,passwordMessage) {
        if (password == "") {
            passwordMessage.text("密码不能为空");
            return false;
        } else if (password.length < 6 || password.length > 20) {
            passwordMessage.text("密码请保持在6到20个字符以内");
            return false;
        } else {
            return true;
        }
        return true;
    },
    checkTrueName: function (truename,truenameMessage) {
        if (truename == "") {
            truenameMessage.text("姓名不能为空");
            return false;
        } else if (truename.length > 20 || truename.length < 2) {
            truenameMessage.text("请保持在2-20个字符以内");
            return false;
        }
        return true;
    },
    checkPhoneNum: function (phoneNum,phoneNumMessage) {
        var testString = /^[0-9]{7,12}$/;
        if (phoneNum == "") {
            phoneNumMessage.text("电话不能为空");
            return false;
        } else if (testString.test(phoneNum)) {
            return true;
        } else {
            phoneNumMessage.text("请输入正确的电话号码");
            return false;
        }
        return true;
    },
    checkEmail: function (email,emailMessage) {
        var testString = /^[a-zA-Z0-9]{2,20}@[a-zA-Z0-9]{2,8}.[a-zA-Z]{2,5}$/;
        if (email == "") {
            emailMessage.text("邮箱不能为空");
            return false;
        } else if (testString.test(email)) {
            return true;
        } else {
            emailMessage.text("亲输入正确的邮箱");
            return false;
        }
        return true;
    }
}