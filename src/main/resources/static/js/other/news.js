/**
 * Created by spoomlzx on 2016/9/3.
 */
$(function () {
    add_news.initial();
});

var add_news = {
    initial: function () {
        this.bindFormSubmit();
    },
    bindFormSubmit: function () {
        $("#add-news-btn").click(function () {
            if (add_news.verifyInput()) {
                var data = new Object();
                data.title = $("#add-news-form .form-title input").val();
                data.content = $("#add-news-form .form-content textarea").val();
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
    verifyInput: function verifyInput() {
        $(".form-message").empty();
        var result = true;
        var check_t = this.checkNewsTitle();
        var check_c = this.checkContent();

        result = check_t && check_c;
        return result;
    },

    checkNewsTitle: function checkNewsTitle() {
        var title = $("#add-news-form .form-title input").val();
        if (title == "") {
            $("#add-news-form .form-title .form-message").text("公告标题不能为空");
            return false;
        } else if (title.length > 50 || title.length < 4) {
            $("#add-news-form .form-title .form-message").text("请保持在4-50个字符以内");
            return false;
        } else {
            var re = /[\+|\-|\\|\/||&|!|~|@|#|\$|%|\^|\*|\(|\)|=|\?|´|"|<|>|\.|,|:|;|\]|\[|\{|\}|\|]+/;
            if (re.test(title)) {
                $("#add-news-form .form-title .form-message").text("只能是数字字母或者下划线的组合");
                return false;
            } else
                return true;

        }
        return true;
    },
    checkContent: function checkContent() {
        var content = $("#add-news-form .form-content textarea").val();
        if (content == "") {
            $("#add-news-form .form-content .form-message").text("内容不能为空");
            return false;
        } else if (content.length > 600 || content.length < 1) {
            $("#add-news-form .form-content .form-message").text("请保持在1-600个字符以内");
            return false;
        }
        return true;
    }
}