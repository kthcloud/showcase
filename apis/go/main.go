package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ResponseType struct {
	ID                  string  `json:"id"`
	Name                string  `json:"name"`
	StockholmCloudiness float64 `json:"stockholmCloudiness"`
}

func getCloudiness() float64 {
	type CloudBody struct {
		Hourly struct {
			CloudCover []float64 `json:"cloud_cover"`
		} `json:"hourly"`
	}

	//const stockholmCoordinates = { latitude: 59.3293, longitude: 18.0686 };
	stockholmCoordinates := struct {
		Latitude  float64
		Longitude float64
	}{
		Latitude:  59.3293,
		Longitude: 18.0686,
	}

	apiURL := fmt.Sprintf("https://api.open-meteo.com/v1/forecast?latitude=%f&longitude=%f&current_weather=true&hourly=cloud_cover", stockholmCoordinates.Latitude, stockholmCoordinates.Longitude)

	// Call the Open-Meteo API to get the cloudiness
	resp, err := http.Get(apiURL)
	if err != nil {
		return 0.0
	}

	// Close the response body
	defer resp.Body.Close()

	// Parse the response body
	var cloudBody CloudBody
	if err := json.NewDecoder(resp.Body).Decode(&cloudBody); err != nil {
		return 0.0
	}

	// Calculate the average cloudiness
	cloudiness := 0.0
	for _, cloudCover := range cloudBody.Hourly.CloudCover {
		cloudiness += cloudCover
	}

	return cloudiness / float64(len(cloudBody.Hourly.CloudCover))
}

func main() {
	router := gin.Default()

	// Serve static files from the "./static" directory
	router.Static("/static", "./static")

	// Serve static/favicon.ico as favicon
	router.StaticFile("/favicon.ico", "./static/favicon.ico")

	// Define a route for the root path that redirects to the static index.html
	router.GET("/", func(c *gin.Context) {
		c.Redirect(302, "/static/index.html")
	})

	// Add the /v1/resource route that returns JSON
	router.GET("/v1/resource", func(c *gin.Context) {
		c.JSON(200, ResponseType{ID: uuid.New().String(), Name: "Hello, World!", StockholmCloudiness: getCloudiness()})
	})

	router.GET("/healthz", func(c *gin.Context) {
		c.String(200, "ok")
	})

	// Start the server on port 8080
	router.Run(":8080")
}
