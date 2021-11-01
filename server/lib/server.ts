import app from './app';
import * as dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3100;

app.listen(port, ()=>{
    console.log("server running on port: " + port);
})