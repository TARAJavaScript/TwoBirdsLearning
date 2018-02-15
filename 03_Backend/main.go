package main

import (
	"log"
	"net/http"
)

const theRoute = "/"
const theURL = "localhost:8080"

func main() {

	http.HandleFunc(theRoute, customHandler)
	panic(http.ListenAndServe(theURL, nil))
}

func customHandler(w http.ResponseWriter, r *http.Request) {

	if r.URL.Path == "/login" {
		loginHandler(w, r)
		return
	}

	http.ServeFile(w, r, r.URL.Path[1:])
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("login call")
	theJSON := []byte(`{"Response":{"Status":"success","StatusCode":200,"Failed":false,"Message":"success"}}`)

	w.Header().Set("Content-Type", "application/json")
	w.Write(theJSON)
}
