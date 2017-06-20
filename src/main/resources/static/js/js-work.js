/**
 * Created by spoomlzx on 2017/2/25.
 */
$(document).ready(function () {
    var unitId = $("#w-search").data("unitid");
    initWorkList(unitId);
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
        minuteStep: 10,
        format:'yyyy-mm-dd hh:ii'
    });
})

var initWorkList = function (unitId) {
    $.ajax({
        type: "get",
        url: "/getWorkListByUnitId/" + unitId,
        success: function (data) {
            for(var key in data){
                $("span.badge[data-type='"+key+"']").html(data[key].length);
                $("ul.list-group[data-type='"+key+"']").empty();
                var index=1;
                $.each(data[key], function (j, itemj) {
                    if(itemj.check){
                        $("ul.list-group[data-type='"+key+"']").append("<li class='list-group-item search-show' data-type='" + itemj.type + "' data-workid='" + itemj.workId + "'><span>" + index + "、</span>" + itemj.name + "</li>");
                    }else{
                        $("ul.list-group[data-type='"+key+"']").append("<li class='list-group-item search-show font-red' data-type='" + itemj.type + "' data-workid='" + itemj.workId + "'><span>" + index + "、</span>" + itemj.name + "</li>");
                    }
                    index=index+1;
                })
            }
            getWork(unitId,data["年度"][0].workId);
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
        var work_li = e.target;
        //选中项class为active
        $(".work-list ul > li.active").removeClass("active");
        $(work_li).addClass("active");
        getWork(unitId,workId);
    });
}

var getWork=function(unitId,workId){
    $.ajax({
        type: "post",
        url: "/getWork",
        data: {
            workId: workId,
            unitId: unitId
        },
        success: function (data) {
            $("#w-check").data("workid", data.workId);
            $("#w-check").data("type", data.type);
            $("#l-add-btn").removeClass("hidden");
            $("#w-check").removeClass("hidden");

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
            //添加regulation列表
            $("#p-regulations ul").empty();
            $.each(data.regulations, function (i, item) {
                $("#p-regulations ul").append("<li class='regu-link' data-id=" + i + "><a href='javascript:;'>" + item.title + "</a></li>");
            })

            $("#p-regulations").off('click').on('click','.regu-link',function (e) {
                var id=$(this).data("id");
                var b = data.regulations[id];
                layer.open({
                    type: 1,
                    shade: 0.05,
                    shadeClose: true,
                    title: '<span class="fa fa-file-text-o" style="color: #498f3e"></span> '+b.title,
                    area: ['960px', '85%'],
                    content: "<div style='padding: 15px'>"+b.content+"</div>"
                });
            })

            getWorkLogList(workId,unitId);
        }
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
                $(".panel-worktype:has(li.search-show)").addClass("search-show");
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
                    $(".panel-worktype:has(li.search-show)").addClass("search-show");
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
    $("#w-check").click(function () {
        var workId = $("#w-check").data("workid");
        var check = $("#w-check").data("check");
        $.ajax({
            type: "post",
            url: "/updateWorkStatus",
            data: {
                workId: workId,
                check: check
            },
            success: function (message) {
                if (message.data) {
                    changeWorkStatus(1);
                } else {
                    changeWorkStatus(0);
                }
            }
        })
    })
}


/**
 * worklog list
 * @param workId
 * @param unitId
 */
var getWorkLogList=function(workId,unitId){
    $("#l-list").empty();
    $.ajax({
        type: "get",
        url: "/getWorkLogList/"+workId+"/"+unitId,
        success: function (data){
            for(var key in data){
                $("#l-list").append("<li class='list-group-item' data-toggle='modal' href='#log-show-modal' data-id=" + key + ">" +
                    "<div><a href='javascript:;'>" + data[key].describe.substring(0,16) + "</a></div><div class='right'><span class='fa fa-clock-o'></span>"+moment(data[key].time).format("YYYY-MM-DD")+"</div></li>");
            }
            bindLogShow(data);
        }
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
            url: "/addWorkLog",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (message) {
                if (message.code) {
                    $('#log-add-modal').modal('hide');
                    layer.msg(message.msg, {time: 2000, icon: 1});
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

var bindLogShow=function(logMap){
    $('#log-show-modal').off('show.bs.modal');
    $('#log-show-modal').on('show.bs.modal', function (e) {
        var li = $(e.relatedTarget);
        var id = li.data("id");
        $("#l-show-time").empty();
        $("#l-show-time").html(moment(logMap[id].time).format("YYYY-MM-DD"));
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



/*
 check=1,完成
 check=0,未完成
 */
var changeWorkStatus = function (check) {
    if (check) {
        $("#w-check").data("check", 1);
        $("#w-check").removeClass("btn-danger").removeClass("btn-success").addClass("btn-success");
        $("#w-check span.fa").removeClass("fa-spinner").removeClass("fa-check").addClass("fa-check");
        $("#w-check span.check-info").empty();
        $("#w-check span.check-info").html("已完成");
    } else {
        $("#w-check").data("check", 0);
        $("#w-check").removeClass("btn-danger").removeClass("btn-success").addClass("btn-danger");
        $("#w-check span.fa").removeClass("fa-spinner").removeClass("fa-check").addClass("fa-spinner");
        $("#w-check span.check-info").empty();
        $("#w-check span.check-info").html("待完成");
    }
}

var onlyNum=function onlyNum(){
    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
        if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
            event.returnValue=false;  //执行至该语句时，阻止输入；可类比阻止冒泡原理或者禁止右键功能；
}