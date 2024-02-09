CC=gcc
CFLAGS=-I.
DEPS = 
OBJ = main.o 
LIBS=-lmicrohttpd

%.o: %.c $(DEPS)
	$(CC) -c -o $@ $< $(CFLAGS)

main: $(OBJ)
	$(CC) -o $@ $^ $(CFLAGS) $(LIBS)

clean:
	rm -f *.o main
