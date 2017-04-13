/**
 * Created by spoomlzx on 2017/2/25.
 */
var content_editor;
var basis_editor;
var tips_editor;

var regu_select;

var img="";

$(document).ready(function () {
    $('.left-sidebar li.active').removeClass('active');
    $('#li-work').addClass('active');
    $("#p-content").slimScroll({
        height: '360px'
    });
    $("#p-basis").slimScroll({
        height: '360px'
    });
    var unitTypeId = $("#w-search").data("unittypeid");
    initWorkList(unitTypeId);
    bindUnitTypeChange();
    initWork();
    bindSearch();

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

var initWorkList = function (unitTypeId) {
    $.ajax({
        type: "get",
        url: "/getWorkList/" + unitTypeId,
        success: function (data) {
            $(".panel-worktype ul.list-group").empty();
            for (var key in data) {
                $(".panel-worktype span.badge[data-type='" + key + "']").html(data[key].workNum);
                $.each(data[key].workList, function (i, item) {
                    var index = i + 1;
                    $(".panel-worktype ul.list-group[data-type='" + key + "']").append("<li class='list-group-item search-show' data-type='" + item.type + "' data-workid='" + item.workId + "'><span>" + index + "、</span>" + item.name + "</li>");
                })
            }
            $(".panel-worktype.search-show").removeClass("search-show");
            $(".panel-worktype:has(li.search-show)").addClass("search-show");
        }
    })
}

/**
 * 为ajax加载的工作li添加click事件
 * 将work的详细信息显示在页面上
 * 为显示regulation的modal进行初始化，绑定show.bs.modal事件
 */
var initWork = function () {
    $(".work-list ul").on("click", "li", function (e) {
        var workId = $(this).data("workid");
        var unitId = $("#w-search").data("unitid");
        var type = $(this).data("type");
        var work_li = e.target;
        //选中项class为active
        $(".work-list ul > li.active").removeClass("active");
        $(work_li).addClass("active");
        $.ajax({
            type: "post",
            url: "/getWork",
            data: {
                workId: workId,
                unitId: unitId,
                type: type
            },
            success: function (data) {
                //变为可编辑
                $("#w-edit-btn").removeClass("hidden");
                //绑定work的各个信息
                $("#w-edit-btn").data("workid", data.workId);
                $("#w-e-name").val(data.name);
                $("#w-e-type").val(type);
                content_editor.setContent(data.content);
                basis_editor.setContent(data.basis);
                tips_editor.setContent(data.tips);

                var ids = data.regulationIds.split(',');
                regu_select.val(ids).trigger("change");

                if (null != data.flowChart) {
                    $("#img_area").html('<img width="100%" src="' + data.flowChart + '" alt=""/>');
                    img=data.flowChart;
                } else {
                    $("#img_area").empty();
                    img="";
                }
            }
        })
    });
}

var bindSearch = function () {
    $("#w-search").click(function () {
        var unittypeid = $("#w-search").data("unittypeid");
        var keyword = $("#w-keyword").val();
        $(".search-show").removeClass("search-show");
        $.ajax({
            type: "post",
            url: "/searchWork",
            data: {
                unitTypeId: unittypeid,
                keyword: keyword
            },
            success: function (data) {
                $(".search-show").removeClass("search-show");
                $.each(data, function (i, item) {
                    $("[data-workid='" + item + "']").addClass("search-show");
                })
                $(".panel-worktype:has(li.search-show)").addClass("search-show").find(".panel-collapse").addClass("in");
            }
        })
    })
    $("#w-keyword").keydown(function (event) {
        if ((event.keyCode || event.which) == 13) {
            var unittypeid = $("#w-search").data("unittypeid");
            var keyword = $("#w-keyword").val();
            $(".search-show").removeClass("search-show");
            $.ajax({
                type: "post",
                url: "/searchWork",
                data: {
                    unitTypeId: unittypeid,
                    keyword: keyword
                },
                success: function (data) {
                    $(".search-show").removeClass("search-show");
                    $.each(data, function (i, item) {
                        $("[data-workid='" + item + "']").addClass("search-show");
                    })
                    $(".panel-worktype:has(li.search-show)").addClass("search-show").find(".panel-collapse").addClass("in");
                }
            })
        }

    })
}

var bindUnitTypeChange = function () {
    $("#w-type-select").change(function () {
        var id = $(this).val();
        $("#w-search").data("unittypeid", id);
        $("#w-keyword").val("");
        initWorkList(id);
        $(".panel-worktype").addClass("search-show");
        $("#accordion ul>li").addClass("search-show");
    })
}

var initFlowChart = function () {
    if (typeof(FileReader) === 'undefined') {
        showTip("danger", "提示", "抱歉，你的浏览器不支持，请使用现代浏览器操作！");
        $("#img_input").disable();
    } else {
        $("#img_input").change(function () {
            var file = this.files[0];
            if (!/image\/\w+/.test(file.type)) {
                alert("请确保文件为图像类型");
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
        var workId = $("#w-edit-btn").data("workid");
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
                        showTip("success", "提示", message.msg);
                    } else {
                        showTip("danger", "提示", message.msg);
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
                    showTip("success", "提示", message.msg);
                } else {
                    showTip("danger", "提示", message.msg);
                }
            }
        })
    })
}