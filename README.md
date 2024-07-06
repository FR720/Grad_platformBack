
## to create account for Student 

```
http://localhost:8080/student/signup

{
  "mail": "existingstudent@example.com",
  "name": "Jane Smith",
  "password": "password456",
  "acadmicyear": 2,
  "age": 21,
  "phoneNumber": "9876543210"
}

```

## to log in for student

```
http://localhost:8080/student/signin

request body should be like
{
  "mail": "existingstudent@example.com",
  "name": "Jane Smith",
  "password": "password456",
  "acadmicyear": 2,
  "age": 21,
  "phoneNumber": "0109876543210"
}

type : post

response body should be like
{
    "student": {
        "status": "Correct password",
        "ID": "668820229926c1352eddaec7",
        "name": "Jane Smith",
        "mail": "existingstudent@example.com",
        "age": 21,
        "phoneNumber": "0109876543210",
        "acadmicYear": 2,
        "submittedSubjects": [],
        "isAdmin": false
    }
}
if(wrong mail  )
here you will resevie status: 404
{
    "parent": {
        "status": "wrong mail"
    }
}
if(wrong password  )
here you will resevie status: 200
{
    "parent": {
        "status": "wrong password"
    }
}
```

## to log in for doctor 

```
http://localhost:8080/doctor/signin


 request body should be like
{
  "mail": "doctor@example.com",
  "name": "Dr. John Doe",
  "password": "password123"
}


type : post


```

## for doctor to create subject 

```
http://localhost:8080/doctor/addsubject
 request body should be like
{
  "doctorMail": "doctor@example.com",
 "academicYear":1,
  "subjectName":"matsh"
}
type : post
```

## for docotor to get his all subjects 

```
http://localhost:8080/doctor/subject/doctor@example.com
you can replace doctor@example.com by any anothe mail

 
type : get

if(ok)
here you will resevie status: 200
{
    "doctor": {
        "_id": "668824cddf212155aebff4df",
        "name": "Dr. Fady Raouf",
        "email": "doctor@example.com"
    },
    "subjects": [
        {
            "_id": "668828d5eeb9a0adee6d33ba",
            "doctorMail": "doctor@example.com",
            "academicYear": 1,
            "subjectName": "math",
            "createdAt": "2024-07-05T17:09:41.440Z",
            "updatedAt": "2024-07-05T17:09:41.440Z",
            "__v": 0
        },
        {
            "_id": "668829aed016fa7a1c95c6ca",
            "doctorMail": "doctor@example.com",
            "academicYear": 1,
            "subjectName": "matsh",
            "createdAt": "2024-07-05T17:13:18.946Z",
            "updatedAt": "2024-07-05T17:13:18.946Z",
            "__v": 0
        }
    ]
}

```

## for doctor to add matrial to sepcific subject 

```
const formdata = new FormData();
formdata.append("pdfFile", fileInput.files[0], "/C:/Users/fadyr/OneDrive/Desktop/fady_raouf_v.pdf");

const requestOptions = {
  method: "POST",
  body: formdata,
  redirect: "follow"
};

fetch("http://localhost:8080/doctor/upload-material/math", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));


  **** this is examble you pass the subjectname through url 
```

## for docotor to retrive all matrial he enterd 
```
http://localhost:8080/doctor/allmatrial/doctor@example.com
{
    "doctorMail": "doctor@example.com",
    "subjects": [
        {
            "subjectName": "math",
            "matrialPath": "uploads\\1720206077914-fady_raouf_v.pdf"
        },
        {
            "subjectName": "math",
            "matrialPath": "uploads\\1720206080950-fady_raouf_v.pdf"
        },
    ]
}
```
## for docotor to create post
```
http://localhost:8080/doctor/createPost
 
requst should be like this 
        const formdata = new FormData();
        formdata.append("postImage", fileInput.files[0], "/C:/Users/fadyr/OneDrive/Pictures/Screenshots/Screenshot (1).png");
        formdata.append("doctorMail", "doctor@example.com");
        formdata.append("subjectName", "math");
        formdata.append("title", "hello mother hackerd");
        formdata.append("content", "slamo3leekodsd");

        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow"
        };

        fetch("http://localhost:8080/doctor/createPost", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));

type :post 
```
## for docotor to get his  posts
```
http://localhost:8080/doctor/posts/doctor@example.com 
    doctor@example.com THIS IS VARIABLE FROM DOCTOR TO ANOTHER 
response should be like this  


{
    "doctor": {
        "_id": "668824cddf212155aebff4df",
        "name": "Dr. Fady Raouf",
        "email": "doctor@example.com"
    },
    "posts": [
        {
            "_id": "66890d8a3ef90f59988a278c",
            "doctorMail": "doctor@example.com",
            "subjectName": "math",
            "title": "hello mother hacker",
            "content": "slamo3leeko",
            "image": "uploads\\1720257930015-Screenshot (1).png",
            "reacts": [],
            "comments": [],
            "createdAt": "2024-07-06T09:25:30.105Z",
            "updatedAt": "2024-07-06T09:25:30.105Z",
            "__v": 0
        },
        {
            "_id": "66890d8c3ef90f59988a278f",
            "doctorMail": "doctor@example.com",
            "subjectName": "math",
            "title": "hello mother hacker",
            "content": "slamo3leeko",
            "image": "uploads\\1720257932149-Screenshot (1).png",
            "reacts": [],
            "comments": [],
            "createdAt": "2024-07-06T09:25:32.237Z",
            "updatedAt": "2024-07-06T09:25:32.237Z",
            "__v": 0
        },
        {
            "_id": "66890d8d3ef90f59988a2792",
            "doctorMail": "doctor@example.com",
            "subjectName": "math",
            "title": "hello mother hacker",
            "content": "slamo3leeko",
            "image": "uploads\\1720257933533-Screenshot (1).png",
            "reacts": [],
            "comments": [],
            "createdAt": "2024-07-06T09:25:33.625Z",
            "updatedAt": "2024-07-06T09:25:33.625Z",
            "__v": 0
        },
        {
            "_id": "66890d8e3ef90f59988a2795",
            "doctorMail": "doctor@example.com",
            "subjectName": "math",
            "title": "hello mother hacker",
            "content": "slamo3leeko",
            "image": "uploads\\1720257934486-Screenshot (1).png",
            "reacts": [],
            "comments": [],
            "createdAt": "2024-07-06T09:25:34.577Z",
            "updatedAt": "2024-07-06T09:25:34.577Z",
            "__v": 0
        },
        {
            "_id": "66890d943ef90f59988a2798",
            "doctorMail": "doctor@example.com",
            "subjectName": "math",
            "title": "hello mother hackerd",
            "content": "slamo3leeko",
            "image": "uploads\\1720257940640-Screenshot (1).png",
            "reacts": [],
            "comments": [],
            "createdAt": "2024-07-06T09:25:40.741Z",
            "updatedAt": "2024-07-06T09:25:40.741Z",
            "__v": 0
        },
        {
            "_id": "66890d963ef90f59988a279b",
            "doctorMail": "doctor@example.com",
            "subjectName": "math",
            "title": "hello mother hackerd",
            "content": "slamo3leekodsd",
            "image": "uploads\\1720257942898-Screenshot (1).png",
            "reacts": [],
            "comments": [],
            "createdAt": "2024-07-06T09:25:42.986Z",
            "updatedAt": "2024-07-06T09:25:42.986Z",
            "__v": 0
        }
    ]
}
type :get  
```
