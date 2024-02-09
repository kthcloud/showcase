#include <microhttpd.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#define PORT 8080

static enum MHD_Result answer_to_connection(void *cls, struct MHD_Connection *connection,
                                            const char *url, const char *method,
                                            const char *version, const char *upload_data,
                                            size_t *upload_data_size, void **con_cls)
{
    const char *page;
    int status_code = MHD_HTTP_OK;

    if (strcmp(url, "/v1/resource") == 0)
    {
        // Randomize a UUID
        char *uuid = malloc(37);
        sprintf(uuid, "%04x%04x-%04x-%04x-%04x-%04x%04x%04x",
                rand() % 65536, rand() % 65536, rand() % 65536,
                rand() % 4096 + 16384, rand() % 65536, rand() % 65536, rand() % 65536);
        page = malloc(37 + 14);
        sprintf((char *)page, "{\"uuid\": \"%s\"}", uuid);
    }
    else if (strcmp(url, "/") == 0)
    {
        page = "<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <title>C API</title> <link href=\"https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap\" rel=\"stylesheet\"> <style> body, html {\r\n    height: 100%;\r\n    margin: 0;\r\n    font-family: \'Roboto\', sans-serif;\r\n    color: white;\r\n    background-color: #333;\r\n}\r\n\r\n.centered {\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    text-align: center;\r\n    opacity: 0; /* Start with the content invisible */\r\n    animation: fadeIn 2s ease-out forwards; /* Apply the fadeIn animation */\r\n}\r\n\r\n.logo {\r\n    width: 100px; /* Adjust based on the size of your logo */\r\n    margin-bottom: 20px;\r\n}\r\n\r\n/* Define the fadeIn keyframes */\r\n@keyframes fadeIn {\r\n    from {\r\n        opacity: 0;\r\n    }\r\n    to {\r\n        opacity: 1;\r\n    }\r\n}</style> </head> <body> <div class=\"centered\"> <img src=\"https://www.gnu.org/graphics/heckert_gnu.transp.small.png\" alt=\"Go Logo\" style=\"filter: invert(1);\" class=\"logo\"><h1>C API</h1> </div> </body> </html>";
    }
    else if (strcmp(url, "/healthz") == 0)
    {
        page = "OK";
    }
    else
    {
        page = "{\"message\": \"Not Found\"}";
        status_code = MHD_HTTP_NOT_FOUND;
    }

    struct MHD_Response *response;
    response = MHD_create_response_from_buffer(strlen(page),
                                               (void *)page,
                                               MHD_RESPMEM_PERSISTENT);
    enum MHD_Result ret = MHD_queue_response(connection, status_code, response);
    MHD_destroy_response(response);
    return ret;
}

int main()
{
    struct MHD_Daemon *daemon;

    daemon = MHD_start_daemon(MHD_USE_INTERNAL_POLLING_THREAD, PORT,
                              NULL, NULL,
                              &answer_to_connection, NULL,
                              MHD_OPTION_END);
    if (NULL == daemon)
        return 1;

    printf("Server running on port %d\n", PORT);
    getchar(); // Wait for an enter keypress

    MHD_stop_daemon(daemon);
    return 0;
}
