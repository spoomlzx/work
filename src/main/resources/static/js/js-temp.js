/**
 * Created by spoomlzx on 2017/3/21.
 */
$(document).ready(function () {
    $('.left-sidebar li.active').removeClass('active');
    $('#li-temp').addClass('active');
    initCalendar();
    var height = document.body.offsetHeight - 82;
    $('#calendar').fullCalendar('option', 'height', height);
    $(window).resize(function () {
        var height = document.body.offsetHeight - 82;
        $('#calendar').fullCalendar('option', 'height', height);
    })
    bindEventAddSubmit();
});

initCalendar = function () {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next listWeek',
            center: 'title',
            right: 'month,agendaWeek,today'
        },
        currentTimezone: 'Asia/Beijing',
        weekNumbers: true,
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectHelper: true,
        select: function (start, end) {
            //取消fullcalendar的选择状态
            $('#calendar').fullCalendar('unselect');
            // 初始化modal
            initEventAddModal(start, end);
        },
        eventDrop: function (event, delta, revertFunc) {

            //alert(event.title + " was dropped on " + event.start.format());

            //showTip("warning","出错",event.title + " was dropped on " + event.start.format());

        },
        eventResize: function (event, delta, revertFunc) {

            alert(event.title + " end is now " + event.end.format());

            // if (!confirm("is this okay?")) {
            //     revertFunc();
            // }

        },
        eventClick: function (event) {
            /**
             * 绑定显示event的数据
             */
            $(".event-title-show h3").html(event.title);
            var time;
            if (event.end == null) {
                time = event.start.format("MM月DD日 HH:mm");
            } else if (event.start.format("HH:mm:ss") == "00:00:00" && event.end.format("HH:mm:ss") == "00:00:00") {
                time = event.start.format("MM月DD日") + " – " + event.end.subtract('seconds', 1).format("MM月DD日");
            } else {
                time = event.start.format("MM月DD日 HH:mm") + " – " + event.end.format("MM月DD日 HH:mm");
            }
            $(".event-time-show > div > span:nth-child(2)").html(time);
            $(".event-person-show label").css("background-color", event.color);
            $(".event-describe-show").html(event.describe);

            $('#delete-modal').on('show.bs.modal', function (e) {
                $("#e-delete").one("click",function () {
                    $.ajax({
                        type: "get",
                        url: "/deleteEvent/" + event.id,
                        success: function (message) {
                            $('#delete-modal').modal('hide');
                            if (message.code) {
                                showTip("success","提示",message.msg);
                                $('#calendar').fullCalendar('removeEvents',event.id);
                            }
                        }
                    })
                })
            })
            /**
             * 显示event详情的右侧弹出栏，使用css动画
             */
            $(".modal-sidebar").addClass("display-block");
            setTimeout(function () {
                $(".sidebar").addClass("in");
            }, 25);
            $(".modal-sidebar").click(function (e) {
                var _con = $(".sidebar");
                if (!_con.is(e.target) && _con.has(e.target).length === 0) {
                    $(".sidebar").removeClass("in");
                    setTimeout(function () {
                        $(".modal-sidebar").removeClass("display-block");
                    }, 300);
                }
            });
        },
        editable: true,
        eventSources: [
            {
                url: '/getEvents',
                type: 'POST',
                error: function () {
                    alert('获取工作失败！');
                }
            }
        ]
    });
}

var initEventAddModal = function (start, end) {
    $('#event-add-modal').modal('show');
    $('.event-title input').val("");
    $('.event-person input').val("");
    $('.event-time').val("");
    $('#pri-0').attr("checked", true);
    $('.event-describe textarea').val("");
    $('.event-time').datetimepicker('remove');
    $('.event-time').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        minuteStep: 30,
        format: 'yyyy-mm-dd hh:ii'
    });
    $(".event-start .event-time").on("changeDate", function (e) {
        $('.event-end .event-time').datetimepicker('setStartDate', e.date);
    });
    $(".event-end .event-time").on("changeDate", function (e) {
        $('.event-start .event-time').datetimepicker('setEndDate', e.date);
    });
    if (start.format("HH:mm:ss") == "00:00:00" && end.format("HH:mm:ss") == "00:00:00") {
        $('.event-start .event-time').val(start.format("YYYY-MM-DD"));
        $('.event-end .event-time').val(end.format("YYYY-MM-DD"));
    } else {
        $('.event-start .event-time').val(start.format("YYYY-MM-DD HH:mm"));
        $('.event-end .event-time').val(end.format("YYYY-MM-DD HH:mm"));
    }
}

var bindEventAddSubmit = function () {
    $("#event-add-btn").click(function () {
        if (checkEventInput()) {
            var eventData = {
                title: $('.event-title input').val(),
                person: $('.event-person input').val(),
                describe: $('.event-describe textarea').val(),
                start: $('.event-start .event-time').val(),
                end: $('.event-end .event-time').val(),
                color: $('.event-priority input:radio:checked').val()
            };
            $.ajax({
                type: "post",
                url: "/addEvent",
                contentType: "application/json",
                data: JSON.stringify(eventData),
                success: function (message) {
                    if (message.code) {
                        $('#calendar').fullCalendar('renderEvent', message.data, true);
                        showTip("success", "成功", message.msg);
                    } else {
                        showTip("error", "出错", message.msg);
                    }
                }
            })
            $('#event-add-modal').modal('hide');
        }
    })
}

var checkEventInput = function () {
    if ($('.event-title input').val() == "") {
        $('.event-title').addClass("has-error");
        return false;
    } else {
        $('.event-title').removeClass("has-error");
    }
    if ($('.event-start input').val() == "") {
        $('.event-start').addClass("has-error");
        return false;
    } else {
        $('.event-start').removeClass("has-error");
    }
    if ($('.event-end input').val() == "") {
        $('.event-end').addClass("has-error");
        return false;
    } else {
        $('.event-end').removeClass("has-error");
    }
    return true;
}