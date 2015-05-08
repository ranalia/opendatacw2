var data = [ { "id": "0", "text": "4431:Computer Science BSc Computer Science" }, { "id": "1", "text": "4432:Artificial Intelligence BSc Computer Science" }, { "id": "2", "text": "4433:Image and Multimedia Systems BSc Computer Science" }, { "id": "3", "text": "4434:Distributed Systems & Networks BSc Computer Science" }, { "id": "4", "text": "4435:MEng Software Engineering" }, { "id": "5", "text": "4442:MSc Microelectronics Syst Des" }, { "id": "6", "text": "4443:Computer Science MEng Computer Science" }, { "id": "7", "text": "4444:Artificial Intelligence MEng Computer Science" }, { "id": "8", "text": "4445:Distributed Systems & Networks MEng Computer Science" }, { "id": "9", "text": "4446:Image and Multimedia Systems MEng Computer Science" }, { "id": "10", "text": "4463:BSc IT in Organisations" }, { "id": "11", "text": "4465:BEng Software Engineering" }, { "id": "12", "text": "4469:MSc Software Engineering" }, { "id": "13", "text": "4470:MSc Web Technology" }, { "id": "14", "text": "4471:MSc System on Chip" }, { "id": "15", "text": "4475:MSc Artificial Intelligence" }, { "id": "16", "text": "4477:MEng CompSci with MSS" }, { "id": "17", "text": "4478:MSc Web Science" }, { "id": "18", "text": "4479:Nanoelect and Nanotech" }, { "id": "19", "text": "4480:MSc MEMS" }, { "id": "20", "text": "4481:MSc Bionanotechnology Inactive" }, { "id": "21", "text": "4482:MSc Wireless Communications" }, { "id": "22", "text": "4485:MComp ITO" }, { "id": "23", "text": "4486:MSc Energy & Sustain w/EPE" }, { "id": "24", "text": "4504:Euro MSc in Emb Comp Syst (EM)" }, { "id": "25", "text": "4506:MSc Systems & Signal Proc" }, { "id": "26", "text": "5071:MSc Photonic Technologies" }, { "id": "27", "text": "5172:BSc Web Science (Comp Sci)" }, { "id": "28", "text": "5185:BSc Web Science (SocSci)" }, { "id": "29", "text": "5471:MSc Cyber Security" } ];

//var data = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'bug' }, { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, { id: 4, text: 'wontfix' }];

$(".course-array").select2({
  data: data
})

var getInfo = function (keyword){
    $.get("http://api.lmiforall.org.uk/api/v1/vacancies/search", {
            keywords: keyword
        }, function(data, status) {      
            $("#job-list table tbody").empty();
            $.each(data, function(i, e) {
                var tr = $("<tr><td>" + e.id + "</td><td>" + e.title + "</td></tr>");
                    tr.click(function() {
                        $("#job-info").remove();
                        $("#info-box").append("<p id='job-info'>more from: <a href='http://jobsearch.direct.gov.uk/GetJob.aspx?JobID="+e.id+"'>Universal Jobmatch Site</a></p>");
                        $("#info-box p.first").text(e.summary);
                    });
                $("#job-list table tbody").append(tr);
            });
        });

}

$(function() {
    $("#search-from-course").click(function() {
        var arr = [];
        var course = $("select.course-array option:selected").val();
        var tag_count = 0;
        $.get("/match/"+course,function(data){
            $("#course-tag").empty();
            $.each(data, function(i, e) {
                var tr = $("<span class='label label-primary'>" + e.keyword +"</span>");

                (function(tr, keyword) {
                    tr.click(function() {
                        getInfo(keyword);
                    });
                })(tr, e.keyword);

                if(tag_count<5){
                    tag_count++;
                    $("#course-tag").append(tr);
                }else{
                    $("#course-tag").append("<br>");
                    $("#course-tag").append(tr);
                    tag_count = 0;
                }
                
                /*$.get("http://api.lmiforall.org.uk/api/v1/vacancies/search",{keywords:e.keyword},function(data,status){
                    $.each(data,function(i,e){
                        arr.push(data[i]);
                    });
                });*/
            });
            
        });
        /*$.get("http://api.lmiforall.org.uk/api/v1/soc/search", { q: $("#search-input").val() }, function(data, status) {
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
        }, "json");*/
    });
});