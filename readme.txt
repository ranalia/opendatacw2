/* How to set up*/

use node.js command prompt, 
1. change directory to "jobmatch" folder.
2. npm start.
3. localhost:3000/modulematch (job to course) or localhost:3000/
    localhost:3000/match (course to job)

If get error related to "sqlite3", please use command "npm install sqlite3 --save".
Other error please try "npm install".

Please use node.js version v0.10.25 - v0.12.2
Please connect to Internet. This application needs Internet connection to get job information and use text analysis service.



/*How to use this application*/

Job to Course:
1. input keyword, click search button, get latest job list.
2. click job that you are interested in.
3. Go to bottom, find "MATCH COURSE MODULES". Higher recommend point means this module is more recommended for this course.
4. you can find course by major code or course name. you can also get more job information by clicking link at the bottom of "JOB INFORMATION".

Course to Job:
1. Select a course, click "SEARCH".
2. Select a keyword from "SELECT COURSE KEYWORDS"
3. Select job you are interested in from job list.
4. Find "JOB INFORMATION" then check job information. You can also get more job information by clicking link at the bottom of "JOB INFORMATION".

If you have any question please contact rw6e14@soton.ac.uk
