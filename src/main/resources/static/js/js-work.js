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
                    $("#w-ul-" + i).append("<li class='list-group-item search-show' data-type='"+itemj.type+"' data-workid='" + itemj.workId + "'><span>" + index + "、</span>" + itemj.name + "</li>");
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
        var unitId=$("#w-search").data("unitid");
        var type=$(this).data("type");
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
                type:type
            },
            success: function (data) {
                $("#w-check").data("workid",data.workId);
                $("#w-workid").html(data.workId);
                $("#w-check").data("type",data.type);
                if(data.check){
                    $("#w-check").removeClass("btn-warning").removeClass("btn-success").addClass("btn-success");
                    $("#w-check span.fa").removeClass("fa-spinner").removeClass("fa-check").addClass("fa-check");
                    $("#w-check span.check-info").empty();
                    $("#w-check span.check-info").html("已完成该项工作");
                }else{
                    $("#w-check").removeClass("btn-warning").removeClass("btn-success").addClass("btn-warning");
                    $("#w-check span.fa").removeClass("fa-spinner").removeClass("fa-check").addClass("fa-spinner");
                    $("#w-check span.check-info").empty();
                    $("#w-check span.check-info").html("现在完成");
                }

                //将文中出现的关键词标红加粗
                var content = data.content;
                var basis = data.basis;
                var tips = data.tips;
                var keyword = $("#w-keyword").val();
                var kwpattern =new RegExp(keyword,"g");
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
                    var c=b.content.replace(kwpattern, "<span class='search'> " + keyword + " </span>");
                    $("#regulation-modal .modal-body").html(c);
                })
                $("#p-regulations ul").empty();
                $.each(data.regulations, function (i, item) {
                    $("#p-regulations ul").append("<li data-toggle='modal' href='#regulation-modal' data-id=" + i + "><a href='javascript:;'>" + item.title + "</a></li>");
                })

            }
        })
    });
}

var bindSearch = function () {
    $("#w-search").click(function () {
        var unittypeid=$("#w-search").data("unittypeid");
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
        if((event.keyCode || event.which)==13){
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

