import {Router} from "express";
import {readdirSync} from "fs";

const PATH_ROUTER = `${__dirname}`
const ROUTER = Router();

readdirSync(PATH_ROUTER).filter((fileName:string) => {
    let arr:string[] = fileName.split('.');
    if (arr[0] !== "index") {
        arr.pop();
        let route:string = arr[0];
        let routeFile:string = arr.join('.');
        import(`./${routeFile}`).then((routeModule) => {
            console.log(`Route ${route} loaded.`);
            ROUTER.use(`/${route}`, routeModule.ROUTER);
        })
    }
});

export {ROUTER};