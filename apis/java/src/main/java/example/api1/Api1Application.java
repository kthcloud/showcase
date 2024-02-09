package example.api1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ThreadLocalRandom;

@SpringBootApplication
@RestController
@CrossOrigin
public class Api1Application {

    public static void main(String[] args) {
        SpringApplication.run(Api1Application.class, args);
    }

    // Add a index.html serving on /
    @GetMapping("/")
    public String index() {
        return "<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <title>Java API</title> <link href=\"https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap\" rel=\"stylesheet\"> <style> body, html { height: 100%; margin: 0; font-family: 'Roboto', sans-serif; color: white; background-color: #333; } .centered { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; opacity: 0; /* Start with the content invisible */ animation: fadeIn 2s ease-out forwards; /* Apply the fadeIn animation */ } .logo { width: 100px; /* Adjust based on the size of your logo */ margin-bottom: 20px; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } </style> </head> <body> <div class=\"centered\"> <img src=\"https://dev.java/assets/images/java-logo-vector.png\" alt=\"Java logo\" class=\"logo\"> <h1>Java API</h1> </div> </body> </html>";
    }

    // Add a healthz endpoint
    @GetMapping("/healthz")
    public String healthz() {
        return "OK";
    }

    @GetMapping("/hello")
    public String hello() {
        var random = ThreadLocalRandom.current().nextInt(0, 1000);
        return "Hello from Java! Here is a random number: " + random;
    }
}
