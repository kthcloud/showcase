#include <microhttpd.h>
#include <stdlib.h>
#include <string.h>

#define PORT 8080

static int answer_to_connection(void *cls, struct MHD_Connection *connection,
                                const char *url, const char *method,
                                const char *version, const char *upload_data,
                                size_t *upload_data_size, void **con_cls) {
    const char *page;
    int status_code = MHD_HTTP_OK;

    if (strcmp(url, "/") == 0) {
        page = "{\"message\": \"hello world\"}";
    } else if (strcmp(url, "/healthz") == 0) {
        page = "OK";
    } else {
        page = "{\"message\": \"Not Found\"}";
        status_code = MHD_HTTP_NOT_FOUND;
    }

    struct MHD_Response *response;
    response = MHD_create_response_from_buffer(strlen(page),
                                               (void *)page,
                                               MHD_RESPMEM_PERSISTENT);
    int ret = MHD_queue_response(connection, status_code, response);
    MHD_destroy_response(response);
    return ret;
}

int main() {
    struct MHD_Daemon *daemon;

    daemon = MHD_start_daemon(MHD_USE_INTERNAL_POLLING_THREAD, PORT,
                              NULL, NULL,
                              &answer_to_connection, NULL,
                              MHD_OPTION_END);
    if (NULL == daemon) return 1;

    printf("Server running on port %d\n", PORT);
    getchar();  // Wait for an enter keypress

    MHD_stop_daemon(daemon);
    return 0;
}
