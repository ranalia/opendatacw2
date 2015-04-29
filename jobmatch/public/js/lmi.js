// API Demo JavaScript
/*
var getInfo = function(soc) {
    $.get("http://api.lmiforall.org.uk/api/v1/soc/code/" + soc, function(data) {
        $("#info-box h3").text(data.title);
        $("#info-box p.first").text(data.description);
        $("#info-box p.second").text(data.tasks);
    });
    $.get("http://api.lmiforall.org.uk/api/v1/ashe/estimatePay",
    { soc: soc, coarse: "false", breakdown: "gender"},
    function(data) {
        $("#graph-box").html("<p><b>Male:</b> " + data.series[0].breakdown[1].estpay + " GBP/week </p>" +
            "<p><b>Female:</b> " + data.series[0].breakdown[0].estpay + " GBP/week </p>");
    });
};

$(function() {
    $("#search-go").click(function() {
        $.get("http://api.lmiforall.org.uk/api/v1/soc/search", { q: $("#search-input").val() }, function(data, status) {
            $("#list table tbody").empty();
            $.each(data, function(i, e) {
                var tr = $("<tr><td>" + e.soc + "</td><td>" + e.title + "</td></tr>");
                (function(tr, soc) {
                    tr.click(function() {
                        getInfo(soc);
                    });
                })(tr, e.soc);
                $("#list table tbody").append(tr);
            });
        }, "json");
    });
});*/

// modulematch, find keywords
$(function() {
    $("#search-vacancies").click(function() {
        $.get("http://api.lmiforall.org.uk/api/v1/vacancies/search", { keywords: $("#search-input").val() }, function(data, status) {
            $("#list table tbody").empty();
            $.each(data, function(i, e) {
                var tr = $("<tr><td>" + e.id + "</td><td>" + e.title + "</td></tr>");
                (function(tr, vacancies) {
                    tr.click(function() {
                        var description=(e.summary).replace(/\//g," "); //escape slash in parameter
                        $("#info-box p.first").text(e.summary);
                        /*$.get("http://jobsearch.direct.gov.uk/GetJob.aspx?JobID="+e.id,function(data,status){
                            alert("hello");
                        });*/$("#courses table tbody tr td").remove();
                        $.get("/example/"+encodeURIComponent(description),function(data){
                            //var count=0;
                            $("#keywords table tbody").empty();
                            $.each(data,function(i, e){
                                /*if(data[i]._typeGroup=="topics"){
                                    alert(data[i].categoryName);
                                }else {
                                    alert(data[i].name);
                                }*/
                                

                                    if(data[i]._typeGroup=="topics"){
                                        var k=$("<tr><td>"+data[i]._typeGroup+"</td><td></td><td>" +data[i].categoryName+"</td></tr>");

                                        //each keywords search course
                                        $.get("/database/"+encodeURIComponent(data[i].categoryName),function(data){
                                            if(data.length>0){
                                                $("#courses table tbody tr td").remove();
                                            }
                                            $.each(data,function(i, e){
                                                //count++;
                                                var m=$("<tr><td>"+(i+1)+"</td><td>"+data[i].courseNo+"</td><td>"+data[i].courseName+"</td><td>" +data[i].point+"</td></tr>");
                                                /*if(count<13){*/$("#courses table tbody").append(m);//}
                                            });

                                        });
                                    }else if (data[i]._typeGroup=="socialTag"){
                                        var k=$("<tr><td>"+data[i]._typeGroup+"</td><td></td><td>" +data[i].name+"</td></tr>");

                                        //each keywords search course
                                        $.get("/database/"+encodeURIComponent(data[i].name),function(data){
                                            if(data.length>0){
                                                $("#courses table tbody tr td").remove();
                                            }
                                            $.each(data,function(i, e){
                                                //count++;
                                                var m=$("<tr><td>"+(i+1)+"</td><td>"+data[i].courseNo+"</td><td>"+data[i].courseName+"</td><td>" +data[i].point+"</td></tr>");
                                                /*if(count<13){*/$("#courses table tbody").append(m);//}
                                            });

                                        });
                                    }else if (data[i]._typeGroup=="entities"){
                                        var k=$("<tr><td>"+data[i]._typeGroup+"</td><td>"+data[i]._type+"</td><td>" +data[i].name+"</td></tr>");

                                        //each keywords search course
                                        $.get("/database/"+encodeURIComponent(data[i].name),function(data){
                                            if(data.length>0){
                                                $("#courses table tbody tr td").remove();
                                            }
                                            $.each(data,function(i, e){
                                                //count++;
                                                var m=$("<tr><td>"+(i+1)+"</td><td>"+data[i].courseNo+"</td><td>"+data[i].courseName+"</td><td>" +data[i].point+"</td></tr>")
                                                /*if(count<13){*/$("#courses table tbody").append(m);//}
                                            });

                                        });
                                    }
                                    $("#keywords table tbody").append(k);

                            });
                        });
                    });
                })(tr, e.id);
                $("#list table tbody").append(tr);
            });
        }, "json");
    });
});