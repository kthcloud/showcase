# Use an image with a C compiler
FROM debian:bookworm

# Install libmicrohttpd
RUN apt-get update && apt-get upgrade -y && apt-get autoremove -y
RUN apt-get install -y build-essential libmicrohttpd-dev

# Copy the source files
COPY . /usr/src/myapp

# Set the working directory
WORKDIR /usr/src/myapp

# Compile the application
RUN make

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["./main"]
