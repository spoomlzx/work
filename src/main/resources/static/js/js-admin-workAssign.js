/**
 * Created by spoomlzx on 2017/2/25.
 */
var table;

$(document).ready(function () {
    initTable();
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);

    $(".work-available-select").select2({
        allowClear: true
    });
    bindAddWork();
    bindDeleteWork();
})
/**
 * 初始化datatable
 */
var initTable = function () {
    table = $('#worklist-now').DataTable({
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "没有工作",
            "info": "总共 _TOTAL_ 项工作",
            "infoEmpty": "没有数据",
            "infoFiltered": "(总共有 _MAX_ 条数据)",
            "lengthMenu": "每页条数 _MENU_",
            "search": "搜索工作：",
            "zeroRecords": "没有响应的结果",
            "paginate": {
                "previous": "上一页",
                "next": "下一页",
                "last": "末页",
                "first": "首页"
            }
        },

        //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
        "dom": "<'row'<'col-md-6 col-sm-12'f><'col-md-6 col-sm-12'l>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
        buttons: [],

        // setup responsive extension: http://datatables.net/extensions/responsive/
        responsive: true,
        colReorder: {
            reorderCallback: function () {
                console.log("callback")
            }
        },
        "pagingType": "full_numbers",
        "lengthMenu": [
            [5, 10, -1],
            [5, 10, "All"] // change per page values here
        ],
        // set the initial value
        "pageLength": 10,
        "order": [
            [1, "asc"]
        ],
        "ajax": {
            url: "../getWorkInTypeWork/" + $("#wa-add-btn").data("id") + "/" + $("#wa-add-btn").data("type"),
            "type": "get",
            // "data": {
            //     unitTypeId: $("#wa-add-btn").data("id"),
            //     type: $("#wa-add-btn").data("type")
            // },
            dataSrc: "data"
        },
        "columns": [
            {
                data: "workId",

            },
            {data: "name"},
            {data: "type"},
            {
                data: "workId",
                render: function (data, type, row, meta) {
                    return '<button class="btn btn-danger wa-delete-btn" data-id="' + row.workId + '" href="javascript:;"> 删除工作 </button>';
                }
            }
        ]
    });
}

var setting = {
    view: {
        selectedMulti: false,
        dblClickExpand: dblClickExpand
    },
    callback: {
        beforeClick: beforeClick,
        onClick: onClick
    }
};

function dblClickExpand(treeId, treeNode) {
    return treeNode.level > 0;
}

function beforeClick(treeId, treeNode, clickFlag) {
    return (treeNode.click != false);
}

function onClick(event, treeId, treeNode, clickFlag) {
    var type = treeNode.name;
    var unitTypeId = treeNode.getParentNode().id;
    $("#wa-unit-type").html(treeNode.getParentNode().name);
    $("#wa-work-type").html(treeNode.name);
    $("#wa-add-btn").data("id", unitTypeId);
    $("#wa-add-btn").data("type", type);
    loadTypeWork(unitTypeId);
}

var zNodes = [
    {
        name: "单位类型", open: true, click: false,
        children: [
            {
                name: "航空兵部队", id: 1, open: true, click: false,
                children: [
                    {name: "年度", type: "年度"},
                    {name: "半年"},
                    {name: "季度"},
                    {name: "月度"},
                    {name: "周"},
                    {name: "日"},
                    {name: "按需"}
                ]
            },
            {
                name: "核潜艇部队", id: 2, open: true, click: false,
                children: [
                    {name: "年度"},
                    {name: "半年"},
                    {name: "季度"},
                    {name: "月度"},
                    {name: "周"},
                    {name: "日"},
                    {name: "按需"}
                ]
            },
            {
                name: "常规潜艇部队", id: 3, open: true, click: false,
                children: [
                    {name: "年度"},
                    {name: "半年"},
                    {name: "季度"},
                    {name: "月度"},
                    {name: "周"},
                    {name: "日"},
                    {name: "按需"}
                ]
            },
            {
                name: "水面舰艇部队", id: 4, open: true, click: false,
                children: [
                    {name: "年度"},
                    {name: "半年"},
                    {name: "季度"},
                    {name: "月度"},
                    {name: "周"},
                    {name: "日"},
                    {name: "按需"}
                ]
            },
            {
                name: "陆（特）战队", id: 5, open: true, click: false,
                children: [
                    {name: "年度"},
                    {name: "半年"},
                    {name: "季度"},
                    {name: "月度"},
                    {name: "周"},
                    {name: "日"},
                    {name: "按需"}
                ]
            },
            {
                name: "岸防部队", id: 6, open: true, click: false,
                children: [
                    {name: "年度"},
                    {name: "半年"},
                    {name: "季度"},
                    {name: "月度"},
                    {name: "周"},
                    {name: "日"},
                    {name: "按需"}
                ]
            },
            {
                name: "信息作战部队", id: 7, open: true, click: false,
                children: [
                    {name: "年度"},
                    {name: "半年"},
                    {name: "季度"},
                    {name: "月度"},
                    {name: "周"},
                    {name: "日"},
                    {name: "按需"}
                ]
            },
            {
                name: "训练机构部队", id: 8, open: true, click: false,
                children: [
                    {name: "年度"},
                    {name: "半年"},
                    {name: "季度"},
                    {name: "月度"},
                    {name: "周"},
                    {name: "日"},
                    {name: "按需"}
                ]
            },
            {
                name: "后装保障部队", id: 9, open: true, click: false,
                children: [
                    {name: "年度"},
                    {name: "半年"},
                    {name: "季度"},
                    {name: "月度"},
                    {name: "周"},
                    {name: "日"},
                    {name: "按需"}
                ]
            }
        ]
    }

];

var loadTypeWork = function (unitTypeId) {
    var type = $("#wa-add-btn").data("type");
    $(".work-available-select").empty();
    $.ajax({
        type: "post",
        url: "/getWorkNotInTypeWork",
        data: {
            unitTypeId: unitTypeId,
            type: type
        },
        success: function (message) {
            if (message.code) {
                $.each(message.data, function (i, item) {
                    $(".work-available-select").append("<option value='" + item.workId + "'>" + item.name + "</option>")
                })
                table.ajax.url("../getWorkInTypeWork/" + unitTypeId + "/" + type).load();
            }
        }
    })
}

/**
 * 添加工作
 */
var bindAddWork = function () {
    $("#wa-add-btn").click(function () {
        var unitTypeId = $("#wa-add-btn").data("id");
        var workIds = $(".work-available-select").val();
        if (unitTypeId != null && workIds != null) {
            $.ajax({
                type: "post",
                url: "/addTypeWork",
                data: {
                    unitTypeId: unitTypeId,
                    workIds: workIds
                },
                traditional: true,
                success: function (message) {
                    if (message.code) {
                        loadTypeWork(unitTypeId);
                        showTip("success", "提示", message.msg);
                    }
                }
            })
        }
    })
}

/**
 * 删除工作
 */
var bindDeleteWork = function () {
    $("#worklist-now").on('click', '.wa-delete-btn', function (e) {
        var workId = $(e.target).data("id");
        var unitTypeId = $("#wa-add-btn").data("id");
        if (unitTypeId != null && workId != null) {
            $.ajax({
                type: "post",
                url: "/deleteTypeWork",
                data: {
                    unitTypeId: unitTypeId,
                    workId: workId
                },
                success: function (message) {
                    if (message.code) {
                        loadTypeWork(unitTypeId);
                        showTip("success", "提示", message.msg);
                    }
                }
            })
        }
    })
}

