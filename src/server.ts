// src/server.ts
import { Application, json, urlencoded, Request, Response, NextFunction } from "express";
import { appRoutes } from "./routes";
import http from 'http';
import { UAParser } from 'ua-parser-js';

const SERVER_PORT = 4000;
export function start(app: Application): void {
    standardMiddleware(app);
    routesMiddleware(app);
    startServer(app);
    extractAtachedHeadersDataFromBody(app);
}

function routesMiddleware(app: Application): void {
    appRoutes(app);
}


function standardMiddleware(app: Application): void {
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' }));
}

function extractAtachedHeadersDataFromBody(app: Application): void {
    app.use((req: Request, _res: Response, next: NextFunction) => {
        const parser = new UAParser(req.body?.deviceMeta); // Parse the User-Agent
        const result = parser.getResult(); // Get parsed User-Agent details

        req.headers.deviceMeta = JSON.stringify(result);

        //now remove these headers
        delete req.body?.deviceMeta;
        delete req.body?.ip;
        next();
    });
}

function startServer(app: Application): void {
    try {
        const httpServer: http.Server = new http.Server(app);
        httpServer.listen(SERVER_PORT, () => {
            console.log("Server is listening on port 4000")
        });
    } catch (error) {
        console.log('error:', error)
    }
}