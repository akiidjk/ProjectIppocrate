FROM rust:1.77

WORKDIR /usr/src/backend
COPY . .

EXPOSE 8000

RUN cargo install --path .

CMD ["backend"]