FROM python

WORKDIR /app
COPY ./websockets/backend /app
RUN pip install -r requirements.txt

EXPOSE 8080

CMD ["python", "server.py"]