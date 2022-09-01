import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServerLog } from "./server-log";
import { environment } from '../../../environments/environment';

const API = environment.serverLog;

@Injectable({
    providedIn: 'root'
})
export class ServerLogService {

    constructor(private httpClient: HttpClient) { }

    log(serverLog: ServerLog) {
        //POST request seding as body the serverLog
        return this.httpClient.post(API + '/infra/log', serverLog);
    }
}