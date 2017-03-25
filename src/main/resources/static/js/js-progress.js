/**
 * Created by spoomlzx on 2017/3/9.
 */
var table;
$(document).ready(function () {
    $('.left-sidebar li.active').removeClass('active');
    $('#li-progress').addClass('active');
    $.ajax({
        type: "get",
        url: "/getUnitTree/" + 126,
        success: function (data) {
            $.fn.zTree.init($("#treeDemo"), setting, data);
        }
    })
    initTable();

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
    $('#workhistory_table').data('unitid', treeNode.id);
    var url = '../getWorkHistory/' + treeNode.id;
    table.ajax.url(url).load();
}

var initTable = function () {
    // begin first table
    table = $('#workhistory_table').DataTable({

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
            "search": "<span class='fa fa-search'></span>搜索: ",
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
        "order": [
            [1, "asc"]
        ], // set first column as a default sort by asc
        "deferRender": true,
        "ajax": {
            url: "../getWorkHistory/" + $('#workhistory_table').data('unitid'),
            "type": "get",
            dataSrc: ""
        },
        "columns": [
            {data: "name", 'width': '45%'},
            {data: "type", 'width': '5%'},
            {data: "status", 'width': '15%'},
            {
                data: "limit",
                'width': '15%',
                render: function (data, type, row, meta) {
                    return (new Date(data)).Format("yyyy-MM-dd"); //date的格式 Thu Apr 26 2016 00:00:00 GMT+0800
                }
            },
            {
                'width': '20%',
                render: function (data, type, row, meta) {
                    return "<button class='btn btn-danger btn-delete'>删除</button>";
                }
            }
        ],

        //字段搜索框
        initComplete: function () {
            var api = this.api();
            api.columns().indexes().flatten().each(function (i) {
                if (i > 0 && i < 3) {
                    var column = api.column(i);
                    var select = $('<select class="form-control"><option value=""></option></select>')
                        .appendTo($(column.footer()).empty())
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

    $('#workhistory_table tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
}

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,
        //月份
        "d+": this.getDate(),
        //日
        "h+": this.getHours(),
        //小时
        "m+": this.getMinutes(),
        //分
        "s+": this.getSeconds(),
        //秒
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
