# video-upload
A RESTful API managing mongo DB
# API :
  1. POST - http://localhost:4011/api/auth/userReg
      {
      "fName":"rohit",
      "lName": "metkar",
      "email":"1999metkarohit@gmail.com",
      "mobile_number":"1234567890",
      }
     
  2. POST - http://localhost:4011/api/auth/login
        {
          "fName":"rohit",
          "password":"8rm90oet"
        }
  3. GET - http://localhost:4011/api/auth/getuser
          - authToken
  5. POST - http://localhost:4011/api/auth/uploadUser
          form-data : {"videos":"",
           "description": "developer"}
  7. POST - http://localhost:4011/api/auth/uploadVideos
           form-data : {"profile_picture":"",
           "user_bio": "developer"}
  8. GET - http://localhost:4011/api/auth/getuserData
              - authToken
 9. GET - http://localhost:4011/api/auth/videos/:id
     - authToken, req.params.id
# Database name :    
    video_data
# Project run :
    node app.js
    
# dependencies : 
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "config": "^3.3.12",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "joi": "^17.13.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.5.3",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.14"

#.env file for adding :
                PORT = 4011
                MONGO_URI = "mongodb+srv://rohitmetakar3112:bl1JDTKODKob3ICE@cluster0.iyzpdih.mongodb.net/video_data?retryWrites=true&w=majority&appName=Cluster0"
                JWT_SECRET=your_jwt_secret
                EMAIL_USER=maddison53@ethereal.email
                EMAIL_PASS=jn7jnAPss4f63QBp6D


     
