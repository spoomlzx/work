/**
 * Created by spoomlzx on 2017/3/9.
 */
var table;
$(document).ready(function () {
    var unitId=$("#p-container").data("unitid");
    $.ajax({
        type: "get",
        url: "/getUnitTree/" + unitId,
        success: function (data) {
            $.fn.zTree.init($("#treeDemo"), setting, data);
        }
    })
    bindWorkTypeChange();
    getWorkStatusList(unitId);
})

var setting = {
    view: {
        selectedMulti: false,
        dblClickExpand: dblClickExpand
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: onClick
    }
};

function dblClickExpand(treeId, treeNode) {
    return treeNode.level > 0;
}

function onClick(event, treeId, treeNode, clickFlag) {
    getWorkStatusList(treeNode.id);
}

var getWorkStatusList = function(unitId){
    $.ajax({
        type: "get",
        url: "/getWorkStatusList/" + unitId,//unitId
        success: function (data) {
            var m={
                "年度":1,
                "半年":2,
                "季度":4,
                "月度":12,
                "周":52,
                "日":moment().isLeapYear()?366:365,
                "按需":1,
            }
            $("#p-w-list").empty();
            i=1;
            for(var key in data){
                var percent=(Math.round(data[key].finishDays /m[data[key].type]*10000) / 100.00 + "%");
                $("#p-w-list").append("<tr data-id='"+data[key].workId+"' data-type='"+data[key].type+"'><th>"+i+"</th><td>"+data[key].name+"</td><td>"+percent+"</td></tr>");
                i++;
            }
            bindShowStatusDetail(data,unitId);
            $("#p-w-type").val("全部");
        }
    })
}

var bindShowStatusDetail=function(data,unitId){
    $("#p-w-list").off("click","tr");
    $("#p-w-list").on("click","tr",function(e){
        var tr=$(this);
        var workId=tr.data("id");
        var type=tr.data("type");
        $("#p-s-name").html(data[workId].name);
        $("#p-s-type").html(data[workId].type+"工作");
        $(".unit-detail>div.w-btns").addClass("hidden");
        var list=$(".unit-detail div[data-id='"+type+"']");
        list.removeClass("hidden");
        $(".unit-detail .btn").removeClass("btn-success");
        var status=$.parseJSON(data[workId].status);
        for(var key in status){
            var i=key.substr(1);
            list.children().eq(i-1).addClass("btn-success");
        }
        getWorkLogList(workId,unitId);
    })
}

var bindWorkTypeChange = function () {
    $("#p-w-type").change(function () {
        var type = $(this).val();
        if(type=="全部"){
            $("#p-w-list tr").removeClass("hidden");
        }else{
            $("#p-w-list tr").addClass("hidden");
            $("#p-w-list tr[data-type='"+type+"']").removeClass("hidden");
        }
    })
}

var getWorkLogList=function(workId,unitId){
    $("#l-list").empty();
    $.ajax({
        type: "get",
        url: "/getWorkLogList/"+workId+"/"+unitId,
        success: function (data){
            for(var key in data){
                $("#l-list").append("<li class='list-group-item' data-toggle='modal' href='#log-show-modal' data-id=" + key + ">" +
                    "<div><a href='javascript:;'>" + data[key].describe.substring(0,16) + "</a></div><div class='right'><span class='fa fa-clock-o'></span>"+data[key].time.substring(0,10)+"</div></li>");
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