FROM rust:1.77

WORKDIR /usr/src/backend
COPY . .

EXPOSE 8080

RUN cargo install --path .

CMD ["backend"]