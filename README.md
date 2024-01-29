# Teaching Charts

Using JS chart libraries to create web interface for graphs in an undergraduate social science methodology module.

# Local installation

Go to the root folder and take the following steps:

docker build -t teaching_charts .
docker run -d -p 8080:5000 teaching_charts

Then you can open http://localhost:8080 in your browser.

# Remote installation

Go to the frontend folder and run:

npm run build

Then copy the files from the teachingcharts folder that is created to the web server.