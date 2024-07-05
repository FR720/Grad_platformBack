
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

## for parent to assign task from that previosuly inserted data

```
[machine host]/Task/AssignTask/id
id:it refer to student id that this task would be assigned  it should be embedded to api url

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

var raw = JSON.stringify({
  "taskno": 1,
  "gamename": [
    "game1",
    "game2"
  ],
  "id1": "643818e5cb5f3327b9284837",
  "id2": "643818e9cb5f3327b9284839",
  "id3": "64381b0e3c83a88a67f37648",
  "id4": "64381b183c83a88a67f3764a",
  "id5": "64381b1c3c83a88a67f3764c",
  "id6": "64381b1f3c83a88a67f3764e"
});
type : post

if(ok)
here you will resevie status: 200
{
    "status": "Task assigned successfully"
}

if(repeated taskno)
here you will resevie status: 400
{
    "status": "TaskNumber already exists for the same StudentID"
}
```

## for mobile to order assigned tasks

```
[machine host]/Task/TakeTask/id
id:it refer to student id that this task would be assigned  it should be embedded to api url

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

no req body
type : get

if(ok)
here status will be 200
[
    {
        "taskNumber": 1,
        "gameName": [
            "game1",
            "game2"
        ],
        "done": [
            false,
            false
        ],
        "data": [
            {
                "taskId": "64381c183c83a88a67f37654",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398808660.png",
                "definitionInAc": "كلب7",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            },
            {
                "taskId": "64381c1b3c83a88a67f37656",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398811355.png",
                "definitionInAc": "كلب8",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            },
            {
                "taskId": "64381c1e3c83a88a67f37658",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398814921.png",
                "definitionInAc": "كلب9",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            },
            {
                "taskId": "64381c213c83a88a67f3765a",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398817624.png",
                "definitionInAc": "كلب10",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            },
            {
                "taskId": "64381c243c83a88a67f3765c",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398820340.png",
                "definitionInAc": "كلب11",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            },
            {
                "taskId": "64381c273c83a88a67f3765e",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398823032.png",
                "definitionInAc": "كلب12",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            }
        ]
    },
    {
        "taskNumber": 2,
        "gameName": [
            "game1",
            "game2"
        ],
        "done": [
            false,
            false
        ],
        "data": [
            {
                "taskId": "64381c183c83a88a67f37654",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398808660.png",
                "definitionInAc": "كلب7",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            },
            {
                "taskId": "64381c1b3c83a88a67f37656",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398811355.png",
                "definitionInAc": "كلب8",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            },
            {
                "taskId": "64381c1e3c83a88a67f37658",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398814921.png",
                "definitionInAc": "كلب9",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            },
            {
                "taskId": "64381c213c83a88a67f3765a",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398817624.png",
                "definitionInAc": "كلب10",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            },
            {
                "taskId": "64381c243c83a88a67f3765c",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398820340.png",
                "definitionInAc": "كلب11",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            },
            {
                "taskId": "64381c273c83a88a67f3765e",
                "parentId": "6436d8f044bd5589e237d3b5",
                "gradeNo": 1,
                "subjectName": "en",
                "imageUrl": "FSEimage\\dog_1681398823032.png",
                "definitionInAc": "كلب12",
                "definitionInEn": "dog",
                "sentence": "yesterday i saw dog",
                "numbers": "1",
                "choices":["1",...],
            }
        ]
    }
]

if(there's no taskassigned)
here you will resevie status: 404
{
    "status": "No tasks found for this student ID."
}
```

## to log in from mobile as student by the account that parent create it for her child

```
[machine host]/student/StudentLogIn

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

var raw = JSON.stringify({
  "username": "fady",
  "password": "fady"
});

type : post

response body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
if(ok)
here you will resevie status: 200
{
    "student": {
        "status": "Correct password",
        "studentID": "643810158c7ba4f1fb42411d",
        "ParentID": "6438060776b3f3a3fd00461d",
        "studentName": "fady",
        "studentUserName": "fady",
        "studentAge": 9,
        "studentPic": "Profile/default.png",
        "studentGrade": 1
    }
}


if(wrong username  )
here you will resevie status: 404
{
    "student": {
        "status": "Wrong username"
    }
}
if(wrong password  )
here you will resevie status: 200
{
    "student": {
        "status": "Wrong password"
    }
}
```

## to order question to appear to mobile

```
[machine host]/FSE/FSEtakeQuestion/id
id:it refer to parent id it should be embedded to api url

 request body should be like
 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
{
      "unit": "1",
    "lesson": "1",
    "stadge":"1"
}

type : post
```

<details>
  <summary>Click to expand/collapse</summary>
## to retry question 
```
[machine host]/FSE/FSEretryQuestion/id
id:it refer to parent id it should be embedded to api url

request body should be like
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

json body
{
"id1":"6394e708b273ac393b1576af",
"id2":"6394f2e38117cacee984adac",
"id3":"6394f3198117cacee984adae",
"id4":"6394e6c8cc354df7eb70c080",
"id5":"639501fe967794a33a9833ba",
"id6":"63950fc0e93fe394dc49bf1b"

}
type : get

```
## to update info for student
```

[machine host]/student/StudenUpdateInfo/id
id:it refer to student id it should be embedded to api url

request body should be like
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

forma data like this :
formdata.append("newusername", "abdallh");
formdata.append("newname", "abdallh");
formdata.append("newstage", "1");
type:patch

```
## to update pic for student
```

[machine host]/student/StudenUpdatePic/id
id:it refer to student id it should be embedded to api url

request body should be like
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
formdata.append("image", fileInput.files[0], "/C:/Users/f0/Desktop/grad_pro/game/jiraff.jpg");
type:patch

```
## to update password for student
```

[machine host]/student/StudentUpdatePassword/id
{
"newpassword":"fady"
}
type:patch

```
## to update info for parent
```

[machine host]/parent/ParentUpdateInfo/id
id:it refer to parent id it should be embedded to api url

request body should be like
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

forma data like this :
formdata.append("newmail", "fady@gmail.com");
formdata.append("newname", "fady");
formdata.append("newphonenumber", "1020");
formdata.append("newage", "5");
type:patch

```
## to update pic for parent
```

[machine host]/parent/ParentUpdatePic/id

request body should be like
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
id:it refer to parent id it should be embedded to api url
formdata.append("image", fileInput.files[0], "/C:/Users/f0/Desktop/grad_pro/game/messi.png");
type:patch

```
</details>
```

```
## for mobile to send a feedback
```

[machine host]/feedback

request should be like this
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
JSON body
{
"data1Attempts": 2,
"data2Attempts": 2,
"data3Attempts": 2,
"data4Attempts": 2,
"data5Attempts": 2,
"data6Attempts": 2
}

in url we should contain studentID, taskID, gameName respectevly
[machine host]/feedback/:studentID/:taskID/:gameName

---

### to get brief feedback

```
api--> [machine host]/feedback/:studentID

method: GET

response:
[
    {
        "id": "646fe738d7854f00d2fb0386",
        "taskID": "646fe645d7854f00d2fb0381",
        "taskNumber": 1,
        "subject": "math",
        "gameName": [
            "3",
            "4"
        ]
    },
    {
        "id": "646fe85dd7854f00d2fb03a9",
        "taskID": "646fe82dd7854f00d2fb03a4",
        "taskNumber": 2,
        "subject": "english",
        "gameName": [
            "5"
        ]
    }
]
```

### to get detailed feedback

```
api--> [machine host]/feedback/:studentID/:taskID

method: GET

response:
[
    {
        "gameName": "0",
        "data": [
            {
                "word": "door",
                "attempts": 0
            },
            {
                "word": "apple",
                "attempts": 0
            },
            {
                "word": "egg",
                "attempts": 0
            },
            {
                "word": "bat",
                "attempts": 0
            },
            {
                "word": "cat",
                "attempts": 1
            },
            {
                "word": "fork",
                "attempts": 0
            }
        ]
    }
]
```
