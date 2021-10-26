FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

RUN echo "Installing Apt-get packages..." \
    && apt-get update --fix-missing \
    && apt-get install -y apt-utils 2> /dev/null \
    && apt-get install -y software-properties-common npm curl git wget zip tzdata chromium-browser \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN npm install npm@latest -g && \
    npm install n -g && \
    npm install jest jest-snapshot -g && \
    n latest

WORKDIR /home/offset-fires-embed

CMD ["./run_tests.sh"]
