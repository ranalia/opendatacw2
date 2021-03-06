var sqlite3 = require('sqlite3').verbose();
var jsonQuery = require('json-query');
var jsonData = require('../public/course.json');



exports.db = function(req, res) {

    var db = new sqlite3.Database('./db_1.sqlite');
    var sess = req.session;
    var keyword = req.params.content;
    var data = {
        'courseNo': jsonData
    };
    var count = [];
    var course_output = [];
    var arr = [];
        if(sess.match == 1){ //previous matched course
            course_output = sess.course_output;
            count = sess.count;               
            //console.log("*****"+keyword+"session start:"+course_output);
            //console.log("session start:"+sess.match);
      }else if(sess.match == 0){ /*console.log("*****"+keyword+"session start0:"+course_output);*/ };
      
          db.serialize(function() {
              if(keyword!=null||keyword!=undefined){
                    sess.match = 1;
                    res.session = sess;
                    db.each("SELECT course FROM keywordID WHERE keyword LIKE '%" + keyword + "%'", function(err, rows) {
                    if (rows == null) {
                        res.send("No Match keyword!");
                    }
                    var exist = -1;
                    for (var i = 0; i < course_output.length; i++) {
                        if (rows.course == course_output[i] && rows.course != undefined && exist == -1) { //exist in array
                            exist = i;
                        }
                    }
                    if (exist == -1 && rows.course != undefined) { //new added
                        course_output.push(rows.course);
                        count[course_output.length - 1] = 1;
                    } else if (exist != -1) { // already exist
                        count[exist]++;
                        exist == -1;
                    }
                }, function() {
                    sess.course_output = course_output;
                    sess.count = count;
                    
                    //console.log("*****"+keyword+"session end1:"+course_output);
                    //console.log("session end:"+sess.match);
                    res.session = sess;
                    for (var i = 0; i < course_output.length; i++) {
                        var param = {
                            'courseNo': course_output[i],
                            'courseName': jsonQuery("courseNo[id=" + course_output[i] + "].name", {
                                data: data
                            }).value,
                            'point': count[i]
                        }
                         // console.log(course_output[i] + "," + jsonQuery("courseNo[id=" + course_output[i] + "].name", {
                         //     data: data
                         // }).value + "," + count[i]);
                        arr.push(param);
                    }
                    //console.log(res.session);
                    arr.sort(sortByPoint);
                    res.send(arr);

                });
              }else{
                  sess.course_output = course_output;
                  sess.count = count;
                  sess.match = 1;
                  //console.log("*****"+keyword+"session end2:"+course_output);
                  //console.log("session end:"+sess.match);
                  res.session = sess;
                  res.send(arr);
              }
          });
    
    db.close();
}

function sortByPoint(a, b) {
    var sortStatus = 0;
 
    if (a.point > b.point) {
        sortStatus = -1;
    } else if (a.point < b.point) {
            sortStatus = 1;
    }
    return sortStatus;
}