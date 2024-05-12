from locust import HttpUser, between, task
import random
import string
import uuid
from faker import Faker

import json
fake = Faker()

def generate_paragraph():
    return {
        "title": fake.sentence(),
        "content": fake.text(max_nb_chars=200),
        "image_sources": [fake.image_url() for _ in range(random.randint(1, 3))],
        "layout_type": random.choice([1, 2, 3, 4, 5])
    }

def generate_page():
    title = fake.sentence()
    return {
        "id": "".join(title.lower().split(" ")),
        "page": {
            "title": title,
            "paragraphs": [generate_paragraph() for _ in range(random.randint(1, 5))]
        },
        "time": fake.iso8601()
    }


class WebsiteUser(HttpUser):
    wait_time = between(1, 5)
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.created_page = [] #Add id for page
        self.created_image = [] #Add id for image
        self.files = [
            ('file1', ('img1.png', open('./img/img1.png', 'rb'), 'image/jpeg')),
            ('file2', ('img2.png', open('./img/img2.png', 'rb'), 'image/jpeg')),
            ('file3', ('img3.png', open('./img/img3.png', 'rb'), 'image/jpeg')),
            ('file4', ('img4.png', open('./img/img4.jpg', 'rb'), 'image/jpeg')),
        ]
        
    @task
    def index_page(self):
        self.client.get("/")

    @task
    def create_page(self):
        page_data = generate_page()
        self.created_page.append(page_data['id'])
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg3NDI3ZjhjLTMzMDAtNDRhYy05ZTZmLTdkNmY3ODMwZmQ5ZCJ9.aFh-hmiakG3DzPZPerFVglmefBLQ3OFBvMXtlteS0zk'
            }
        self.client.post("/admin/create_page", data=json.dumps(page_data), headers=headers)
    
    
    def get_page(self):
        if self.created_page:
            page_id = random.choice(self.created_page)
            self.client.get(f"/api/get_page/{page_id}",name="/api/get_page")

    @task
    def remove_page(self):
        if self.created_page:
            page_id = random.choice(self.created_page)
            self.created_page.pop(self.created_page.index(page_id))
            headers = {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg3NDI3ZjhjLTMzMDAtNDRhYy05ZTZmLTdkNmY3ODMwZmQ5ZCJ9.aFh-hmiakG3DzPZPerFVglmefBLQ3OFBvMXtlteS0zk'
                }
            self.client.post(f"/admin/remove_page/{page_id}",headers=headers,name="/admin/remove_page")

    @task
    def get_pages(self):
        self.client.get("/api/get_pages")

    @task
    def get_keys(self):
        self.client.get("/admin/get_keys")
    
    @task
    def upload_image(self):
        headers = {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijg3NDI3ZjhjLTMzMDAtNDRhYy05ZTZmLTdkNmY3ODMwZmQ5ZCJ9.aFh-hmiakG3DzPZPerFVglmefBLQ3OFBvMXtlteS0zk'
                }
        self.client.post("/admin/upload_image", files=self.files,headers=headers)
    
    @task
    def get_image(self):
        image_names = ['file1', 'file2', 'file3','file4']
        image_name = random.choice(image_names)
        self.client.get(f"/api/get_image/{image_name}")
    
    
        
