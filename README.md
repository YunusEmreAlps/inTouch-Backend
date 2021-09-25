<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/YunusEmreAlps/inTouch-Backend/">
    <img src="ss/icon.png" alt="icon" width="200">
  </a>

  <h3 align="center">inTouch - Backend</h3>

  <p align="center">
    Connecting you from around the world.
    <br />
    <a href="https://github.com/YunusEmreAlps/inTouch-Backend/archive/refs/heads/master.zip">Download</a>
    ·
    <a href="https://github.com/YunusEmreAlps/inTouch-Backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/YunusEmreAlps/inTouch-Backend/issues">Request Feature</a>
  </p>
</p>

---

<p align="center">
  <img src="ss/architecture.png" alt="icon" width="75%">
</p>

## Used Technologies

- MongoDB
- Node.js
- Express.js

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/YunusEmreAlps/inTouch-Backend.git
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
```

### Setting up environments

1.  Create a new file and then renaming it to just `.env`
    ```bash
    touch  .env
    ```
2.  The file `.env` is already ignored, so you never commit your credentials.
3.  Change the values of the file to your environment.
    ```bash
    ATLAS_URI=YourConnectionString
    ```

## Project structure

```sh
.
├── server.js
├── package.json
├── package-lock.json
├── config
│   ├── db.js
│   ├── dbconfig.js
│   └── passport.js
├── methods
│   ├── actions.js
├── models
│   ├── user.js
├── routes
│   ├── index.js
├── ss
│   ├── icon.png
│   ├── icon2.png
```

## How to run

### Running API server locally

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

```bash
Connected to mongodb:YOUR_DB_CONNECTION_STRING
App is running ...

Press CTRL + C to stop the process.
```

**Note:** `YOUR_DB_CONNECTION_STRING` will be your MongoDB connection string.
