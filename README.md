# Receipt Processor Challenge
This API was built using JavaScript, the Express.js framework, tested with Mocha, and run with Docker.

## Getting started
1. Navigate to project's root directory.

2. Create a Docker image.

    ```$ docker build -f Dockerfile.dev -t receipts:latest . ```

3. Create and run a container from the Docker image.

    ```$ docker run -d -it --rm -p 5000:5000 --name receipts_container {image_id}```

4. Test out the API!
