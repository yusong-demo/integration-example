docker create \
  --name selenoid \
  -p 4444:4444 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(pwd)/:/etc/selenoid/:ro \
  -v $(pwd)/output/video/:/opt/selenoid/video/ \
  -e OVERRIDE_VIDEO_OUTPUT_DIR=$(pwd)/output/video/ \
  aerokube/selenoid:latest-release
