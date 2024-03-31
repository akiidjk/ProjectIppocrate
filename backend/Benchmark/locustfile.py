from locust import HttpUser, between, task


class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def index_page(self):  # Simple request
        self.client.get("/")

    @task(2)  # This task simple make a request when the backend write to db but without send data
    def test_page(self):
        self.client.get("/test")
