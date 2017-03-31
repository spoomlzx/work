/**
 * Created by spoomlzx on 2017/3/21.
 */
$(document).ready(function () {
    $('.left-sidebar li.active').removeClass('active');
    $('#li-temp').addClass('active');
    initCalendar();
    var height=document.body.offsetHeight-82;
    $('#calendar').fullCalendar('option', 'height', height);
    $(window).resize(function(){
        var height=document.body.offsetHeight-82;
        $('#calendar').fullCalendar('option', 'height', height);
    })
});

initCalendar = function () {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next listWeek',
            center: 'title',
            right: 'month,agendaWeek,today'
        },
        currentTimezone: 'Asia/Beijing',
        displayEventTime:false,
        weekNumbers:true,
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectHelper: true,
        select: function (start, end) {
            var title = prompt('Event Title:');
            var eventData;
            if (title) {
                eventData = {
                    title: title,
                    start: start,
                    end: end
                };
                $('#calendar').fullCalendar('renderEvent', eventData, true);
            }
            $('#calendar').fullCalendar('unselect');
        },
        editable: true,
        eventSources: [
            {
                url: '/getEvents',
                type: 'POST',
                data:{
                  unitId:  $("#calendar").data("unitid")
                },
                error: function() {
                    alert('there was an error while fetching events!');
                }
            }
        ],
        events:[
            {
                title: 'Business Lunch',
                start: '2017-03-23',
            }
        ]
    });
}