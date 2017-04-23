/**
 * Created by spoomlzx on 2017/2/25.
 */

var table;
$(document).ready(function () {
    initTable(1);
    bindChangeUnitType();
    $('#delete-modal').on('show.bs.modal', function (e) {
        var btn = $(e.relatedTarget);
        var workId=btn.data("id");
        var name=btn.data("name");
        $("#w-d-name").html(name);
        $("#w-delete").data("id",workId);
    })
    bindDeleteWork();
})

var initTable = function (unitTypeId) {
    table = $('#workList_table').DataTable({

        // Internationalisation. For more info refer to http://datatables.net/manual/i18n
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "没有数据",
            "info": "显示 _START_ 到 _END_ 共 _TOTAL_ 条法规",
            "infoEmpty": "没有数据",
            "infoFiltered": "(总共有 _MAX_ 条数据)",
            "lengthMenu": "每页条数 _MENU_",
            "search": "<span class='fa fa-search'></span>搜索：",
            "zeroRecords": "没有您查找的法规制度",
            "paginate": {
                "previous": "上一页",
                "next": "下一页",
                "last": "末页",
                "first": "首页"
            }
        },

        //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
        "dom": "<'row'<'col-md-6 col-sm-12'f><'col-md-6 col-sm-12'l>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",// horizobtal scrollable datatable
        buttons: [],

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
        //"pagingType": "bootstrap_full_number",
        "columnDefs": [
            {"searchable": false, 'targets': 0, 'width': '10%'},
            {'targets': 1, 'width': '55%'},
            {'targets': 2, 'width': '10%'},
            {'orderable': false, 'searchable': false, 'targets': 3, 'width': '25%'}
        ],
        "order": [
            [0, "asc"]
        ], // set first column as a default sort by asc
        "ajax": {
            url: "../getWorkListByTypeId/"+unitTypeId,
            "type": "get",
            dataSrc: "data"
        },
        "columns": [
            {
                data: "workId",
                searchable: false,
            },
            {data: "name"},
            {data: "type"},
            {
                data: "workId",
                searchable: false,
                orderable: false,
                render: function (data, type, row, meta) {
                    var operation = '<a class="btn btn-primary" href="/work/' + row.workId + '"> 编 辑</a> ';
                    operation += '<a class="btn btn-danger work-delete" data-id="' + row.workId + '" data-name="'+row.name+'"> 删 除</a> ';
                    return operation;
                }
            }
        ],
        //字段搜索框
        "initComplete": function () {
            var api = this.api();
            api.columns().indexes().flatten().each(function (i) {
                if (i > 0 && i < 3) {
                    var column = api.column(i);
                    var select = $('<select class="form-control"><option value=""></option></select>')
                        .appendTo($("#s-" + i).empty()).off('change')
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });
                    column.data().unique().each(function (d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>')
                    });
                }
            });
        }

    });
}

var bindChangeUnitType = function () {
    $("#w-l-type").change(function () {
        var unitTypeId = $(this).val();
        table.destroy();
        initTable(unitTypeId);
    })
}

var bindDeleteWork=function () {
    $("#workList_table").off('click').on('click','.work-delete',function (e) {
        var workId=$(this).data("id");
        var index=layer.confirm('删除后无法恢复,确定删除这项工作吗?', {
            btn: ['确定', '取消'],icon:3,title:'提示'
        }, function () {
            $.ajax({
                type: "get",
                url: "/deleteWork/"+workId,
                success:function (message) {
                    layer.close(index);
                    if (message.code) {
                        table.ajax.reload();
                        layer.msg(message.msg, {icon: 1});
                    } else {
                        layer.msg(message.msg, {icon: 2,anim:6});
                    }
                }
            })
        });
    })
}