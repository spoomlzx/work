/**
 * Created by spoomlzx on 2017/3/9.
 */
$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "/getUnitTree/1",
        success: function (data) {
            $.fn.zTree.init($("#treeDemo"), setting, data);
        }
    })
    bindRegUser();
})

var setting = {
    view: {
        selectedMulti: false,
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: onClick,
    }
};
function onClick(event, treeId, treeNode, clickFlag) {
    $("#select-unit").val(treeNode.name);
    $("#unit-id").val(treeNode.id);
    hideUnit();
}

function showUnit() {
    var selectOffset = $("#select-unit").offset();
    $("#unit-list").css({left: selectOffset.left + "px", top: selectOffset.top + $("#select-unit").outerHeight() + "px"}).slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
}

function hideUnit() {
    $("#unit-list").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {
    if (!(event.target.id == "unit-list" || $(event.target).parents("#unit-list").length > 0)) {
        hideUnit();
    }
}


function testUserName() {
    var username = $("#username").val();
    if (username) {
        $.ajax({
            type: "get",
            url: "/testUserName/" + username,
            success: function (message) {
                if (message.code) {
                    $("#username").parent().removeClass("has-error");
                    $("#username").parent().addClass("has-success");
                } else {
                    $("#username").parent().removeClass("has-success");
                    $("#username").parent().addClass("has-error");
                    $("#username").focus();
                }
            }
        })
    } else {
        $("#username").parent().removeClass("has-success");
        $("#username").parent().addClass("has-error");
        $("#username").focus();
    }
}

function checkPassword() {
    var password = $("#password").val();
    if (password) {
        $("#password").parent().removeClass("has-error");
        $("#password").parent().addClass("has-success");
    } else {
        $("#password").parent().removeClass("has-success");
        $("#password").parent().addClass("has-error");
        $("#password").focus();
    }
}

var bindRegUser = function () {
    $("#reg-user").click(function (e) {
        var username = $("#username").val();
        var password = $("#password").val();
        var unitId = $("#unit-id").val();
        if (unitId) {
            $("#unit-id").parent().removeClass("has-error");
            $("#unit-id").parent().addClass("has-success");
        } else {
            $("#unit-id").parent().removeClass("has-success");
            $("#unit-id").parent().addClass("has-error");
            $("#unit-id").focus();
            showUnit();
        }
        if (username && password && unitId) {
            var data={
                userName:username,
                password:password,
                unitId:unitId
            }
            $.ajax({
                type: "post",
                url: "/regUser",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (message) {
                    if(message.code){
                        layer.msg(message.msg, {time: 2000, icon: 1});
                    }else{
                        layer.msg(message.msg, {time: 2000, icon: 2,anim:6});
                        $("#username").focus();
                    }
                }
            })
        }
    })
}