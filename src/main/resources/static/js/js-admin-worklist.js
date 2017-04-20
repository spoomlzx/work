/**
 * Created by spoomlzx on 2017/2/25.
 */

var table;
$(document).ready(function () {
    initTable();
})

var initTable = function () {
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
            {"searchable": false, 'targets': 0, 'width': '10%'},
            {'targets': 1, 'width': '55%'},
            {'targets': 2, 'width': '10%'},
            {'orderable': false, 'searchable': false, 'targets': 3, 'width': '25%'}
        ],
        "order": [
            [1, "asc"]
        ], // set first column as a default sort by asc

        //字段搜索框
        initComplete: function () {
            var api = this.api();
            api.columns().indexes().flatten().each(function (i) {
                if (i > 0 && i < 3) {
                    var column = api.column(i);
                    var select = $('<select class="form-control"><option value=""></option></select>')
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
}