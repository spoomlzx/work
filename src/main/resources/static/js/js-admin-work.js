/**
 * Created by spoomlzx on 2017/2/25.
 */
var content_editor;
var basis_editor;
var tips_editor;

var regu_select;

var img="";

$(document).ready(function () {
    //编辑部分的js
    content_editor = UE.getEditor('w-e-content', {initialFrameHeight: 300});
    basis_editor = UE.getEditor('w-e-basis', {initialFrameHeight: 300});
    tips_editor = UE.getEditor('w-e-tips', {initialFrameHeight: 300});

    regu_select = $(".regulation-select").select2({
        allowClear: true
    });

    initFlowChart();
    bindEditWork();
    bindAddWork();
})

var initFlowChart = function () {
    if($("#img_area img").length > 0){
        img=$("#img_area img")[0].src;
    }
    if (typeof(FileReader) === 'undefined') {
        layer.msg("抱歉，你的浏览器不支持！", {icon: 0});
        $("#img_input").disable();
    } else {
        $("#img_input").change(function () {
            var file = this.files[0];
            if (!/image\/\w+/.test(file.type)) {
                layer.msg("请确保文件为图像类型！", {icon: 0});
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                img = this.result;
                $("#img_area").html('<img width="100%" src="' + this.result + '" alt=""/>');
            }
        })
    }
}

var bindEditWork = function () {
    $("#w-edit-btn").click(function () {
        var workId = $("#w-e-workid").val();
        if (workId) {
            var name = $("#w-e-name").val();
            var type = $("#w-e-type").val();
            var content = content_editor.getContent();
            var basis = basis_editor.getContent();
            var tips = tips_editor.getContent();
            var reguIds = $(".regulation-select").val();
            //regulations
            var ids = "";
            for (var i in reguIds) {
                ids = ids + "," + reguIds[i];
            }
            ids = ids.substr(1);
            //flowchart

            var data = {
                workId: workId,
                name: name,
                type: type,
                content: content,
                basis: basis,
                tips: tips,
                regulationIds: ids,
                flowChart:img
            }
            $.ajax({
                type: "post",
                url: "/editWork",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (message) {
                    if (message.code) {
                        layer.msg(message.msg, {icon: 1});
                    } else {
                        layer.msg(message.msg, {icon: 2,anim:6});
                    }
                }
            })
        }
    })
}

var bindAddWork = function () {
    $("#w-add-btn").click(function () {
        var name = $("#w-e-name").val();
        var type = $("#w-e-type").val();
        var unitTypeId=$("#w-e-unit-type").val();
        var content = content_editor.getContent();
        var basis = basis_editor.getContent();
        var tips = tips_editor.getContent();
        var reguIds = $(".regulation-select").val();
        var ids = "";
        for (var i in reguIds) {
            ids = ids + "," + reguIds[i];
        }
        ids = ids.substr(1);
        var data = {
            name: name,
            unitTypeId:unitTypeId,
            type: type,
            content: content,
            basis: basis,
            tips: tips,
            regulationIds: ids,
            flowChart:img
        }
        $.ajax({
            type: "post",
            url: "/addWork",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (message) {
                if (message.code) {
                    layer.msg(message.msg, {icon: 1});
                } else {
                    layer.msg(message.msg, {icon: 2,anim:6});
                }
            }
        })
    })
}