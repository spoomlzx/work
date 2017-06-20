/**
 * Created by spoomlzx on 2017/3/9.
 */
/**
 * Created by spoomlzx on 2017/2/25.
 */
var editor;
var reditor;
var table;
$(document).ready(function () {
    editor = UE.getEditor('r-content');
    reditor = UE.getEditor('r-e-content');
    initModal();
    initTable();
})

var bindRegulationAdd = function () {
    $("#r-add").off("click");
    $("#r-add").on("click", function (e) {
        var title = $("#r-title").val();
        var titleError = $("#r-title-error");
        var content = editor.getContent();
        var contentError = $("#r-content-error");
        if (checkRegulationTitle(title, titleError) && checkRegulationContent(content, contentError)) {
            var data = {
                title: title,
                category: $("#r-category").val(),
                department: $("#r-department").val(),
                content: content
            }
            $.ajax({
                type: "post",
                url: "/admin/addRegulation",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (message) {
                    if (message.code) {
                        $('#regulation-modal').modal('hide');
                    } else {
                        $("#r-title").text("");
                        $("#r-title-error").text("请重新输入法规名称");
                        editor.setContent("");
                        $("#r-content-error").text("请重新输入法规名称");
                    }
                }
            })
        }
    });
}

var bindRegulationDelete = function (reguid, btn) {
    $("#r-delete").off("click")
    $("#r-delete").on("click", function () {
        $.ajax({
            type: "get",
            url: "/admin/deleteRegulation/" + reguid,
            success: function (message) {
                $('#delete-modal').modal('hide');
                if (message.code) {
                    table.row(btn.parents('tr')).remove().draw();
                }
            }
        })
    })
}

var bindRegulationEdit = function (btn) {
    $("#r-save").off("click");
    $("#r-save").on("click", function () {
        var data = {
            reguId: $(this).data("reguid"),
            title: $("#r-e-title").val(),
            content: reditor.getContent(),
            department: $("#r-e-department").val(),
            category: $("#r-e-category").val()
        }
        $.ajax({
            type: "post",
            url: "/admin/editRegulation",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (message) {
                $('#edit-modal').modal('hide');
                if (message.code) {
                    btn.parent().children('.regulation-content').html(data.content);
                    btn.parents('tr').children('.r-title').html(data.title);
                    btn.parents('tr').children('.r-department').html(data.department);
                    btn.parents('tr').children('.r-category').html(data.category);
                }
            }
        })
    })
}

var initTable = function () {
    // begin first table
    table = $('#regulation_table').DataTable({

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
        "dom": "<'row'<'col-md-6 col-sm-12'Bf><'col-md-6 col-sm-12'l>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",// horizobtal scrollable datatable
        buttons: [
            {extend: 'print', className: 'btn btn-primary'},
            {extend: 'copy', className: 'btn btn-info'},
            {extend: 'excel', className: 'btn btn-success'}
        ],

        colReorder: {
            reorderCallback: function () {
                console.log("callback")
            }
        },
        "pagingType": "full_numbers",
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"] // change per page values here
        ],
        // set the initial value
        "pageLength": 10,
        //"pagingType": "bootstrap_full_number",
        "columnDefs": [
            {'orderable': false, "searchable": false, 'targets': 0, 'width': '10%'},
            {'targets': 1, 'width': '50%'},
            {'targets': 2, 'width': '10%'},
            {'targets': 3, 'width': '10%'},
            {'orderable': false, 'searchable': true, 'targets': 4, 'width': '20%'}
        ],
        "order": [
            [1, "asc"]
        ], // set first column as a default sort by asc

        //字段搜索框
        initComplete: function () {
            var api = this.api();
            api.columns().indexes().flatten().each(function (i) {
                if (i > 1 && i < 4) {
                    var column = api.column(i);
                    var select = $('<select class="form-control"><option value="">全部</option></select>')
                        .appendTo($("#s-" + i).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });
                    column.data().unique().sort().each(function (d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>')
                    });
                }
            });
        }

    });
    table.on('order.dt search.dt',
        function () {
            table.column(0, {
                search: 'applied',
                order: 'applied'
            }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
}

var initModal = function () {
    $('#regulation-modal').on('show.bs.modal', function (e) {
        editor.setContent("");
        $('#r-title').val("");
        bindRegulationAdd();
    })
    /**
     * regulation删除的弹出确认框，使用layer
     */
    $(".regulation-delete").off('click').on('click', function (e) {
        var reguid = $(this).data("reguid");
        var btn = $(this);
        var index = layer.confirm('删除后无法恢复,确定删除这条法规吗?', {
            btn: ['确定', '取消'], icon: 0, title: '提示'
        }, function () {
            $.ajax({
                type: "get",
                url: "/admin/deleteRegulation/" + reguid,
                success: function (message) {
                    if (message.code) {
                        layer.msg(message.msg, {time: 2000, icon: 1});
                        table.row(btn.parents('tr')).remove().draw();
                    } else {
                        layer.msg(message.msg, {time: 2000, icon: 2, anim: 6});
                    }
                    layer.close(index);
                }
            })
        });
    })

    $(".regulation-show").off('click').on('click', function (e) {
        var title=$(this).parent().parent().children('.r-title').html();
        var content = $(this).parent().children('.regulation-content').html();
        var keyword = $("#regulation_table_filter input").val();
        content = content.replace(keyword, "<span class='search'> " + keyword + " </span>");
        content = "<div style='padding: 15px'>" + content + "</div>";
        layer.open({
            type: 1,
            shade: 0.05,
            shadeClose: true,
            title: '<span class="fa fa-file-text-o" style="color: #498f3e"></span> '+title,
            area: ['960px', '85%'],
            maxmin: true,
            content: content
        });
    })
    $('#edit-modal').on('show.bs.modal', function (e) {
        var btn = $(e.relatedTarget);
        var reguId = btn.data("reguid");
        var content = btn.parent().children('.regulation-content').html();
        var title = btn.parents('tr').children('.r-title').html();
        var department = btn.parents('tr').children('.r-department').html();
        var category = btn.parents('tr').children('.r-category').html();
        $('#r-e-title').val(title.replace(/(^\s*)|(\s*$)/g, ""));
        $('#r-e-department').val(department.replace(/(^\s*)|(\s*$)/g, ""));
        $('#r-e-category').val(category.replace(/(^\s*)|(\s*$)/g, ""));
        reditor.setContent(content);
        $('#r-save').data("reguid", reguId);
        bindRegulationEdit(btn);
    })
}

var checkRegulationTitle = function (regulationTitle, regulationMessage) {
    if (regulationTitle == "") {
        regulationMessage.text("法规名称不能为空");
        return false;
    } else if (regulationTitle.length > 100 || regulationTitle.length < 2) {
        regulationMessage.text("请保持在2-100个字符以内");
        return false;
    }
    return true;
}

var checkRegulationContent = function (regulationContent, regulationMessage) {
    if (regulationContent == "") {
        regulationMessage.text("法规内容不能为空");
        return false;
    }
    return true;
}