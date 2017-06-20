/**
 * Created by spoomlzx on 2017/3/21.
 */
$(document).ready(function () {
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
        editable: true,
        showNonCurrentDates: false,
        currentTimezone: 'Asia/Beijing',
        weekNumbers: true,
        navLinks: true,
        selectable: true,
        selectHelper: true,
        select: function (start, end) {
            //取消fullcalendar的选择状态
            $('#calendar').fullCalendar('unselect');
            // 初始化modal
            initEventAddModal(start, end);
        },
        eventDrop: function (event, delta, revertFunc) {
            var start='', end='';
            if (false==event.allDay) {
                start = event.start.format("YYYY-MM-DD HH:mm:ss");
                if(event.end){
                    end = event.end.format("YYYY-MM-DD HH:mm:ss");
                }
            } else {
                start = event.start.format("YYYY-MM-DD");
                if(event.end){
                    end = event.end.format("YYYY-MM-DD");
                }
            }
            var data = {
                id: event.id,
                start: start,
                end: end
            }
            updateEvent(data,revertFunc);
        },
        eventResize: function (event, delta, revertFunc) {
            var end;
            if (true==event.allDay) {
                end = event.end.format("YYYY-MM-DD");
            } else {
                end = event.end.format("YYYY-MM-DD HH:mm:ss");
            }
            var data = {
                id: event.id,
                end: end
            }
            updateEvent(data,revertFunc);
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
                time = event.start.format("MM月DD日") + " – " + event.end.subtract(1, 'd').format("MM月DD日");
                event.end.add(1,'d');
            } else {
                time = event.start.format("MM月DD日 HH:mm") + " – " + event.end.format("MM月DD日 HH:mm");
            }
            $(".event-time-show > div > span:nth-child(2)").html(time);
            $(".event-person-show > div > span:nth-child(3)").html(event.person);
            $(".event-person-show label").css("background-color", event.color);
            $(".event-describe-show").html(event.describe);
            /**
             * 显示event详情的右侧弹出栏，使用layer
             */
            var index = layer.open({
                type: 1
                , title: '<div class="fa fa-edit"></div> 工作详情'
                , content: $('.event-detail')
                , shade: 0.05
                , shadeClose: true
                , resize: false
                , fixed: false
                , area: ['360px', '80%']
                , offset: 'rb'
            });
            $(".event-delete").unbind('click').click(function () {
                layer.confirm('删除后无法恢复,确定删除这条法规吗?', {
                    btn: ['确定', '取消'], icon: 0, title: '提示'
                }, function () {
                    $.ajax({
                        type: "get",
                        url: "/deleteEvent/" + event.id,
                        success: function (message) {
                            if (message.code) {
                                layer.msg(message.msg, {time: 2000, icon: 1});
                                layer.close(index);
                                $('#calendar').fullCalendar('removeEvents', event.id);
                            } else {
                                layer.msg(message.msg, {time: 2000, icon: 2, anim: 6});
                            }
                        }
                    })
                });
            })
        },
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

var updateEvent=function (event,revertFunc) {
    $.ajax({
        type: "post",
        url: "/editEvent",
        contentType: "application/json",
        data: JSON.stringify(event),
        success: function (message) {
            if (message.code) {
                layer.msg(message.msg, {time: 2000, icon: 1});
            } else {
                layer.msg(message.msg, {time: 2000, icon: 2, anim: 6});
                revertFunc();
            }
        }
    })
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
                        layer.msg(message.msg, {time: 2000, icon: 1});
                    } else {
                        layer.msg(message.msg, {time: 2000, icon: 2, anim: 6});
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