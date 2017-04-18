/**
 * Created by spoomlzx on 2017/3/9.
 */
var table;
$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "/getUnitTree/1",
        success: function (data) {
            $.fn.zTree.init($("#treeDemo"), setting, data);
        }
    })
    bindEditUnit();
    bindAddUnit();
    bindDelUnit();
    initTable();
    bindResetPassword();
    bindChangeEnable();
})

var setting = {
    view: {
        selectedMulti: false,
        dblClickExpand: dblClickExpand
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: onClick,
        beforeDrag: beforeDrag,
        beforeDrop: beforeDrop
    }
};

function dblClickExpand(treeId, treeNode) {
    return treeNode.level > 0;
}

function onClick(event, treeId, treeNode, clickFlag) {
    $("#u-id").val(treeNode.id);
    $("#u-pid").val(treeNode.pId);
    $("#u-name").val(treeNode.name);
    $("#u-sid").val(treeNode.sortId);
    $("#u-type").val(treeNode.unitTypeId);
    table.ajax.url("../getUserListByUnitId/" + treeNode.id).load();
}

function beforeDrag(treeId, treeNodes) {
    if (treeNodes[0].level = 0) {
        return false;
    }
    return true;
}

function beforeDrop(treeId, treeNodes, targetNode, moveType) {
    if (targetNode.level === 0 && (moveType === "prev" || moveType === "next")) {
        return false;
    }
}


var bindEditUnit = function () {
    $("#u-edit-btn").click(function () {
        if ($("#u-id").val()) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            var node = zTree.getSelectedNodes()[0];
            node.name = $("#u-name").val();
            node.sortId = $("#u-sid").val();
            $.ajax({
                type: "post",
                url: "/editUnit",
                contentType: "application/json",
                data: JSON.stringify(node),
                success: function (message) {
                    if (message.code) {
                        showTip("success", "提示", message.msg);
                        zTree.updateNode(node);
                    } else {
                        showTip("success", "提示", message.msg);
                    }
                }
            })
        }
    })
}

var bindAddUnit = function () {
    $("#u-add-btn").click(function () {
        var data = {
            pId: $("#u-id").val(),
            sortId: $("#u-sid").val(),
            name: $("#u-name").val(),
            unitTypeId: $("#u-type").val()
        }
        $.ajax({
            type: "post",
            url: "/addUnit",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (message) {
                if (message.code) {
                    showTip("success", "提示", message.msg);
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    var node = zTree.getSelectedNodes()[0];

                    zTree.addNodes(node, message.data);

                } else {
                    showTip("success", "提示", message.msg);
                }
            }
        })
    })
}

var bindDelUnit = function () {
    $("#u-del-btn").click(function () {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        var node = zTree.getSelectedNodes()[0];
        if (!node.isParent) {
            $.ajax({
                type: "get",
                url: "/delUnit/" + $("#u-id").val(),
                success: function (message) {
                    if (message.code) {
                        showTip("success", "提示", message.msg);
                        zTree.removeNode(node);

                    } else {
                        showTip("success", "提示", message.msg);
                    }
                }
            })
        }
    })
}

var initTable = function () {
    table = $('#user-list').DataTable({
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "没有用户",
            "info": "总共 _TOTAL_ 个用户",
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
        "dom": "<'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
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
            url: "../getUserListByUnitId/0",
            "type": "get",
            dataSrc: "data"
        },
        "columns": [
            {
                data: "userId",

            },
            {data: "userName"},
            {data: "roles"},
            {data: "email"},
            {
                data: "userID",
                render: function (data, type, row, meta) {
                    var operation = '<button class="btn btn-primary user-reset-btn" data-id="' + row.userId + '" href="#reset-modal" data-toggle="modal"> 重置密码</button> ';
                    if (row.enabled) {
                        operation += '<button class="btn btn-success user-enable-btn" data-enable="1" data-id="' + row.userId + '" href="javascript:;"> 生效</button>';
                    } else {
                        operation += '<button class="btn btn-danger user-enable-btn" data-enable="0" data-id="' + row.userId + '" href="javascript:;"> 禁用</button>';
                    }
                    return operation;
                }
            }
        ]
    });
}

var bindResetPassword=function(){
    $('#reset-modal').on('show.bs.modal', function (e) {
        var btn = $(e.relatedTarget);
        var userId = btn.data("id");
        $("#psw-reset").unbind("click");
        $("#psw-reset").click(function(e){
            $.ajax({
                type: "get",
                url: "/resetPassword/"+userId,
                success: function (message) {
                    $('#reset-modal').modal('hide');
                    if (message.code) {
                        showTip("success", "提示", message.msg);
                    } else {
                        showTip("danger", "提示", message.msg);
                    }
                }
            })
        })
    })

}

var bindChangeEnable=function () {
    $("#user-list").on("click",".user-enable-btn",function(){
        var enable=$(this).data("enable");
        var userId=$(this).data("id");
        var btn=$(this);
        $.ajax({
            type: "get",
            url: "/changeEnable/"+userId,
            success: function (message) {
                if (message.code) {
                    showTip("success", "提示", message.msg);
                    if(enable){
                        btn.removeClass("btn-success").addClass("btn-danger").html("禁用");
                    }else{
                        btn.removeClass("btn-danger").addClass("btn-success").html("生效");
                    }
                } else {
                    showTip("danger", "提示", message.msg);
                }
            }
        })
    })
}
