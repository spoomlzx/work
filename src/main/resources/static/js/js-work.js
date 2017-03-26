/**
 * Created by spoomlzx on 2017/2/25.
 */
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
    bindUpdateWorkStatus();
    bindInsertWorkLog();

    $('.form_datetime').datetimepicker({
        language:'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        format:'yyyy-mm-dd hh:ii:ss'
    });
})

var initWorkList = function (unitTypeId) {
    $.ajax({
        type: "get",
        url: "/getWorkList/" + unitTypeId,
        success: function (data) {
            $.each(data, function (i, itemi) {
                $("#w-badge-" + i).html(itemi.workNum);
                $("#w-ul-" + i).empty();
                $.each(itemi.workList, function (j, itemj) {
                    var index = j + 1;
                    $("#w-ul-" + i).append("<li class='list-group-item search-show' data-type='" + itemj.type + "' data-workid='" + itemj.workId + "'><span>" + index + "、</span>" + itemj.name + "</li>");
                })
            })
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
                $("#w-check").data("workid", data.workId);
                $("#w-check").data("type", data.type);
                $("#w-check-btn").removeClass("hidden");
                $("#l-add-btn").removeClass("hidden");

                changeWorkStatus(data.check);

                //将文中出现的关键词标红加粗
                var content = data.content;
                var basis = data.basis;
                var tips = data.tips;
                var keyword = $("#w-keyword").val();
                var kwpattern = new RegExp(keyword, "g");
                if (keyword != "") {
                    content = content.replace(kwpattern, "<span class='search'> " + keyword + " </span>");
                    basis = basis.replace(kwpattern, "<span class='search'> " + keyword + " </span>");
                    tips = tips.replace(kwpattern, "<span class='search'> " + keyword + " </span>");
                }
                //绑定work的各个信息
                $("#p-name").html(data.name);
                $("#p-content").html(content);
                $("#p-basis").html(basis);
                $("#p-tips").html(tips);
                $("#p-flowchart").empty();
                $("#p-flowchart").append("<img src='" + data.flowChart + "' width='90%'/>")
                //重新绑定regulation的modal的显示动作
                $('#regulation-modal').off('show.bs.modal');
                $('#regulation-modal').on('show.bs.modal', function (e) {
                    var a = e.relatedTarget;
                    var i = a.dataset.id;
                    var b = data.regulations[i];
                    $("#regulation-modal .modal-title").empty();
                    $("#regulation-modal .modal-title").html(b.title);
                    $("#regulation-modal .modal-body").empty();
                    if (keyword != "") {
                        var c = b.content.replace(kwpattern, "<span class='search'> " + keyword + " </span>");
                        $("#regulation-modal .modal-body").html(c);
                    } else {
                        $("#regulation-modal .modal-body").html(b.content);
                    }
                })
                //添加regulation列表
                $("#p-regulations ul").empty();
                $.each(data.regulations, function (i, item) {
                    $("#p-regulations ul").append("<li data-toggle='modal' href='#regulation-modal' data-id=" + i + "><a href='javascript:;'>" + item.title + "</a></li>");
                })
                getWorkLogList(workId,unitId);
            }
        })
    });
}

var getWorkLogList=function(workId,unitId){
    $("#l-list").empty();
    $.ajax({
        type: "get",
        url: "/getWorkLogList/"+workId+"/"+unitId,
        success: function (data){
            for(var key in data){
                $("#l-list").append("<li class='list-group-item' data-toggle='modal' href='#log-show-modal' data-id=" + key + ">" +
                    "<a href='javascript:;'>" + data[key].describe.substring(0,14) + "</a><span class='right'>"+data[key].time+"</span><span class='fa fa-clock-o right'></span></li>");
            }
            bindLogShow(data);
        }
    })
}

var bindLogShow=function(logMap){
    $('#log-show-modal').off('show.bs.modal');
    $('#log-show-modal').on('show.bs.modal', function (e) {
        var li = $(e.relatedTarget);
        var id = li.data("id");
        $("#l-show-time").empty();
        $("#l-show-time").html(logMap[id].time);
        $("#l-show-duty-person").empty();
        $("#l-show-duty-person").html(logMap[id].dutyPerson);
        $("#l-show-person-type").empty();
        $("#l-show-person-type").html(logMap[id].personType);
        $("#l-show-count").empty();
        $("#l-show-count").html(logMap[id].count);
        $("#l-show-describe").empty();
        $("#l-show-describe").html(logMap[id].describe);
    })
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

var bindUpdateWorkStatus = function () {
    $("#w-check-btn").click(function () {
        var workId = $("#w-check").data("workid");
        var unitId = $("#w-search").data("unitid");
        var check = $("#w-check-btn .check-state").data("check");
        $.ajax({
            type: "post",
            url: "/updateWorkStatus",
            data: {
                workId: workId,
                unitId: unitId,
                check: check
            },
            success: function (data) {
                if (data.object) {
                    changeWorkStatus(1);
                    $("#w-check-btn .check-state").data("check",1);
                } else {
                    changeWorkStatus(0);
                    $("#w-check-btn .check-state").data("check", 0);
                }
            }
        })
    })
}

var bindInsertWorkLog=function(){
    $("#l-add").click(function(){
        var data={
            unitId:$("#w-search").data("unitid"),
            workId:$("#w-check").data("workid"),
            dutyPerson:$("#l-duty-person").val(),
            personType:$("#l-person-type").val(),
            count:$("#l-count").val(),
            describe:$("#l-describe").val(),
            time:$("#l-time").val()
        };
        $.ajax({
            type: "post",
            url: "/insertWorkLog",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (message) {
                $("#l-add-error").text(message.messageInfo);
                if (message.result == "success") {
                    $('#log-add-modal').modal('hide');
                }
                $("#l-duty-person").val("");
                $("#l-person-type").val("");
                $("#l-count").val("");
                $("#l-describe").val("");
                getWorkLogList(data.workId,data.unitId);
            }
        })
    })
}

/*
 check=1,完成
 check=0,未完成
 */
var changeWorkStatus = function (check) {
    if (check) {
        $("#w-check-btn .check-state").data("check", 1);
        $("#w-check").removeClass("btn-danger").removeClass("btn-success").addClass("btn-success");
        $("#w-check span.fa").removeClass("fa-spinner").removeClass("fa-check").addClass("fa-check");
        $("#w-check span.check-info").empty();
        $("#w-check span.check-info").html("已完成");
        $("#w-check-btn").removeClass("btn-success").removeClass("btn-danger").addClass("btn-danger");
        $("#w-check-btn .check-state").removeClass("fa-hand-o-left").removeClass("fa-remove").addClass("fa-remove");
        $("#w-check-btn span.check-info").empty();
        $("#w-check-btn span.check-info").html("取消完成状态");
    } else {
        $("#w-check-btn .check-state").data("check", 0);
        $("#w-check").removeClass("btn-danger").removeClass("btn-success").addClass("btn-danger");
        $("#w-check span.fa").removeClass("fa-spinner").removeClass("fa-check").addClass("fa-spinner");
        $("#w-check span.check-info").empty();
        $("#w-check span.check-info").html("待完成");
        $("#w-check-btn").removeClass("btn-success").removeClass("btn-danger").addClass("btn-success");
        $("#w-check-btn .check-state").removeClass("fa-hand-o-left").removeClass("fa-remove").addClass("fa-hand-o-left");
        $("#w-check-btn span.check-info").empty();
        $("#w-check-btn span.check-info").html("完成该项工作");
    }
}

var onlyNum=function onlyNum(){
    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
        if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
            event.returnValue=false;  //执行至该语句时，阻止输入；可类比阻止冒泡原理或者禁止右键功能；
}