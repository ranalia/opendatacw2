var sqlite3 = require('sqlite3').verbose();
var jsonQuery = require('json-query');
var jsonData = require('../public/course.json');



exports.db = function(req, res) {

    var db = new sqlite3.Database('./db_1.sqlite');
    var sess = req.session;

    //  var id="4432";
    var keyword = req.params.content;
//    var course = [];
    var data = {
        'courseNo': jsonData
    };
    var count = [];
    var course_output = [];
    var arr = [];

    if(sess.match == 1){
      course_output = sess.course_output;
      console.log(course_output);
    } 

    db.serialize(function() {
        if(sess.match == 1){ //previous matched course
          course_output = sess.course_output;
          console.log("session:"+course_output);
        } 
        db.each("SELECT course FROM keywordID WHERE keyword LIKE '%" + keyword + "%'", function(err, rows) {
            if (rows == null) {
                res.send("No Match keyword!");
            }
            //course.push(rows.course);
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
            //var l = course.length;
            //console.log(l);
            //for (var i = 0; i < l; i++) {
                //console.log(course[i]);
                //console.log(course[i]+","+jsonQuery("courseNo[id="+course[i]+"].name",{data:data}).value);
            //}
            sess.course_output = course_output;
            sess.match = 1;
            console.log("session end"+course_output);

            for (var i = 0; i < course_output.length; i++) {
                //console.log(course[i]);
                var param = {
                    'courseNo': course_output[i],
                    'courseName': jsonQuery("courseNo[id=" + course_output[i] + "].name", {
                        data: data
                    }).value,
                    'point': count[i]
                }
                console.log(course_output[i] + "," + jsonQuery("courseNo[id=" + course_output[i] + "].name", {
                    data: data
                }).value + "," + count[i]);
                arr.push(param);
            }
            /*db.get("SELECT id,name FROM module WHERE id = '"+id+"'",function(err,row){
                console.log(row.id+','+row.name);
              });
            });*/
            /*db.get("SELECT id,name FROM module WHERE id = '"+id+"'",function(err,row){
                console.log(row.id+','+row.name);
              }); */

            res.send(arr);
        });
    });
    db.close();

}