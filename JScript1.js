$(document).ready(function () {
    //Create columns
    var columns = "";
    for (var i = 1; i < 6; i++) {
        columns += "<div class='ui-state-active'><h3 class='ui-widget-header'>Part " + i + "</h3><p class='ui-content'>Resize me</p></div>";
    }
    $("#container").prepend(columns);

    var sliderValue = 10;
    setColumns();

    function setColumns() {
        $(".ui-state-active").resizable({
            containment: $('#container'),
            //minWidth: 40,
            minHeight: 27,
            maxHeight: $("#container").height() * 2.02,
            handles: 'n',
            resize: function () {
                //$('#constantLine1').css('visibility', 'visible');
                var originalHeight = $(this).height() / 2;
                $(this).each(function () {
                    //Height => Pace
                    var fixedHeight = $(this).height() * (42 / $("#container").height()) + $("#paceSlider").slider("values", 0) - 24;

                    //Pace
                    var seconds = parseInt(fixedHeight % 60, 10);
                    if (seconds.toString().length === 1) {
                        seconds = "0" + seconds;
                    }
                    var minutes = parseInt(fixedHeight / 60, 10);
                    var pace1 = minutes + ":" + seconds;

                    //Distance
                    var distance1 = $(this).width() * $('#raceSlider').slider("values", 0) / $("#container").width();

                    //Time
                    var time1Seconds = parseInt(fixedHeight * distance1 % 60, 10);
                    if (time1Seconds.toString().length === 1) {
                        time1Seconds = "0" + time1Seconds;
                    }
                    var time1Minutes = parseInt(fixedHeight * distance1 / 60, 10);
                    var time1 = time1Minutes + ":" + time1Seconds;

                    //Difference
                    //Equation = (ExpectedPace-ActualPace)*Distance
                    var difference1TimeTemp = ($("#paceSlider").slider("values", 0) - 3 - fixedHeight) * distance1;

                    var difference1Seconds = parseInt(difference1TimeTemp % 60, 10);
                    if (difference1Seconds.toString().length === 1) {
                        difference1Seconds = "0" + difference1Seconds;
                        //alert("jg");
                    }
                    var difference1Minutes = parseInt(difference1TimeTemp / 60, 10);
                    if (difference1Minutes >= 0 && difference1Seconds > 0) {
                        difference1Minutes = "+" + difference1Minutes;
                    }
                    if (difference1Seconds < 0) {
                        difference1Seconds = Math.abs(difference1Seconds);
                        if (difference1Minutes === 0) {
                            difference1Minutes = "-" + difference1Minutes;
                        }
                    }
                    if (difference1Seconds.toString().length === 1) {
                        difference1Seconds = "0" + difference1Seconds;
                    }
                    var differenceTime1 = difference1Minutes + ":" + difference1Seconds;

                    $(this).attr({ 'title': differenceTime1 });
                    $(this).find("p").text("Distance: " + distance1.toFixed(2) + ",  Pace: " + pace1 + ", Time: " + time1 + ", Difference: " + differenceTime1);
                    //$(this).find("p").text("Pace: " + pace1 + ", Time: " + time1);

                    if ($(this).height() < 100) {
                        $(this).find("p").hide();
                    }
                    if ($(this).height() > 100) {
                        $(this).find("p").show();
                    }

                    //if ($(this).offset().left >400) {
                    //    $(this).hide();
                    //}
                    //if ($(this).offset().left < 400) {
                    //    $(this).show();
                    //}
                    //alert($(this).offset().left);

                    //if ($(this).height() > originalHeight) {
                    //    $(this).find("p").css({
                    //        "color": "#D2691E"
                    //    });
                    //}

                    //if ($(this).height() < originalHeight) {
                    //    $(this).find("p").css({
                    //        "color": "green"
                    //    });
                    //}
                });
            }
        });
    }

    $(".ui-state-active").hover(
    //alert("asdf"),

            function () {
                $(this).css({
                    "border-color": "yellow",
                    "border-width": "1px"
                });
            }, function () {
                $(this).css({
                    "border-color": "none",
                    "border-width": "0px"
                });
            });

    $(function () {
        $("#constantLine1").draggable(
            {
                axis: "y",
                containment: $("#container")
            });
    });

    ////////////////rulers////////////////////////

    var distance = 10;
    var ruler = $("#bottom-ruler").empty();
    var item = $(document.createElement("li"));
    i;

    for (i = 1; i < distance; i++) {
        ruler.append(item.clone().text(i));
    }
    $("#bottom-ruler").find("li").css("padding-left", $("#container").width() / (distance) + "px");

    function setRaceRuler() {
        var sliderValue = $("#raceSlider").slider("values", 0);
        var ruler = $("#bottom-ruler").empty();
        var item = $(document.createElement("li"));
        i;
        for (i = 0; i < sliderValue - 1; i++) {
            ruler.append(item.clone().text(i + 1));
        }
        $("#bottom-ruler").find("li").css("padding-left", $("#container").width() / sliderValue + "px");
    }

    function setPaceRuler() {
        var paceValues = "";
        valPace = $("#paceSlider").slider("values", 0) + 17;
        //alert(valPace);
        for (var i = 0; i < 21; i++) {
            var seconds = ((valPace - i * 2) % 60);
            //seconds = 5 * (Math.floor((Math.abs(seconds / 5))))
            if (seconds.toString().length === 1) {
                seconds = "0" + seconds;
            }
            var minutes = parseInt((valPace - i * 2) / 60, 10);
            paceValues += minutes + ":" + seconds + "-<br/>";
        }
        $('#left-ruler').html("<p/>" + paceValues);
    }

    ////////////////////sliders//////////////////////////
    //raceSlider
    $(function () {
        $("#raceSlider").slider(
        {
            animate: "fast",
            range: "min",
            min: 0,
            max: 42,
            value: 10,
            slide: function (event, ui) {
                $("#raceInput").val(ui.value + "km");
                $("#raceInput2").val(ui.value + "km");
            }
        });
    });

    //timeSlider
    $("#timeSlider").slider({
        animate: "fast",
        range: "min",
        min: 0,
        max: 3600 * 2, //(seconds*hrs.)
        value: 3600,
        slide: slideTime
    });
    function slideTime() {
        var val0 = $("#timeSlider").slider("values", 0),
        //seconds0 = 5 * (Math.floor((Math.abs((val0 % 60) / 5)))), עיגול לחמש
        seconds0 = val0 % 60,
        minutes0 = parseInt((val0 / 60) % 60, 10),
        hours0 = parseInt(val0 / 3600, 10),

        startTime = getTime(hours0, minutes0, seconds0);
        $("#timeTarget").val(startTime);
    }
    function getTime(hours, minutes, seconds) {
        seconds = seconds + "";

        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }

        minutes = minutes + "";

        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds + " hour";
    }
    slideTime();

    //PaceSlider
    $("#paceSlider").slider({
        animate: "fast",
        range: "min",
        min: 0,
        max: 1200, //(seconds)
        value: 363,
        slide: paceTime
    });
    function paceTime() {
        var val0 = $("#paceSlider").slider("values", 0) - 3,
        //seconds0 = 5 * (Math.floor((Math.abs((val0 % 60) / 5)))), יחידות חמש שניות
        seconds0 = parseInt(val0 % 60, 10),
        minutes0 = parseInt(val0 / 60, 10),

        startTime = getPaceTime(minutes0, seconds0);
        $("#TargetPaceTime").val(startTime);
    }
    var unit1 = " min/km";
    function getPaceTime(minutes, seconds) {
        seconds = seconds + "";

        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }

        minutes = minutes + "";

        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds + unit1;
    }
    paceTime();
    setPaceRuler();
    //SpeedSlider
    //    $(function () {
    //        $("#speedSlider").slider({
    //            animate: "fast",
    //            range: "min",
    //            min: 0,
    //            max: 20, //(km/hr)
    //            value: 12,
    //            slide: function (event, ui) {
    //                $("#TargetSpeedTime").val(ui.value + " km/hr");
    //                //$("#TargetSpeedTime").val((3600 / $('#paceSlider').val()) + " km/hr");
    //            }
    //        });
    //       $("#speedSlider").change(function() {
    //         (this).slider("value", ui.value);
    //         });
    //    });

    //factorSlider
    //$(function () {
    //    $("#factorSlider").slider(
    //    {
    //        min: 0,
    //        max: 8,
    //        value: 3,
    //        slide: function (event, ui) {
    //            var splitData = ["-4%", "-3%", "-2%", "-1%", "0%", "+1%", "+2%", "+3%", "+4%"];
    //            $("#targetFactorTime").val(splitData[ui.value]);
    //        }
    //    });
    //    $("#factorSlider").stop(function () {
    //        (this).slider("value", ui.value);
    //    });
    //});

    //splitSlider
    $(function () {
        $("#splitSlider").slider(
        {
            animate: "fast",
            range: "min",
            min: 1,
            max: 6,
            value: 4,
            slide: function (event, ui) {
                $("#splitNumber").val(ui.value);
            }
        });
    });

    //parameters connections

    $("#raceSlider").slider({
        stop: function () {
            $('#timeSlider').slider("option", "value", $(this).slider("values", 0) * $("#paceSlider").slider("values", 0));
            sliderValue = $('#raceSlider').slider("values", 0);
            slideTime();
            setRaceRuler();
            setPaceRuler();
        }

        //לעשות צבע מהבהב של אתחול ואז להעביר את הערכים לאפס todo
        //                $('#timeSlider').val(0);
        //                $('#paceSlider').val(0);
        //שינוי של הסרגל התחתון ושל רוחב/מספר העמודות
    });

    $("#timeSlider").slider({
        stop: function () {
            $('#paceSlider').slider("option", "value", $('#timeSlider').slider("values", 0) / $('#raceSlider').slider("values", 0));
            //$('#speedSlider').slider("option", "value", (3600 / $('#paceSlider').slider("values", 0)));
            //alert($('#timeSlider').slider("values", 0) / $('#raceSlider').slider("values", 0));

            paceTime();
            setPaceRuler();
        }
    });

    $('#constantLine1').draggable({
        containment: $('#container'),
        stop: function () {
            //var cPosition = $(this).position();
            //var yPos = cPosition.top;
            //$('#paceSlider').slider("option", "value", (ypos-327)*3/2*(-1));
            paceTime();
            //alert(yPos);
        }
    });
    var valPace = 0;
    $("#paceSlider").slider({
        stop: function () {
            $('#timeSlider').slider("option", "value", $("#raceSlider").slider("values", 0) * $("#paceSlider").slider("values", 0));
            //$('#constantLine1').animate({ top: 327 - $("#paceSlider").slider("values", 0) * 2 / 3 }, 0);
            //$(".ui-state-active").height($("#paceSlider").slider("values", 0) * 2 / 3);
            //$(".ui-state-active").offset({ top: (483 - ($("#paceSlider").slider("values", 0) * 2 / 3)) });

            //$('#timeSlider').text("option", "value", $("#raceSlider").slider("values", 0) * $("#paceSlider").slider("values", 0));

            //alert($("#paceSlider").slider("values", 0));

            slideTime();
            setPaceRuler();
            paceTime();
        }

    });

    $("#splitSlider").slider({
        stop: function () {
            if ($(this).slider("values", 0) > $(".ui-state-active").length) {
                var columns = "";
                for (var i = $(".ui-state-active").length; i < $(this).slider("values", 0) ; i++) {
                    columns += "<div class='ui-state-active'><h3 class='ui-widget-header'>Part " + i + "</h3><p class='ui-content'>Resize me</p></div>";
                }
                $("#container").append(columns);

                setColumns();
            }

            if ($(this).slider("values", 0) < $(".ui-state-active").length) {
                var n = $(".ui-state-active").length - $(this).slider("values", 0);
                for (var j = 0; j < n; j++) {
                    $(".ui-state-active").last().remove();
                }
            }
        }
    });

    //        $("speedSlider").slider({
    //            stop: function (event, ui) {
    //                $('#speedSlider').slider("option", "value", $("#raceSlider").slider("values", 0) * $("#paceSlider").slider("values", 0));
    //    }
    //        });

    //$("#factorSlider").slider({
    //    change: function (event, ui) {
    //        var splitData = [0.96, 0.97, 0.98, 0.99, 1, 1.01, 1.02, 1.03, 1.04];
    //        var splitVal = $("#factorSlider").slider("values", 0);

    //        for (var i = 0; i < $(".ui-state-active").length; i++) {
    //            $(".ui-state-active:eq[index]").height($(".ui-state-active:eq[index]").height() * Math.pow(splitData[splitVal], index++ + 1).css('top', $(".ui-state-active:eq[index]").position().top * Math.pow(splitData[8 - ("#factorSlider").slider("values", 0)], index + 1)));
    //        };
    //    }
    //});

    var j = $(".ui-state-active").length;
    var splitHeight = [75, 63, 50, 38, 27];
    var splitTop = [25, 37, 50, 62, 73];
    function constantSplit() {
        for (var i = 0; i < j; i++) {
            $(".ui-state-active").eq(i).height($('#container').height() / 2 + 'px');
            $(".ui-state-active").eq(i).css('top', $('#container').height() / 2 + 'px');
        }
    }

    $("#Negative").click(function () {
        constantSplit();
        for (var i = 0; i < j; i++) {
            $(".ui-state-active").eq(i).height(splitHeight[i] + '%');
            $(".ui-state-active").eq(i).css('top', splitTop[i] + '%');
            //alert("asdf");
            $('img').hide();
        }
    });

    $("#Constant").click(function () {
        constantSplit();
    });

    $("#Positive").click(function () {
        constantSplit();
        var k = j;
        for (var i = 0; i < j; i++) {
            k--;
            //alert(k);
            $(".ui-state-active").eq(i).height(splitHeight[k] + '%');
            $(".ui-state-active").eq(i).css('top', splitTop[k] + '%');
        }
    });

    function beginningDelay() {
        $('#Negative').trigger('click');
    }
    beginningDelay();
    /////////////////////////////////Select Buttons///////////////////
    //$('#saveChart').click(function () {
    //    html2canvas($("#avner"), {
    //        onrendered: function (canvas) {
    //            // canvas is the final rendered <canvas> element
    //            var myImage = canvas.toDataURL("image/png");
    //            window.open(myImage);
    //        }
    //    });
    //});
    //$("#swimmingButton").click(function () {
    //    unit1 = " min/100m";
    //    $('#container').find('.ui-widget-header').first().text("Swimming");
    //    $("#TargetPaceTime").val(" min/100m");
    //});
    //$("#runningButton").click(function () {
    //    unit1 = " min/km";
    //    $('#container').find('.ui-widget-header').first().text("Running");
    //    $("#TargetPaceTime").val(" min/km");
    //});
    //$("#cyclingButton").click(function () {
    //    unit1 = " km/hr";
    //    $('#container').find('.ui-widget-header').first().text("Cycling");
    //    $("#TargetPaceTime").val(" km/hr");
    //});

    //////////////////////tooltip function////////////////////
    $(function () {
        $(document).tooltip({
            position: {
                my: "center bottom-20",
                at: "center top",
                using: function (position, feedback) {
                    $(this).css(position);
                    $("<div>")
            .addClass("arrow")
            .addClass(feedback.vertical)
            .addClass(feedback.horizontal)
            .appendTo(this);
                }
            }
        });
    });

    //////////////////////////Results box////////////////////////

    $(".ui-state-active").on("resize", function () {
        //alert("asd");
        var totalTime1 = 0;
        var totalTime1Seconds = 0;
        var totalTime1Minutes = 0;
        var totalTime1Temp = 0;
        var difference1TimeTemp = 0;
        var difference1Seconds = 0;
        var difference1Minutes = 0;
        var fixedHeight = 0;
        var avner = 0;
        $(".ui-state-active").each(function () {
            fixedHeight = $(this).height() * (42 / $("#container").height()) + $("#paceSlider").slider("values", 0) - 24;
            totalTime1Temp += fixedHeight * $(this).width() * sliderValue / $("#container").width();
            difference1TimeTemp += ($("#paceSlider").slider("values", 0) - 3 - fixedHeight) * ($(this).width() * sliderValue / $("#container").width());
        });

        totalTime1Seconds = parseInt(totalTime1Temp % 60, 10);
        if (totalTime1Seconds.toString().length === 1) {
            totalTime1Seconds = "0" + totalTime1Seconds;
        }
        totalTime1Minutes = parseInt(totalTime1Temp / 60, 10);
        totalTime1 = totalTime1Minutes + ":" + totalTime1Seconds;

        difference1Seconds = parseInt(difference1TimeTemp % 60, 10);
        if (difference1Seconds.toString().length === 1) {
            difference1Seconds = "0" + difference1Seconds;
            //alert("jg");
        }
        difference1Minutes = parseInt(difference1TimeTemp / 60, 10);
        if (difference1Minutes >= 0 && difference1Seconds > 0) {
            difference1Minutes = "+" + difference1Minutes;
        }
        if (difference1Seconds < 0) {
            difference1Seconds = Math.abs(difference1Seconds);
            if (difference1Minutes === 0) {
                difference1Minutes = "-" + difference1Minutes;
            }
        }
        if (difference1Seconds.toString().length === 1) {
            difference1Seconds = "0" + difference1Seconds;
        }
        var differenceTime1 = difference1Minutes + ":" + difference1Seconds;

        differenceTime1 = difference1Minutes + ":" + difference1Seconds;
        $("#expectedTime").html("<br/>Expected Time: " + totalTime1 + "<br/> Difference: " + differenceTime1);
    });

    ////////////////////////////////Cross-browser window resize events//////////////////
    $('#container').height($('#left-ruler').height() * 0.95);

    $(window).resize(function () {
        setRaceRuler();
        $('#container').height($('#left-ruler').height() * 0.95);
    });
});