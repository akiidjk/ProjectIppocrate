FROM rust:1.77

WORKDIR /usr/src/backend
COPY . .

EXPOSE 8000

RUN apt-get update && \
    apt-get install -y clang llvm-dev libclang-dev && \
    rm -rf /var/lib/apt/lists/*

RUN cargo install --path .

CMD ["backend"]
