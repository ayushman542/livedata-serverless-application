User Information Fetcher
This project aims to fetch user details based on a search query from a third-party API. It leverages various technologies and methodologies to ensure efficient and reliable data retrieval.



Technologies Used
Node.js
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is chosen for its non-blocking, event-driven architecture, making it ideal for handling asynchronous operations such as API requests.
![node](https://github.com/user-attachments/assets/42de536f-f02d-44b8-88d5-c2f3de309ef1)


AWS Lambda
AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. It is used to handle the backend logic in a cost-effective and scalable manner.
![lambda](https://github.com/user-attachments/assets/47f093f6-ea8f-42a5-8c40-fcd1262fb65c)


API Gateway
API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs. It serves as the entry point for the Lambda function.
![api](https://github.com/user-attachments/assets/661eec56-da53-4065-91c6-6a588d389836)


Axios
Axios is a promise-based HTTP client for Node.js and the browser. It is used to make HTTP requests to the third-party API due to its simplicity and support for promises, making asynchronous operations easier to manage.
![images](https://github.com/user-attachments/assets/6bc6c68a-9b16-4961-9dc9-ab95bc79ca23)


JavaScript (ES6+)
Modern JavaScript features such as async/await, destructuring, and template literals are used to write clean and readable code.
![javascript](https://github.com/user-attachments/assets/450d426f-9677-498e-a0cd-477d187d1dd4)



Amazon S3
Amazon S3 (Simple Storage Service) is a scalable object storage service. The project files are deployed to an S3 bucket, allowing for easy hosting and access.
![s3](https://github.com/user-attachments/assets/11eca516-aa3c-448e-b1b6-d7a8d1c8b4aa)




## API Reference

#### Get all items with params

```http
  GET https://67lnlqkrqb.execute-api.eu-north-1.amazonaws.com/?q=${searchTerm}

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `params` | Open API key |


