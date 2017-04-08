/**
 * Created by spoomlzx on 2017/3/9.
 */
$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "/getUnitTree/" + $("#p-container").data("unitid"),
        success: function (data) {
            $.fn.zTree.init($("#treeDemo"), setting, data);
        }
    })
    bindWorkTypeChange();

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
    $.ajax({
        type: "get",
        url: "/getWorkStatusList/" + treeNode.id,//unitId
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
            bindShowStatusDetail(data,treeNode.id);
            $("#p-w-type").val("全部");
        }
    })
}
