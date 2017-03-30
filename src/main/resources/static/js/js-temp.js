/**
 * Created by spoomlzx on 2017/3/21.
 */
$(document).ready(function () {
    $('.left-sidebar li.active').removeClass('active');
    $('#li-temp').addClass('active');
    initCalendar();
    var height=document.body.offsetHeight-72;
    $('#calendar').fullCalendar('option', 'height', height);
    $(window).resize(function(){
        var height=document.body.offsetHeight-72;
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
        displayEventTime:false,
        weekNumbers:true,
        defaultDate: moment().format('YYYY-MM-DD'),
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
                $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
            }
            $('#calendar').fullCalendar('unselect');
        },
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: '中共中央常务委员会第五次会议',
                start: '2017-03-01'
            },
            {
                title: 'Long Event',
                start: '2017-03-07',
                end: '2017-03-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2017-03-09T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2017-03-16T16:00:00',
            },
            {
                title: 'Conference',
                start: '2017-03-11',
                end: '2017-03-13',
                backgroundColor:'green'
            },
            {
                title: '中共中央常务委员会第五次会议',
                start: '2017-03-12T10:30:00',
                end: '2017-03-12T12:30:00',
                backgroundColor:'red'
            },
            {
                title: 'Lunch',
                start: '2017-03-21T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2017-03-22T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2017-03-27T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2017-03-28T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2017-03-29T07:00:00'
            },
            {
                title: 'Click for Google',
                start: '2017-03-28'
            }
        ]
    });
}